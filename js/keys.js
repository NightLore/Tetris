
var Keys = {
   _pressed: {},

   W: 87,
   A: 65,
   S: 83,
   D: 68,
   SPACE: 32,
   ENTER: 13,
   TAB: 9,
   ESC: 27,
   BACKSPACE: 8,

   LEFT: 37,
   UP: 38,
   RIGHT: 39,
   DOWN: 40,

   B: 66,
   C: 67,
   D: 68,
   E: 69,
   Q: 81,
   X: 88,
   Z: 90,

   isPressed: function() {
      for (var i = 0; i < arguments.length; i++)
      {
         if (this._pressed[arguments[i]])
            return true;
      }
      return false;
   },
    
   onKeyDown: function(e) { this._pressed[e.keyCode] = true; },
   onKeyUp: function(e) { delete this._pressed[e.keyCode]; },

   addKeyListeners: function() {
      document.addEventListener('keydown', this.onKeyDown.bind(this));
      document.addEventListener('keyup', this.onKeyUp.bind(this));
   },
};

