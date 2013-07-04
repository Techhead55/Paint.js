var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var canvas2 = document.getElementById('canvas2');
var context2 = canvas2.getContext('2d');
var posit = [];
var brushColour = "73FF40";
var brushSize = "10";
var back = "white";
var colours = ["FF3636", "FF7C36", "FFAD29", "EBE544", "42A61E", "57D629", "5EE82C", "73FF40", "2D67C4", "4089FF", "689EF7", "89B4FA", "A944DB", "C44FFF", "CD6BFF", "D88AFF", "white", "black"];
//red orangedark orangelight yellow darkgreen darkgreenlight green greenlight darkblue lightdarkblue darklightblue lightblue darkpurple lightdarkpurple darklightpurple lightpurple white black
var mouse = false;
var mode = "draw";
var colour = new Object;
colour.r=255;
colour.g=255;
colour.b=255;
colour.opacity= 1;
colour.export = function () {
    brushColour = "rgba(" + colour.r + "," + colour.g + "," + colour.b + "," + colour.opacity+")";
};
function draw(x, y) {
    if (y > canvas.height || x > canvas.width) { }
    else {
        context.beginPath();
        context.arc(x, y, brushSize, 0, 2 * Math.PI, false);
        context.fillStyle = brushColour;
        context.fill();
    }
}
function colourSet(input) {
    brushColour = input;
    mode = "draw";
    document.getElementById('colourpicker').style.backgroundColor = input;
}
function reset() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
function erase() {
    mode = "erase";
}
function brushSet(input) {
    brushSize = input;
}
function backgroundColour(input) {
    context2.beginPath();
    context2.rect(0, 0, canvas2.width, canvas2.height);
    context2.fillStyle = input;
    context2.fill();
    back = input;
}
window.onmousemove = function (e) {
    e = e || window.event;
    posit[0] = e.clientX || e.pageX;
    posit[1] = e.clientY || e.pageY;
    if (mouse === true) {
        if (mode === "erase") {
            context.clearRect(posit[0] - brushSize, posit[1] - brushSize, brushSize*2, brushSize*2);
        }
        else {
            draw(posit[0], posit[1]);
        }
    }
};
window.onmousedown = function (e) {
    mouse = true;
    if (mode === "erase") {
        context.clearRect(posit[0] - brushSize, posit[1] - brushSize, brushSize * 2, brushSize * 2);
    }
    else {
        draw(posit[0], posit[1]);
    }
};
window.onmouseup = function (e) {
    mouse = false;
};
window.touchstart = function (e) {
    mouse = true;
    if (mode === "erase") {
        context.clearRect(posit[0] - brushSize, posit[1] - brushSize, brushSize * 2, brushSize * 2);
    }
    else {
        draw(posit[0], posit[1]);
    }
}
window.touchend = function (e) {
    mouse = false;
};
