
var Pieces = {
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

    getAllPieces: function() {
        return [I, O, T, S, Z, J, L];
    },

    getRandomPiece: function() {
        var pieces = getAllPieces();
        return pieces[Math.random() * pieces.length];
    },

    rotateLeft: function(piece) {
    },

    rotateRight: function(piece) {
    }
}
var Piece = function(p) {
    this.piece = p || Pieces.getRandomPiece();
}

Piece.prototype.rotateLeft = function() {
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