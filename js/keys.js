
var Keys = {
   _pressed: {},
   _processed: {},

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

   /**
    * First parameter is whether or not to mark the key as processed.
    * Rest of the parameters are keyCodes to check.
    * Returns the first keyCode of the given keys that is pressed and not processed
    *    false otherwise.
    */
   isPressed: function(shouldProcess, ...keyCodes) {
      for (let i = 0; i < keyCodes.length; i++)
      {
         let keyCode = keyCodes[i];
         if (this._pressed[keyCode] && !this._processed[keyCode]) {
            this._processed[keyCode] = shouldProcess;
            return keyCode;
         }
      }
      return false;
   },
    
   onKeyDown: function(e) { this._pressed[e.keyCode] = true; },
   onKeyUp: function(e) {
      delete this._pressed[e.keyCode];
      delete this._processed[e.keyCode];
   },

   addKeyListeners: function() {
      document.addEventListener('keydown', this.onKeyDown.bind(this));
      document.addEventListener('keyup', this.onKeyUp.bind(this));
   },
};

