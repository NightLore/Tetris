
var Tetrominos = {
   All: [[[' ', ' ', ' ', ' '],
          ['X', 'X', 'X', 'X'],
          [' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ']],
         [['X', 'X'],
          ['X', 'X']],
         [[' ', 'X', ' '],
          ['X', 'X', 'X'],
          [' ', ' ', ' ']],
         [[' ', 'X', 'X'],
          ['X', 'X', ' '],
          [' ', ' ', ' ']],
         [['X', 'X', ' '],
          [' ', 'X', 'X'],
          [' ', ' ', ' ']],
         [['X', ' ', ' '],
          ['X', 'X', 'X'],
          [' ', ' ', ' ']],
         [[' ', ' ', 'X'],
          ['X', 'X', 'X'],
          [' ', ' ', ' ']]],

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
      console.log("GetAll", this);
      return [this.I, this.O, this.T, this.S, this.Z, this.J, this.L];
   },

   getRandom: function() {
      var tetrominos = this.getAll();
      return tetrominos[Math.random() * tetrominos.length];
   },
}

/*
Tetrominos.getAll = function() {
   return [Tetrominos.I, Tetrominos.O, Tetrominos.T, Tetrominos.S, Tetrominos.Z, Tetrominos.J, Tetrominos.L];
},

Tetrominos.getRandom = function() {
   var tetrominos = Tetrominos.getAll();
   return tetrominos[Math.random() * tetrominos.length];
},
*/

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
   console.log("Rotate Left start", this);
   var temp;
   var size = this.piece.length;
   var limit = Math.floor(size / 2);
   for (var row = 0; row < limit; row++) {
      for (var col = 0; col < limit; col++) {
         temp = this.piece[row][col];
         this.piece[row][col] = this.piece[row][size-1-col];
         this.piece[row][size-1-col] = this.piece[size-1-row][size-1-col];
         this.piece[size-1-row][size-1-col] = this.piece[size-1-row][col];
         this.piece[size-1-row][col] = temp;
      }
   }
   console.log("Rotate Left", this.piece);
}

Piece.prototype.rotateRight = function() {
   var temp;
   var size = this.piece.length;
   var limit = Math.floor(size / 2);
   for (var row = 0; row < limit; row++) {
      for (var col = 0; col < limit; col++) {
         temp = this.piece[row][col];
         this.piece[row][col] = this.piece[size-1-row][col];
         this.piece[size-1-row][col] = this.piece[size-1-row][size-1-col];
         this.piece[size-1-row][size-1-col] = this.piece[row][size-1-col];
         this.piece[row][size-1-col] = temp;
      }
   }
   console.log("Rotate Right", this.piece);
}

Piece.prototype.draw = function(ctx) {
}
