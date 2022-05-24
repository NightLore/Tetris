
var Grid = function(width, height) {
   this._width = width;
   this._height = height;
   this._color = "rgb(50, 50, 50)";
   this._activePiece = new Piece(Math.floor(this._width / 2), 0);
   this._storedPiece = null;
   this._board = new Array(width);
   for (let i = 0; i < width; i++) {
      this._board[i] = new Array(height);
   }
}

Grid.prototype.draw = function(ctx) {
   ctx.beginPath();
   ctx.fillStyle = this._color;
   for (let i = 0; i < this._width; i++) {
      for (let j = 0; j < this._height; j++) {
         drawSquare(ctx, i, j);
      }
   }

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

   this._activePiece.draw(ctx);
   if (this._storedPiece)
      this._storedPiece.draw(ctx);
}

Grid.prototype.inBounds = function(x, y) {
   return 0 <= x && x < this._width
       && 0 <= y && y < this._height;
}

Grid.prototype.isPieceColliding = function() {
   const squares = this._activePiece.getSquares();
   for (let i = 0; i < squares.length; i++) {
      const {x, y} = squares[i];
      if (!this.inBounds(x, y) || this._board[x][y])
         return true;
   }
   return false;
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
   this._activePiece = new Piece(Math.floor(this._width / 2), 0);
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

Grid.prototype.storePiece = function() {
   const piece = this._storedPiece;
   this._storedPiece = this._activePiece;
   this._activePiece = piece || new Piece();
   this._activePiece.setPosition(Math.floor(this._width / 2), 0);
   this._storedPiece.setPosition(15, 2);
}

/**
 * Moves active piece in the given direction in the x axis.
 * A positive direction indicates right, negative direction indicates left.
 * Does not move if it will collide with grid.
 */
Grid.prototype.movePieceInX = function(direction) {
   this._activePiece.move(direction, 0);
   if (this.isPieceColliding()) {
      this._activePiece.move(-direction, 0);
   }
}

/**
 * Moves active piece down the grid.
 * Adds active piece to the grid if it collides with the grid
 */
Grid.prototype.movePieceDown = function() {
   this._activePiece.move(0, 1);
   if (this.isPieceColliding()) {
      this._activePiece.move(0, -1);
      this.addActivePiece();
   }
}

Grid.prototype.rotatePieceCounterClockwise = function() {
   this._activePiece.rotateLeft();
   if (this.isPieceColliding()) {
      this._activePiece.move(this._activePiece.x <= 0 ? 1 : -1, 0);
   }
}

Grid.prototype.rotatePieceClockwise = function() {
   this._activePiece.rotateRight();
   if (this.isPieceColliding()) {
      this._activePiece.move(this._activePiece.x <= 0 ? 1 : -1, 0);
   }
}

