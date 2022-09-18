

//create the canvas
var danmakuCanvas = document.createElement('canvas');
danmakuCanvas.id = "c";
danmakuCanvas.style.cssText = "position: absolute;display:block;top:0; z-index:1;pointer-events:none;";
console.log(danmakuCanvas);
document.body.appendChild(danmakuCanvas);

//an array of messages to send
var danmakuMsg = ["すげえええ","メルト",
"♪♫♪♫♪","♫♪♫","かわいい","ありがどう，サヨナラ！",
"ありがとうryo","エモい"]

var c = document.getElementById("c");
var ctx = c.getContext("2d");
//init of shit
c.height = document.body.clientHeight;
console.log(c.height);
c.width = window.innerWidth;

var fps = 60;




var pps = 300; //pixels per second
var delta = 1000/fps; //ms passed since last frame
var fontStyle = "5rem Noto Sans JP"; //the font in this order.

var x=0;
var danmakuAmount = 8; // per cycle, how many should be loaded

var rows = Math.floor(c.height / (5*16));
console.log(rows);

//every iteration things go here for now.

var msgArray = new Array();

class Danmaku {
    constructor(msg, width, height){
        this.msg = msg;
        this.width = width;
        this.height = height;
    }
}

var usedRows = new Array();
//pick messages, set where and when in the msgArray;
while(msgArray.length < danmakuAmount){

    //find a empty row and throw the message in
    var ok = false;
    while(ok != true){ //THIS IS SO STUPID MAN
        var row = Math.floor(Math.random() * rows+1);
        if(usedRows.includes(row)){
    
        }else{
            usedRows.push(row);
            ok=true;
        }
    }

    var arrIndex = danmakuMsg[Math.floor(Math.random() * danmakuMsg.length)];
    
    //q2 how 2 determine when the messages will appear

    var temp = new Danmaku(arrIndex, 1980+(Math.floor(Math.random() * 600)), row * (16*5));
    msgArray.push(temp);
    danmakuMsg.splice(arrIndex,1);
}





function draw() { //every FRAME
    ctx.font = fontStyle;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";

    ctx.lineWidth = 1;


    if(x > -2700){
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.restore();
        x-= pps * delta / 1000;
        ctx.translate(x, 0);

        for(i=0; i< danmakuAmount; i++){ //TODO: below 2 numbers should be random
            ctx.fillText(msgArray[i].msg, msgArray[i].width, msgArray[i].height);
            ctx.strokeText(msgArray[i].msg, msgArray[i].width, msgArray[i].height);
        }
        // ctx.fillText("ありがどう，サヨナラ！", 2000, 50);
        // ctx.strokeText("ありがどう，サヨナラ！", 2000, 50);  
        // ctx.fillText("ありがどう，サヨナラ！", 1930, 20);
        // ctx.strokeText("ありがどう，サヨナラ！", 1930, 20);  
        // ctx.fillText("ありがどう，サヨナラ！", 2500, 100);
        // ctx.strokeText("ありがどう，サヨナラ！", 2500, 100);  
        // ctx.fillText("ありがどう，サヨナラ！", 1930, 300);
        // ctx.strokeText("ありがどう，サヨナラ！", 1930, 300);  
        // ctx.fillText("ありがどう，サヨナラ！", 3000, 25);
        // ctx.strokeText("ありがどう，サヨナラ！", 3000, 25);
        
        // ctx.fillText("ありがどう，サヨナラ！", 1930, 1500);
        // ctx.strokeText("ありがどう，サヨナラ！", 1930, 1500);
    }else{
        x=0; //return x back to 0 then we run it back baby
    }


    ctx.setTransform(1, 0, 0, 1, 0, 0);

}

setInterval(draw, delta);