
var Keys = {
   _pressed: {},
   _processed: {},

   W: "KeyW",
   A: "KeyA",
   S: "KeyS",
   D: "KeyD",
   SPACE: "Space",
   ENTER: "Enter",
   TAB: "Tab",
   ESC: "Escape",
   BACKSPACE: "Backspace",
   LEFTSHIFT: "ShiftLeft",
   RIGHTSHIFT: "ShiftRight",


   LEFT: "ArrowLeft",
   UP: "ArrowUp",
   RIGHT: "ArrowRight",
   DOWN: "ArrowDown",

   B: "KeyB",
   C: "KeyC",
   D: "KeyD",
   E: "KeyE",
   Q: "KeyQ",
   X: "KeyX",
   Z: "KeyZ",

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
    
   onKeyDown: function(e) { this._pressed[e.code] = true; },
   onKeyUp: function(e) {
      delete this._pressed[e.code];
      delete this._processed[e.code];
   },

   addKeyListeners: function() {
      document.addEventListener('keydown', this.onKeyDown.bind(this));
      document.addEventListener('keyup', this.onKeyUp.bind(this));
   },
};

