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
var displayCnv = document.getElementById('brushDisplay');
var displayCtx = displayCnv.getContext('2d');

// Colours
var r = 115,
    g = 255,
    b = 64,
    o = 100;
//resize
function resizeCanvas(input) {
    input.width = document.width;
    input.height = document.height;
}
window.addEventListener('resize', winUpdate, false);

//global var's
var posit = [];
var positSet = [];
var brushColour = "rgba("+r+","+g+","+b+","+o+")";
var brushSize = "30";
var back = "white";
var mouse = false;
var mode = "draw";
var grd;
var drawType = "fill";
var types = ["fill", "grad"];
var brushGrad;
var shape = "circle";
var shapes = ["circle", "square"];
var layerSelected = context1;
var clipped;
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
function submitDraw(x, y, inputLayer, display) {
    if (display !== "display") {
        if (x > 5 && x < 165 && y > canvas.height - 165 && y < canvas.height - 5) {}
        else if (x > canvas.width - 165 && x < canvas.width - 5 && y > canvas.height - 165 && y < canvas.height - 5) {}
        else {
            draw(x, y, inputLayer);
        }
    }
    else {
        draw(x, y, inputLayer);
    }
}
function draw(x, y, inputLayer) {
    if (drawType === "fill") {
        if (shape === "circle") {
            inputLayer.beginPath();
            inputLayer.arc(x, y, brushSize, 0, 2 * Math.PI, false);
            inputLayer.fillStyle = brushColour;
            inputLayer.fill();
        }
        else {
            inputLayer.beginPath();
            inputLayer.rect(x - brushSize, y - brushSize, brushSize * 2, brushSize * 2);
            inputLayer.fillStyle = brushColour;
            inputLayer.fill();
        }
    }
    else {
        if (shape === "circle") {
            inputLayer.beginPath();
            inputLayer.arc(x, y, brushSize, 0, 2 * Math.PI, false);
            var grd = inputLayer.createRadialGradient(x, y, brushSize / brushGrad, x, y, brushSize);
            grd.addColorStop(0, brushColour);
            grd.addColorStop(1, 'rgba(255,255,255,0)');
            inputLayer.fillStyle = grd;
            inputLayer.fill();
        }
        else {
            inputLayer.beginPath();
            inputLayer.rect(x - brushSize, y - brushSize, brushSize * 2, brushSize * 2);
            var grd = inputLayer.createRadialGradient(x, y, brushSize * 2 / brushGrad, x, y, brushSize * 2);
            grd.addColorStop(0, brushColour);
            grd.addColorStop(1, 'rgba(255,255,255,0)')
            inputLayer.fillStyle = grd;
            inputLayer.fill();
        }
    }
}
function colourSet(inr, ing, inb) {
    r = inr;
    g = ing;
    b = inb;
    document.getElementById('rcolDisplay').innerHTML = r;
    document.getElementById('rcol').value = r;
    document.getElementById('gcolDisplay').innerHTML = g;
    document.getElementById('gcol').value = g;
    document.getElementById('bcolDisplay').innerHTML = b;
    document.getElementById('bcol').value = b;
    brushColour = "rgba(" + r + "," + g + "," + b + "," + o + ")";
    display();
    mode = "draw";
}
function opacSet(input) {
    o = input / 100;
    brushColour = "rgba(" + r + "," + g + "," + b + "," + o + ")";
    document.getElementById('ocolDisplay').innerHTML = o;
    display();
    mode = "draw";
}
function reset() {
    layerSelected.clearRect(0, 0, canvas.width, canvas.height);
}
function erase() {
    mode = "erase";
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
            if (posit[1] > canvas.height || posit[0] > canvas.width || posit[1] <= 0) { }
            else {
                layerSelected.clearRect(posit[0] - brushSize, posit[1] - brushSize, brushSize * 2, brushSize * 2);
            }
        }
        else {
            submitDraw(posit[0], posit[1], layerSelected);
        }
    }
    display();
};
window.onmousedown = function (e) {
    mouse = true;
    positSet[0] = posit[0];
    positSet[1] = posit[1];
    if (mode === "erase") {
        if (posit[1] > canvas.height || posit[0] > canvas.width || posit[1] <= 0) { }
        else {
            layerSelected.clearRect(posit[0] - brushSize, posit[1] - brushSize, brushSize * 2, brushSize * 2);
        } 
    }
    else {
        submitDraw(posit[0], posit[1], layerSelected);
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
function display() {
    displayCtx.clearRect(0, 0, canvas.width, canvas.height);
    displayCtx.beginPath();
    displayCtx.rect(0, 0, displayCnv.width, displayCnv.height);
    displayCtx.fillStyle = back;
    displayCtx.fill();
    console.log("Updating display");
    submitDraw(displayCnv.width / 2, displayCnv.height/2, displayCtx, "display");
}
display();
function drawText(x, y) {

}

/* WIP
function renderColourSwatch(x, y, sX, sY) {
    var style = document.createElement("styleInner")
    style.type = "text/css";
    var styles = "";
    var swatches = [];
    var left = x;
    var bottom = y;
    for (var i = 1; i <= 16; i++){
        console.log("got button" + i);
        swatches[i] = "button" + i;
    }
    for (var i = 1; i <= 4; i++) {
        for (var j = 1; j <= 4; j++) {
            styles += "#button"+i*j+" {width: "+sX+"; height: "+sY+"}";
        }
    }
    style.appendChild(document.createTextNode(styles));
}
renderColourSwatch(8, 8, 8, 8);
*/