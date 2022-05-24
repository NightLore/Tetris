
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
      return tetromino.map((row) => [...row]); // return deep copy of tetromino
   },
}

var Piece = function(pos) {
   this.piece = Tetrominos.getRandom();
   this.color = "rgb(255, 0, 0)";
   this.setPosition(pos);
}

/**
 * Sets x and y to given position object's x and y.
 * Sets x and y to zero if not given a position
 */
Piece.prototype.setPosition = function(pos) {
   pos = {} || pos;
   this.x = pos.x || 0;
   this.y = pos.y || 0;
}

Piece.prototype.move = function(dirX, dirY) {
   this.x += dirX;
   this.y += dirY;
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
   ctx.strokeStyle = "transparent";
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
