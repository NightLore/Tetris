
const SQUARE_SIZE = 10;

function drawSquare(ctx, x, y) {
   ctx.rect(x * SQUARE_SIZE, y * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
   ctx.fill();
   ctx.stroke();
}

var Grid = function(width, height) {
   this._width = width;
   this._height = height;
   this._color = "rgb(50, 50, 50)";
   this._board = new Array(width);
   for (let i = 0; i < width; i++) {
      this._board[i] = new Array(height);
   }
}

Grid.prototype.inBounds = function(x, y) {
   return 0 <= x && x < this._width
       && 0 <= y && y < this._height;
}

Grid.prototype.isColliding = function(piece) {
   let squares = piece.getSquares();
   for (let i = 0; i < squares.length; i++) {
      let {x, y} = squares[i];
      if (!this.inBounds(x, y) || this._board[x][y]) {
         return true;
      }
   }
   return false;
}

Grid.prototype.addPiece = function(piece) {
   let rows = new Set();
   const squares = piece.getSquares();
   for (let i = 0; i < squares.length; i++) {
      const {x, y, color} = squares[i];
      this._board[x][y] = color;
      rows.add(y);
   }
   for (const row of rows.values()) {
      if (this.checkRow(row)) {
         this.removeRow(row);
      }
   }
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
         if (this._board[i][j]) {
            ctx.fillStyle = this._board[i][j];
            drawSquare(ctx, i, j);
            ctx.beginPath();
         }
      }
   }
}
