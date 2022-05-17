
var Tetrominos = {
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

   getAllTetrominos: function() {
      return [I, O, T, S, Z, J, L];
   },

   getRandomTetromino: function() {
      var tetrominos= getAllTetrominos();
      return tetrominos[Math.random() * tetrominos.length];
   },
}
var Piece = function(p) {
   this.piece = p || Tetrominos.getRandomTetromino();
}

Piece.prototype.moveLeft() = function() {
   console.log("Left");
}

Piece.prototype.moveRight() = function() {
   console.log("Right");
}

Piece.prototype.moveDown() = function() {
   console.log("Down");
}

Piece.prototype.rotateLeft = function() {
   console.log("Rotate Left");
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
}

Piece.prototype.rotateRight = function() {
   console.log("Rotate Right");
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
}

Piece.prototype.draw = function(ctx) {
}
