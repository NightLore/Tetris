
var Tetrominos = {
   _all: [],

   I: [[' ', 'X', ' ', ' '],
       [' ', 'X', ' ', ' '],
       [' ', 'X', ' ', ' '],
       [' ', 'X', ' ', ' ']],
   O: [['X', 'X'],
       ['X', 'X']],
   T: [[' ', 'X', ' '],
       ['X', 'X', ' '],
       [' ', 'X', ' ']],
   S: [['X', ' ', ' '],
       ['X', 'X', ' '],
       [' ', 'X', ' ']],
   Z: [[' ', 'X', ' '],
       ['X', 'X', ' '],
       ['X', ' ', ' ']],
   J: [[' ', 'X', ' '],
       [' ', 'X', ' '],
       ['X', 'X', ' ']],
   L: [['X', 'X', ' '],
       [' ', 'X', ' '],
       [' ', 'X', ' ']],

   getAll: function() {
      return [
         { blocks: this.I, index: 0, color: "cyan" },
         { blocks: this.O, index: 1, color: "yellow" },
         { blocks: this.T, index: 2, color: "purple" },
         { blocks: this.S, index: 3, color: "green" },
         { blocks: this.Z, index: 4, color: "red" },
         { blocks: this.J, index: 5, color: "blue" },
         { blocks: this.L, index: 6, color: "orange" },
      ];
   },

   getRandom: function() {
      if (this._all.length == 0)
         this._all = this.getAll();
      var index = Math.floor(Math.random() * this._all.length);
      var tetromino = this._all.splice(index, 1)[0];
      return tetromino;
   },
}

