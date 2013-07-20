//Canvas's
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var canvas1 = document.getElementById('canvas1');
var context1 = canvas1.getContext('2d');
var canvas2 = document.getElementById('canvas2');
var context2 = canvas2.getContext('2d');
var canvas3 = document.getElementById('canvas3');
var context3 = canvas3.getContext('2d');
var canvas4 = document.getElementById('canvas4');
var context4 = canvas4.getContext('2d');
var canvas5 = document.getElementById('canvas5');
var context5 = canvas4.getContext('2d');
var canvas6 = document.getElementById('brushDisplay');
var context6 = canvas6.getContext('2d');

// Colours
var r = 100,
    g = 100,
    b = 100,
    o = 100;
//resize
function resizeCanvas(input) {
    input.width = document.width - 160;
    input.height = document.height - 40;
}
window.addEventListener('resize', winUpdate, false);

//global var's
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
var layerSelected = context1;
function setLayer(input) {
    console.log(input);
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
    if (y <= 0 || x > canvas.width) { }
    else if (drawType === "fill") {
        if (shape === "circle") {
            layerSelected.beginPath();
            layerSelected.arc(x, y, brushSize, 0, 2 * Math.PI, false);
            layerSelected.fillStyle = brushColour;
            layerSelected.fill();
        }
        else {
            layerSelected.beginPath();
            layerSelected.rect(x - brushSize, y - brushSize, brushSize * 2, brushSize * 2);
            layerSelected.fillStyle = brushColour;
            layerSelected.fill();
        }
    }
    else {
        if (shape === "circle") {
            layerSelected.beginPath();
            layerSelected.arc(x, y, brushSize, 0, 2 * Math.PI, false);
            var grd = layerSelected.createRadialGradient(x, y, brushSize / brushGrad, x, y, brushSize);
            grd.addColorStop(0, brushColour);
            grd.addColorStop(1, 'rgba(255,255,255,0)');
            layerSelected.fillStyle = grd;
            layerSelected.fill();
        }
        else {
            layerSelected.beginPath();
            layerSelected.rect(x - brushSize, y - brushSize, brushSize * 2, brushSize * 2);
            var grd = layerSelected.createRadialGradient(x, y, brushSize * 2 / brushGrad, x , y , brushSize * 2);
            grd.addColorStop(0, brushColour);
            grd.addColorStop(1, 'rgba(255,255,255,0)')
            layerSelected.fillStyle = grd;
            layerSelected.fill();
        }
    }
}
function colourSet(inr, ing, inb, ino) {
    r = inr;
    g = ing;
    b = inb;
    o = ino/100;
    brushColour = "rgba(" + r + "," + g + "," + b + "," + o + ")";
    display(canvas6.width / 2, canvas6.height / 2);
    mode = "draw";
}
function reset() {
    layerSelected.clearRect(0, 0, canvas.width, canvas.height);
}
function erase() {
    mode = "erase";
}
function brushSet(input) {
    brushSize = input;
    document.getElementById("brushDisplay").innerHTML = brushSize + "";
    display(canvas6.width / 2, canvas6.height / 2);
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
    posit[1] = e.clientY - 40|| e.pageY - 40;
    if (mouse === true) {
        if (mode === "erase") {
            if (posit[1] > canvas.height || posit[0] > canvas.width || posit[1] <= 0) { }
            else {
                layerSelected.clearRect(posit[0] - brushSize, posit[1] - brushSize, brushSize * 2, brushSize * 2);
            }
        }
        else {
            draw(posit[0], posit[1]);
        }
    }
    display(canvas6.width / 2, canvas6.height / 2);
};
window.onmousedown = function (e) {
    mouse = true;
    if (mode === "erase") {
        if (posit[1] > canvas.height || posit[0] > canvas.width || posit[1] <= 0) { }
        else {
            layerSelected.clearRect(posit[0] - brushSize, posit[1] - brushSize, brushSize * 2, brushSize * 2);
        } 
    }
    else {
        draw(posit[0], posit[1]);
    }
};
window.onmouseup = function (e) {
    mouse = false;
};

window.onload = function (e) {
    resizeCanvas(canvas);
    resizeCanvas(canvas1);
    resizeCanvas(canvas2);
    resizeCanvas(canvas3);
    resizeCanvas(canvas4);
    resizeCanvas(canvas5);
}
function winUpdate() {
    resizeCanvas(canvas);
    resizeCanvas(canvas1);
    resizeCanvas(canvas2);
    resizeCanvas(canvas3);
    resizeCanvas(canvas4);
    resizeCanvas(canvas5);
}




//DISPLAY
function display(x, y) {
    context6.clearRect(0, 0, canvas.width, canvas.height);
    if (drawType === "fill") {
        if (shape === "circle") {
            context6.beginPath();
            context6.arc(x, y, brushSize, 0, 2 * Math.PI, false);
            context6.fillStyle = brushColour;
            context6.fill();
        }
        else {
            context6.beginPath();
            context6.rect(x - brushSize, y - brushSize, brushSize * 2, brushSize * 2);
            context6.fillStyle = brushColour;
            context6.fill();
        }
    }
    else {
        if (shape === "circle") {
            context6.beginPath();
            context6.arc(x, y, brushSize, 0, 2 * Math.PI, false);
            var grd = context6.createRadialGradient(x, y, brushSize / brushGrad, x, y, brushSize);
            grd.addColorStop(0, brushColour);
            grd.addColorStop(1, 'rgba(255,255,255,0)');
            context6.fillStyle = grd;
            context6.fill();
        }
        else {
            context6.beginPath();
            context6.rect(x - brushSize, y - brushSize, brushSize * 2, brushSize * 2);
            var grd = context6.createRadialGradient(x, y, brushSize * 2 / brushGrad, x, y, brushSize * 2);
            grd.addColorStop(0, brushColour);
            grd.addColorStop(1, 'rgba(255,255,255,0)')
            context6.fillStyle = grd;
            context6.fill();
        }
    }
}
display(canvas6.width / 2, canvas6.height / 2);