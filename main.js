var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var canvas1 = document.getElementById('canvas1');
var context1 = canvas1.getContext('2d');
var canvas2 = document.getElementById('canvas2');
var context2 = canvas1.getContext('2d');
var canvas3 = document.getElementById('canvas3');
var context3 = canvas1.getContext('2d');
var canvas4 = document.getElementById('canvas4');
var context4 = canvas1.getContext('2d');
var canvas5 = document.getElementById('canvas5');
var context5 = canvas1.getContext('2d');

var posit = [];
var brushColour = "73FF40";
var brushSize = "10";
var back = "white";
var colours = ["FF3636", "FF7C36", "FFAD29", "EBE544", "42A61E", "57D629", "5EE82C", "73FF40", "2D67C4", "4089FF", "689EF7", "89B4FA", "A944DB", "C44FFF", "CD6BFF", "D88AFF", "white", "black"];
//red orangedark orangelight yellow darkgreen darkgreenlight green greenlight darkblue lightdarkblue darklightblue lightblue darkpurple lightdarkpurple darklightpurple lightpurple white black
var mouse = false;
var mode = "draw";
var grd;
var drawType = "fill";
var types = ["fill", "grad"];
var brushGrad;
var shape = "circle";
var shapes = ["circle", "square"];
var layerSelected = 1;
function setLayer(input) {
    layerSelected = input;
}
function setShape(input) {
    shape = input;
}
function setDrawType(input) {
    if (input === "fill") {
        drawType = input;
    }
    else {
        drawType = "grad";
        brushGrad = input;
    }
}
function setShape(input) {
    shape = input;
}
function draw(x, y) {
    if (y > canvas1.height || x > canvas1.width) { }
    else if (drawType === "fill") {
        if (shape === "circle") {
            context1.beginPath();
            context1.arc(x, y, brushSize, 0, 2 * Math.PI, false);
            context1.fillStyle = brushColour;
            context1.fill();
        }
        else {
            context1.beginPath();
            context1.rect(x - brushSize, y - brushSize, brushSize * 2, brushSize * 2);
            context1.fillStyle = brushColour;
            context1.fill();
        }
    }
    else {
        if (shape === "circle") {
            context1.beginPath();
            context1.arc(x, y, brushSize, 0, 2 * Math.PI, false);
            var grd = context1.createRadialGradient(x, y, brushSize / brushGrad, x, y, brushSize);
            grd.addColorStop(0, brushColour);
            grd.addColorStop(1, 'rgba(255,255,255,0)');
            context1.fillStyle = grd;
            context1.fill();
        }
        else {
            context1.beginPath();
            context1.rect(x - brushSize, y - brushSize, brushSize*2, brushSize*2);
            var grd = context1.createRadialGradient(x, y, brushSize*2/ brushGrad,x-brushSize,y-brushSize,brushSize*2);
            grd.addColorStop(0, brushColour);
            grd.addColorStop(1, 'rgba(255,255,255,0)')
            context1.fillStyle = brushColour;
            context1.fill();
        }
    }
}
function colourSet(input) {
    brushColour = input;
    mode = "draw";
    document.getElementById('colourpicker').style.backgroundColor = input;
}
function reset() {
    context1.clearRect(0, 0, canvas1.width, canvas1.height);
}
function erase() {
    mode = "erase";
}
function brushSet(input) {
    brushSize = input;
}
function backgroundColour(input) {
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = input;
    context.fill();
    back = input;
}
window.onmousemove = function (e) {
    e = e || window.event;
    posit[0] = e.clientX || e.pageX;
    posit[1] = e.clientY || e.pageY;
    if (mouse === true) {
        if (mode === "erase") {
            if (posit[1] > canvas1.height || posit[0] > canvas1.width) { }
            else {context1.clearRect(posit[0] - brushSize, posit[1] - brushSize, brushSize*2, brushSize*2);}
        }
        else {
            draw(posit[0], posit[1]);
        }
    }
};
window.onmousedown = function (e) {
    mouse = true;
    if (mode === "erase") {
        context1.clearRect(posit[0] - brushSize, posit[1] - brushSize, brushSize * 2, brushSize * 2);
    }
    else {
        draw(posit[0], posit[1]);
    }
};
window.onmouseup = function (e) {
    mouse = false;
};
