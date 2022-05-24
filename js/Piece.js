
var Piece = function(pos) {
   const tetromino = Tetrominos.getRandom();
   this.tetromino = tetromino;

   this.resetBlocks();
   this.setPosition(pos);
}

Piece.prototype.resetBlocks = function() {
   // deep copy of tetromino blocks
   this.piece = this.tetromino.blocks.map((row) => [...row]);
}

/**
 * Sets x and y to given position object's x and y.
 * Note that x is the center of this piece and y is the top
 * Sets x and y to zero if not given a position
 */
Piece.prototype.setPosition = function(pos) {
   pos = pos || {};
   this.x = pos.x - Math.floor(this.piece.length / 2) || 0;
   this.y = pos.y || 0;
}

Piece.prototype.setCenterPosition = function() {
   const halfWidth = this.piece.length / 2;
   this.x = -halfWidth;
   this.y = -halfWidth;
}

Piece.prototype.move = function(dirX, dirY) {
   this.x += dirX;
   this.y += dirY;
}

Piece.prototype.rotateClockwise = function() {
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

Piece.prototype.rotateCounterClockwise = function() {
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
            color: this.tetromino.color,
         });
      }
   }
   return squares;
}

Piece.prototype.draw = function(ctx) {
   ctx.beginPath();
   ctx.strokeStyle = "transparent";
   ctx.fillStyle = this.tetromino.color;
   const size = this.piece.length;
   for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
         if (this.piece[i][j] !== 'X')
            continue;

         drawSquare(ctx, this.x + i, this.y + j);
      }
   }
}
