
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

var Piece = function(p) {
   this.piece = p || Tetrominos.getRandom();
}

Piece.prototype.moveLeft = function() {
   console.log("Left");
}

Piece.prototype.moveRight = function() {
   console.log("Right");
}

Piece.prototype.moveDown = function() {
   console.log("Down");
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

Piece.prototype.draw = function(ctx) {
}
