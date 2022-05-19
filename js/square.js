
var squareSize = 10;

function drawSquareDemo() {
   var c = document.getElementById("myCanvas");
   var ctx = c.getContext("2d");
   drawSquare(ctx, 2, 2, "rgb(255, 0, 0)");
}

function drawSquare(ctx, x, y, color) {
   ctx.fillStyle = color;
   ctx.rect(x * squareSize, y * squareSize, squareSize, squareSize);
   ctx.fill();
   ctx.stroke();
}

