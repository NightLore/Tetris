
/**
 * Constructs a basic game engine
 */
var GameEngine = function(canvas, FPS) {
   this.FPS = 1000 / FPS;
   this.canvas = canvas;
   this.context2D = canvas.getContext("2d");
   this.width = canvas.width;
   this.height = canvas.height;
   this.uiObjects = [];
   this.gameObjects = [];
}
 
/**
 * Sets up the game engine with event listeners for the given canvas
 */
GameEngine.prototype.setupInput = function() {
   this.mouse = {
      x: 0,
      y: 0,
      clicked: [false, false, false],
      down: [false, false, false]
   };
 
   var engine = this;

   this.canvas.addEventListener("mousemove", function(e) {
      var pos = getMousePos(engine.canvas,e);
      engine.mouse.x = pos.x;
      engine.mouse.y = pos.y;
   });
 
   this.canvas.addEventListener("mousedown", function(e) {
      engine.mouse.clicked[e.which-1] = !engine.mouse.down[e.which-1];
      engine.mouse.down[e.which-1] = true;
   });

   this.canvas.addEventListener("mouseup", function(e) {
      engine.mouse.down[e.which-1] = false;
      engine.mouse.clicked[e.which-1] = false;
   });
   window.addEventListener('resize', function() {engine.resize_canvas();});
}

GameEngine.prototype.resize_canvas = function() {
   var aspectRatio = window.innerWidth / window.innerHeight;
   var newHeight = this.width / aspectRatio;
   this.canvas.height = newHeight;
   this.height = newHeight;
}
 
/**
 * Runs the game loop
 */
GameEngine.prototype.run = function() {
   var desiredTime = Date.now() + this.FPS;
 
   this.update();
   this.draw();

   var engine = this;
 
   var interval = Math.max(0, desiredTime-Date.now());
   setTimeout( function() { engine.run() }, interval); // basic infinite loop
}
 
/**
 * Updates the logic of the game with all the game objects
 */
GameEngine.prototype.update = function() {
   for (var i = 0; i < this.gameObjects.length; i++) {
      this.gameObjects[i].update(this.mouse);
   }
}
 
/**
 * Draws the game with all the game objects
 */
GameEngine.prototype.draw = function() {
   this.context2D.setTransform(1,0,0,1,0,0); // reset the transform matrix as it is cumulative
   this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);//clear the viewport AFTER the matrix is reset
}

GameEngine.prototype.processKeyInput = function() {
   
}
