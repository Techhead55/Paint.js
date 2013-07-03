var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var canvas2 = document.getElementById('canvas2');
var context2 = canvas2.getContext('2d');
var posit = [];
var brushColour = "73FF40";
var brushSize = "10";
var back = "white";
var colours = ["73FF40", "4089FF", "FF3636", "EBE544", "FF8D29", "C44FFF", "black", "white"];
function draw(x, y) {
    if (y > 500) { }
    else {
        context.beginPath();
        context.arc(x, y, brushSize, 0, 2 * Math.PI, false);
        context.fillStyle = brushColour;
        context.fill();
    }
}
function colourSet(input) {
    brushColour = input;
}
function reset() {
    context.beginPath();
    context.rect(0, 0, 1024, 500);
    context.fillStyle = "rgba(255, 255, 255, 0.00)";
    context.fill();
}
function erase() {
    brushColour = back;
}
function brushSet(input) {
    brushSize = input;
}
function backgroundColour(input) {
    context2.beginPath();
    context2.rect(0, 0, 1024, 500);
    context2.fillStyle = input;
    context2.fill();
    back = input;
}
window.onmousemove = function (e) {
    e = e || window.event;
    posit[0] = e.clientX || e.pageX;
    posit[1] = e.clientY || e.pageY;
};
window.onmousedown = function (e) {
    draw(posit[0], posit[1], 5);

};
