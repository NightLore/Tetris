const UI_BOX_SIZE = 5 * SQUARE_SIZE;
const NUM_NEXT_PIECES = 5;

var Grid = function(x, y, width, height) {
   this._x = x - width / 2 * SQUARE_SIZE;
   this._y = y + 2 * SQUARE_SIZE;
   this._width = width;
   this._height = height;
   this._color = "rgb(50, 50, 50)";
   this._board = new Array(width);
   for (let i = 0; i < width; i++) {
      this._board[i] = new Array(height);
   }

   this._spawnPosition = { x: Math.floor(width / 2), y: 0 };
   this._storeProps = {
      boxX: -UI_BOX_SIZE - 2,
      boxY: 1,
      boxSize: UI_BOX_SIZE,
      pieceX: UI_BOX_SIZE / 2,
      pieceY: UI_BOX_SIZE / 2 + SQUARE_SIZE / 2,
   };
   this._nextProps = {
      boxX: width * SQUARE_SIZE + 2,
      boxY: 1,
      boxWidth: UI_BOX_SIZE,
      boxHeight: UI_BOX_SIZE * NUM_NEXT_PIECES * 4 / 7,
      pieceX: UI_BOX_SIZE / 2,
      pieceY: UI_BOX_SIZE / 2,
   };

   this._storedPiece = null;
   this._ghostPiece = new Piece();
   this._ghostPiece.strokeColor = "white";
   this._ghostPiece.tetromino = { color: "transparent" }; // set fill color
   this._nextPieces = new Array(NUM_NEXT_PIECES);
   for (let i = 0; i < NUM_NEXT_PIECES; i++) {
      this._nextPieces[i] = new Piece(Tetrominos.getRandom());
      this._nextPieces[i].setCenterPosition();
   }
   this.spawnNewActivePiece();
}

Grid.prototype.draw = function(ctx) {
   ctx.translate(this._x, this._y);
   ctx.lineWidth = 1;

   // board
   ctx.beginPath();
   ctx.strokeStyle = "transparent"
   ctx.fillStyle = this._color;
   for (let i = 0; i < this._width; i++) {
      for (let j = 0; j < this._height; j++) {
         drawSquare(ctx, i, j);
      }
   }

   // filled pieces in board
   ctx.beginPath();
   for (let i = 0; i < this._width; i++) {
      for (let j = 0; j < this._height; j++) {
         if (!this._board[i][j])
            continue;

         ctx.fillStyle = this._board[i][j];
         drawSquare(ctx, i, j);
         ctx.beginPath();
      }
   }

   // active piece
   this._activePiece.draw(ctx);
   this._ghostPiece.draw(ctx);

   // store box
   ctx.beginPath();
   ctx.translate(this._storeProps.boxX, this._storeProps.boxY);
   ctx.strokeStyle = this._color;
   ctx.rect(0, 0, this._storeProps.boxSize, this._storeProps.boxSize);
   ctx.stroke();

   // stored piece
   if (this._storedPiece) {
      ctx.translate(this._storeProps.pieceX, this._storeProps.pieceY);
      this._storedPiece.draw(ctx);
      ctx.translate(-this._storeProps.pieceX, -this._storeProps.pieceY);
   }
   ctx.translate(-this._storeProps.boxX, -this._storeProps.boxY);

   // display next pieces
   ctx.beginPath();
   ctx.translate(this._nextProps.boxX, this._nextProps.boxY);
   ctx.strokeStyle = this._color;
   ctx.rect(0, 0, this._nextProps.boxWidth, this._nextProps.boxHeight);
   ctx.stroke();

   ctx.translate(this._nextProps.pieceX, this._nextProps.pieceY);
   for (let i = 0; i < NUM_NEXT_PIECES; i++) {
      this._nextPieces[i].draw(ctx);
      ctx.translate(0, this._nextProps.pieceY);
   }
}

Grid.prototype.updateGhostPiece = function() {
   this._ghostPiece.x = this._activePiece.x;
   this._ghostPiece.y = this._activePiece.y;
   this.dropPiece(this._ghostPiece);
}

Grid.prototype.spawnNewActivePiece = function() {
   this._activePiece = this._nextPieces.shift();
   this._activePiece.setPosition(this._spawnPosition);
   this._ghostPiece.piece = this._activePiece.piece;
   this.updateGhostPiece();

   const nextPiece = new Piece(Tetrominos.getRandom());
   nextPiece.setCenterPosition();
   this._nextPieces.push(nextPiece);
   if (this.isPieceColliding(this._activePiece))
      this.gameOver = true;
}

Grid.prototype.addActivePiece = function() {
   const rows = new Set();
   const squares = this._activePiece.getSquares();
   for (let i = 0; i < squares.length; i++) {
      const {x, y, color} = squares[i];
      this._board[x][y] = color;
      rows.add(y);
   }

   for (const row of rows.values()) {
      if (this.checkRow(row))
         this.removeRow(row);
   }

   this.spawnNewActivePiece();
}

/**
 * Return true if row should be removed, false otherwise
 */
Grid.prototype.checkRow = function(row) {
   for (let i = 0; i < this._width; i++) {
      if (!this._board[i][row])
         return false;
   }
   return true;
}

/**
 * Remove row and shift all rows above it down
 */
Grid.prototype.removeRow = function(row) {
   for (let i = 0; i < this._width; i++) {
      for (let j = row; j >= 0; j--) {
         this._board[i][j] = this._board[i][j-1];
      }
   }
}

Grid.prototype.storeActivePiece = function() {
   const piece = this._storedPiece;
   this._storedPiece = this._activePiece;
   if (piece) {
      this._activePiece = piece;
      this._activePiece.setPosition(this._spawnPosition);
      this._ghostPiece.piece = this._activePiece.piece;
      this.updateGhostPiece();
   }
   else
      this.spawnNewActivePiece();
   this._storedPiece.resetBlocks();
   this._storedPiece.setCenterPosition();
}

Grid.prototype.inBounds = function(x, y) {
   return 0 <= x && x < this._width
       && 0 <= y && y < this._height;
}

Grid.prototype.isPieceColliding = function(piece) {
   const squares = piece.getSquares();
   for (let i = 0; i < squares.length; i++) {
      const {x, y} = squares[i];
      if (!this.inBounds(x, y) || this._board[x][y])
         return squares[i];
   }
   return false;
}

/**
 * Moves active piece in the given direction in the x axis.
 * A positive direction indicates right, negative direction indicates left.
 * Does not move if it will collide with grid.
 */
Grid.prototype.moveActivePieceInX = function(direction) {
   this._activePiece.move(direction, 0);
   if (this.isPieceColliding(this._activePiece)) {
      this._activePiece.move(-direction, 0);
   }
   this.updateGhostPiece();
}

/**
 * Moves active piece down the grid.
 * Adds active piece to the grid if it collides with grid unless shouldFake is true
 * Returns true if active piece succeeded in moving.
 */
Grid.prototype.moveActivePieceDown = function() {
   if (!this.movePieceDown(this._activePiece)) {
      this.addActivePiece();
      return false;
   }
   return true;
}

Grid.prototype.movePieceDown = function(piece) {
   piece.move(0, 1);
   if (this.isPieceColliding(piece)) {
      piece.move(0, -1);
      return false;
   }
   return true;
}

Grid.prototype.dropActivePiece = function() {
   while (this.moveActivePieceDown());
}

Grid.prototype.dropPiece = function(piece) {
   while (this.movePieceDown(piece));
}

Grid.prototype.rotatePieceCounterClockwise = function() {
   this._activePiece.rotateCounterClockwise();
   this.toClosestAvailableSpace();
   this.updateGhostPiece();
}

Grid.prototype.rotatePieceClockwise = function() {
   this._activePiece.rotateClockwise();
   this.toClosestAvailableSpace();
   this.updateGhostPiece();
}

const SPACES_TO_CHECK = [
   { dx:  0, dy: -1 },
   { dx:  1, dy:  0 },
   { dx: -1, dy:  0 },
   { dx:  1, dy: -1 },
   { dx: -1, dy: -1 },
   { dx:  2, dy:  0 },
   { dx: -2, dy:  0 },
   { dx:  0, dy: -2 },
   { dx:  1, dy: -2 },
   { dx: -1, dy: -2 },
   { dx:  0, dy: -3 },
   { dx:  1, dy: -3 },
   { dx: -1, dy: -3 },
   { dx:  0, dy: -4 },
   { dx:  1, dy: -4 },
   { dx: -1, dy: -4 },
   { dx:  0, dy: -5 },
   { dx:  1, dy: -5 },
   { dx: -1, dy: -5 },
];

Grid.prototype.toClosestAvailableSpace = function() {
   const piece = this._activePiece;
   let square = this.isPieceColliding(piece);
   if (!square)
      return;

   this.moveActivePieceInBounds();

   square = this.isPieceColliding(piece);
   if (!square)
      return;

   for (let i = 0; i < SPACES_TO_CHECK.length; i++) {
      const {dx, dy} = SPACES_TO_CHECK[i];
      // skip possibilities that would let piece break through walls
      if (piece.x < square.x && dx > 0) continue;
      if (piece.x >= square.x && dx < 0) continue;

      const spot = {
         x: square.x + dx,
         y: square.y + dy
      };
      if (this.inBounds(spot.x, spot.y) && !this._board[spot.x][spot.y]) {
         piece.move(dx, dy);
         square = this.isPieceColliding(piece);
         if (!square)
            return;
         piece.move(-dx, -dy);
      }
   }
}

Grid.prototype.moveActivePieceInBounds = function() {
   const piece = this._activePiece;
   let squares = piece.getSquares();
   let deltaX = 0;
   for (let i = 0; i < squares.length; i++) {
      if (!this.inBounds(squares[i].x, squares[i].y)) {
         if (squares[i].x < 0)
            deltaX++;
         else
            deltaX--;
      }
   }
   piece.move(deltaX, 0);
}

