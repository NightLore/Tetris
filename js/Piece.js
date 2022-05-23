
var Tetrominos = {
   _all: [],

   I: [[' ', ' ', ' ', ' '],
       ['X', 'X', 'X', 'X'],
       [' ', ' ', ' ', ' '],
       [' ', ' ', ' ', ' ']],
   O: [['X', 'X'],
       ['X', 'X']],
   T: [[' ', 'X', ' '],
       ['X', 'X', 'X'],
       [' ', ' ', ' ']],
   S: [[' ', 'X', 'X'],
       ['X', 'X', ' '],
       [' ', ' ', ' ']],
   Z: [['X', 'X', ' '],
       [' ', 'X', 'X'],
       [' ', ' ', ' ']],
   J: [['X', ' ', ' '],
       ['X', 'X', 'X'],
       [' ', ' ', ' ']],
   L: [[' ', ' ', 'X'],
       ['X', 'X', 'X'],
       [' ', ' ', ' ']],

   getAll: function() {
      return [this.I, this.O, this.T, this.S, this.Z, this.J, this.L];
   },

   getRandom: function() {
      if (this._all.length == 0)
         this._all = this.getAll();
      var index = Math.floor(Math.random() * this._all.length);
      var tetromino = this._all.splice(index, 1)[0];
      console.log(index, tetromino);
      return tetromino;
   },
}

var Piece = function(x, y, color, p) {
   this.piece = p || Tetrominos.getRandom();
   this.x = x || 0;
   this.y = y || 0;
   this.color = color || "rgb(255, 0, 0)";
}

/**
 * Attempt to move piece left in the given grid.
 * Does not move if it will collide with grid.
 * Returns true if succeeded to move left, false otherwise.
 */
Piece.prototype.moveLeft = function(grid) {
   this.x--;
   if (grid.isColliding(this)) {
      this.x++;
      return false;
   }
   return true;
}

/**
 * Attempt to move piece right in the given grid.
 * Does not move if it will collide with grid.
 * Returns true if succeeded to move right, false otherwise.
 */
Piece.prototype.moveRight = function(grid) {
   this.x++;
   if (grid.isColliding(this)) {
      this.x--;
      return false;
   }
   return true;
}

/**
 * Attempt to move piece down in the given grid.
 * Does not move if it will collide with grid.
 * Returns true if succeeded to move down, false otherwise.
 */
Piece.prototype.moveDown = function(grid) {
   this.y++;
   if (grid.isColliding(this)) {
      this.y--;
      return false;
   }
   return true;
}

Piece.prototype.rotateLeft = function() {
   const size = this.piece.length;
   const x = Math.floor(size / 2);
   const y = size - 1;
   for (let i = 0; i < x; i++) {
      for (let j = i; j < y - i; j++) {
         let temp = this.piece[i][j];
         this.piece[i][j] = this.piece[j][y-i];
         this.piece[j][y-i] = this.piece[y-i][y-j];
         this.piece[y-i][y-j] = this.piece[y-j][i];
         this.piece[y-j][i] = temp;
      }
   }
   console.log("Rotate Left", size, x, y, this.piece);
}

Piece.prototype.rotateRight = function() {
   const size = this.piece.length;
   const x = Math.floor(size / 2);
   const y = size - 1;
   for (let i = 0; i < x; i++) {
      for (let j = i; j < y - i; j++) {
         let temp = this.piece[i][j];
         this.piece[i][j] = this.piece[y-j][i];
         this.piece[y-j][i] = this.piece[y-i][y-j];
         this.piece[y-i][y-j] = this.piece[j][y-i];
         this.piece[j][y-i] = temp;
      }
   }
   console.log("Rotate Right", size, x, y, this.piece);
}

Piece.prototype.getSquares = function() {
   const size = this.piece.length;
   let squares = [];
   for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
         if (this.piece[i][j] !== 'X')
            continue;

         squares.push({
            x: this.x + i,
            y: this.y + j,
            color: this.color,
         });
      }
   }
   return squares;
}

Piece.prototype.draw = function(ctx) {
   ctx.beginPath();
   ctx.fillStyle = this.color;
   const size = this.piece.length;
   for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
         if (this.piece[i][j] !== 'X')
            continue;

         drawSquare(ctx, this.x + i, this.y + j);
      }
   }
}
