var rs=new Audio("run.mp3");
rs.loop=true;
var js=new Audio("jump.mp3");
var ds=new Audio("dead.mp3");

var rw=0; //Run worker
var b=0;  //background
var bw=0; //background worker
var fw=0; //flame worker
var fid=0;
var j =1; //jump
var u =0; //score
var sw=0; //score worker
var jw=0; //jump worker
var mt=370; //බාධකයේ උස 
var p =1000;
var img=document.getElementById("boy"); //boy  
var r = 1; //run
var d = 1; //dead
var dw = 0; //dead worker


function key(event){
    if(event.which==13){
        if(rw==0){
            fid=f()
            fw=setInterval(move,80);
            rw=setInterval(run,100);
            rs.play();
            bw=setInterval(back,80);
            sw=setInterval(score,1000);
        }
    }
    if(event.which==32){
        if(jw==0){
            clearInterval(rw);
            rs.pause();
            jw=setInterval(jump,100);
            js.play();
            rw=-1;
        }
    }
}    


function f(){
    for(var y=0;y<500;y++){
    var a=document.createElement("img");
    a.src="flame.gif";
    a.className="f";
    a.style.marginLeft=p+"px";

    if(y<=5){
        p=p+700;
    }
    if(y>=6){
        p=p+450;
    }
    
    a.id="d"+y;
    document.getElementById("b").appendChild(a);
    }
}

function move(){
    for(var y=0; y<100;y++){
    var z =getComputedStyle(document.getElementById("d"+y));
    var w = parseInt(z.marginLeft) - 20;
    document.getElementById("d"+y).style.marginLeft=w+"px";
    
    if(w>80 & w<=210){
         if(mt>300){
            clearInterval(rw);
            clearInterval(jw);
            jw=-1;
            clearInterval(fw);
            clearInterval(bw);
            clearInterval(sw);
            dw=setInterval(dead,100);
            rs.pause();
            ds.play();
         }   
       } 
    }
}


function run(){
    r=r+1;
    if(r==9){
        r=1;
    }
    img.src="Run ("+r+").png";
}


function back(){
    b=b-20
    document.getElementById("b").style.backgroundPositionX=b+"px";
}


function jump(){
    if(j<=6){
        mt = mt - 40;
    }
    if(j>=7){
        mt = mt + 40;
    }
    img.style.marginTop= mt + "px";

    j=j+1;
    if(j==13){
        j=1;
        clearInterval(jw);
        rw=0;
        rw=setInterval(run,100);
        rs.play();
        jw=0;

        if(fid==0){
            fid=f();
        }
        if(fw==0){
            fw=setInterval(move,80);
        }
        if(bw==0){
            bw=setInterval(back,80);
        }
        if(sw==0){
            sw=setInterval(score,1000);
        }
    }
    img.src="Jump ("+j+").png"
}


function score(){
    u=u+5
    document.getElementById("score").innerHTML=u;
}


function dead(){
    d=d+1;
    if(d==11){
        d=10;
        img.style.marginTop="390px";
        document.getElementById("end").style.visibility="visible";
        document.getElementById("endscore").innerHTML=u;
    }
    img.src="Dead ("+d+").png";
}


function re(){
    location.reload();
}
