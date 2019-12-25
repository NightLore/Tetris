
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

function processKey(keyCode) {
    switch(keyCode) {
        case 65: // a
        case 37: // left
            left();
            break;
        case 87: // w
        case 38: // up
        case 67: // c
            store();
            break;
        case 68: // d
        case 39: // right
            right();
            break;
        case 83: // s
        case 40: // down
            speedUp()
            break;
        case 90: // z
        case 81: // q
            rotateLeft();
            break;
        case 88: // x
        case 69: // e
            rotateRight();
            break;
        case 32: // space
        case 13: // enter
            drop();
            break;
        default:
            console.log("Registered key: " + event.keyCode);
            break;
    }
}

function left() {
    console.log("Left");
}

function right() {
    console.log("Right");
}

function rotateLeft() {
    console.log("Rotate Left");
}

function rotateRight() {
console.log("Rotate Right");
}

function speedUp() {
console.log("Speed Up");
}

function drop(){
console.log("Drop");
}

function store() {
console.log("Store");
}