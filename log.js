function log(){
    Array.prototype.slice.call(arguments, 0).forEach(function(input){
        var properties = [],
            config = {cs: "<", ce: ">", ss: "(", se: ")", vi: "@"},
            string = input.replace("<>", "").split(eval("/"+config.vi+"/g"));
        string.forEach(function (val, index){
            if (index !== 0) string[index] = string[index].replace(string[index].split(" ")[0], string[index].split(" ")[0].split(".").length > 1 ? 
                eval(string[index].split(" ")[0].split(".")[0]) + "." :
                eval(string[index].split(" ")[0].split(".")[0])
            );
        });
        string = string.join("").replace(eval("/"+config.ce+config.cs+"/g"), config.ce+" "+config.cs).split(eval("/["+config.cs+config.ce+"]+/"));
        string.forEach(function(val, index){
            string[index] = index%2 === 0 ? properties.length>0 ? "%c"+string[index] : string[index] : "";
            if (val.indexOf(config.ss) !== -1) val = eval(val.substring(val.indexOf(config.ss)+1, val.length-1)) ? 
                val.substring(0, val.indexOf(config.ss)) : 
                properties.length > 0 ? 
                    properties[properties.length-1].substring(7, properties[properties.length-1].length-1) : 
                    "black";
            val = val.split(",").length === 3 ? 
                "rgb("+val+")" : 
                val;
            if (index%2 === 1) properties.push(!isNaN(parseInt(val)) && val.split(",").length === 1 ? 
                "font-size: "+val+"px;" : 
                val.split(",").length === 4 ? 
                    "font-size: "+val.split(",")[0]+"px; color: rgb("+val.split(",").slice(1, 4).join(",")+");":
                    val.split(",").length === 2 ?
                        "color:"+val.split(",")[1]+"; font-size: "+val.split(",")[0]+"px;":
                        "color:"+val+";"
            );
        });
        console.log.apply(console, [string.join("").replace(/ %c/g,"%c")].concat(properties));
    });
}