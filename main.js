var PaintJS = {
    initialise: function(callback){
        PaintJS.util.xhr("/config.json", function(data){
            PaintJS.config = JSON.parse(data)["Paint.JS"];
            PaintJS.menu.initialise(function(){
                callback();
            });
        });
    },
    menu: {
        initialise: function(callback){
            PaintJS.menu.container = document.getElementById("container_menus");
            PaintJS.config.menus.forEach(function(v, i, e){
                PaintJS.menu.array.push(new PaintJS.menu.classes.main(v));
            });
            PaintJS.menu.array.forEach(function(v, i, e){
                PaintJS.menu.container.appendChild(v.element);
            });
            callback();
        },
        classes: {
            main: function(config){
                for (prop in config){
                    this[prop] = config[prop];
                }
                this.element = document.createElement("div");
                this.element.className = "container_menu";
                this.element.style.width = this.size.width*40 + "px";
                this.element.style.height = (this.size.height*40)+10 + "px";
                this.header = new PaintJS.menu.classes.header({
                    name: this.name
                });
                this.element.appendChild(this.header.element);
                this.draggie = new Draggabilly(this.element, {
                    handle: "container_menu_header"
                });
                //this.element.style.left = this.location.left ? this.location.left + "px" : window.innerWidth-this.location.right-(this.size.width*40)+'px';
                //this.element.style.top = this.location.top ? this.location.top+'px' : window.innerHeight-((this.size.height*40)+10)-this.location.bottom+'px';
                this.element.style.bottom = "auto";
                $(this.element).draggable({handle:this.header.element});
                this.content = new PaintJS.menu.classes.content({});
                this.element.appendChild(this.content.element);
                if (this.colourSwatch) this.content.element.appendChild(PaintJS.menu.renderColourSwatch(this.colourSwatch));
                if (this.brushDisplay) this.content.element.appendChild(PaintJS.menu.renderBrushDisplay(this.brushDisplay));
            },
            header: function(config){
                for (prop in config){
                    this[prop] = config[prop];
                }
                this.element = document.createElement("div");
                this.element.className = "container_menu_header";
                this.element.innerHTML = this.name;
            },
            content: function(config){
                for (prop in config){
                    this[prop] = config[prop];
                }
                this.element = document.createElement("div");
                this.element.className = "container_menu_content";
            }
        },
        renderColourSwatch(config) {
            var swatchGroup = document.createElement("div");
            swatchGroup.id = "colourSwatch";
            swatchGroup.style.position = "absolute"
            for (i in config){
                if (i !== "colours") swatchGroup.style[i] = (config[i]*40)+"px";
            }
            for (var i=0; i<config.colours.length; i++){
                var coord = {
                    x:(i-((2*config.width)*((i-(i%(2*config.width)))/(2*config.width)))), 
                    y:((i-(i%(2*config.width)))/(2*config.width))
                };
                var swatch = document.createElement("button");
                swatch.style.backgroundColor = config.colours[i].hex;
                swatch.setAttribute("title", config.colours[i].name)
                swatch.style.position = "absolute";
                swatch.style.left = (coord.x*20)+"px";
                swatch.style.top = (coord.y*20)+"px";
                swatch.style.width="20px";
                swatch.style.height="20px";
                swatch.onclick = function(){
                    var breakDown = this.style.backgroundColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                    colourSet(parseInt(breakDown[1]),parseInt(breakDown[2]),parseInt(breakDown[3]));
                };
                swatchGroup.appendChild(swatch);
            }
            return (swatchGroup);
        },
        renderBrushDisplay(config){
            var Bcvs = document.createElement("canvas"),
                Bctx = Bcvs.getContext("2d");
            for (i in config){
                Bcvs.style[i] = (config[i]*40)+"px";
            }
            Bcvs.style.width = (config.width*40)-2+"px";
            Bcvs.width = (config.width*40)-2;
            Bcvs.height = config.height*40;
            Bcvs.className = "container_menu_brushDisplay";
            Bcvs.style.position = "absolute";
            PaintJS.cycle.register(function(){
                Bctx.clearRect(0, 0, Bcvs.width, Bcvs.height);
                Bctx.beginPath();
                Bctx.rect(0, 0, Bcvs.width, Bcvs.height);
                Bctx.fillStyle = back;
                Bctx.fill();
                submitDraw(Bcvs.width / 2, Bcvs.height/2, Bctx, "display");
            });
            return Bcvs;
        },
        array: []
    },
    cycle: {
        run: function(){
            PaintJS.cycle.events.forEach(function(v, i, e){
                v();
            });
        }, 
        register: function(call){
            PaintJS.cycle.events.push(call);
        }, 
        events: []
    },
    saves: {
        /*
        
        canvas1.toDataURL()
    
        */
        set db(data){
            localStorage.setItem(PaintJS.definitions.ID, JSON.stringify(data));
            PaintJS.out.print("Database set request recieved. Content was successfully loaded to localStorage");
        },
        get db(){
            var data = JSON.parse(localStorage.getItem(PaintJS.definitions.ID));
            if (data === null){
                PaintJS.out.warn("No save database found. Creating blank array.")
                data = []
                localStorage.setItem(PaintJS.definitions.ID, JSON.stringify(data));
            };
            PaintJS.out.print("Database get request recieved. Content was successfully loaded from localStorage");
            return data;
        },
        saved: function(){
            
        },
        save: function(){
            
        }
    },
    out: {
        print: function(msg){
            log("<Green>"+PaintJS.config.ID+":<Black> "+msg)
        },
        warn: function(msg){
            log("<Orange>"+PaintJS.config.ID+" WARNING:<Black> "+msg)
        },
        error: function(msg){
            log("<Red>"+PaintJS.config.ID+" ERROR:<Black> "+msg)
        }
    },
    util: {
        xhr: function (url, callback) {   
            var xhr = new XMLHttpRequest();
            xhr.overrideMimeType("application/json");
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == "200") {
                    callback(xhr.responseText);
                }
            }
            xhr.send();  
        }
    },
    config: {
        ID: "PaintJS"
    }
};
window.onload=function(){
    PaintJS.initialise(function(){
        
    });
    winUpdate();
};
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

// Colours
var r = 115,
    g = 255,
    b = 64,
    o = 100;
//resize
function resizeCanvas(input) {
    input.width = window.innerWidth;
    input.height = window.innerHeight;
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
    PaintJS.cycle.run();
}
display();
function drawText(x, y) {

}


function renderColourSwatch(config) {
    var container = document.createElement("div");
    container.id = "colourSwatch";
    container.style.position = "fixed"
    for (i in config){
        container.style[i] = config[i]+"px";
    }
    for (var i=0; i<config.colours.length; i++){
        var coord = {
            x:(i-(4*((i-(i%4))/4))), 
            y:((i-(i%4))/4)
        };
        var swatch = document.createElement("button");
        swatch.style.backgroundColor = config.colours[i];
        swatch.style.position = "absolute";
        swatch.style.left = (coord.x*20)+"px";
        swatch.style.top = (coord.y*20)+"px";
        swatch.style.width="20px";
        swatch.style.height="20px";
        swatch.onclick = function(){
            var breakDown = this.style.backgroundColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            colourSet(parseInt(breakDown[1]),parseInt(breakDown[2]),parseInt(breakDown[3]));
        };
        container.appendChild(swatch);
    }
    document.body.appendChild(container);
    
}
//"colours": [/*DARK PURPLE*/"#A944DB",/*PURPLE*/"#C44FFF",/*LIGHT PURPLE*/"#CD6BFF",/*PALE PURPLE*/"#D88AFF",/*DARK BLUE*/"#2D67C4",/*BLUE*/"#4089FF",/*LIGHT BLUE*/"#689EF7",/*PALE BLUE*/"#89B4FA",/*DARK GREEN*/"#42A61E",/*GREEN*/"#57D629",/*LIGHT GREEN*/"#5EE82C",/*LIME GREEN*/"#73FF40",/*RED*/"#FF3636",/*ORANGE*/"#FF7C36",/*LIGHT ORANGE*/"#FFAD29",/*YELLOW*/"#EBE544"]
