function rng(){
  return (Math.random() * 100).toFixed(2);
}

async function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function pxToVw(pxValue) {
    const vwValue = (Number(pxValue) / document.documentElement.clientWidth) * 100;
    return vwValue;
}

function pxToVh(pxValue) {
    const vhValue = (Number(pxValue) / document.documentElement.clientHeight) * 100;
    return vhValue;
}

function near(a,b,range){
    if (Math.abs(a-b) < range){
        return true;
    }else{
        return false;
    }
}

function check(x,y){
    x = Number(x.slice(0,-2));
    y = Number(y.slice(0,-2));
    var coord = [];
    for (var item of $(".circle")){
        coord.push([pxToVw($(item).css("left").slice(0,-2)),pxToVh($(item).css("top").slice(0,-2))]);
    }
    for (var pair of coord){
        if (near(pair[0],x,10)){
            return true
        }
        if (near(pair[1],y,10)){
            return true
        }
    }
    return false;
}

async function spawn(){
    var x = rng()+"vw";
    var y = rng()+"vh";
    var timing = 1000 + (500*Math.random());
    while (check(x,y)){
        x = rng()+"vw";
        y = rng()+"vh";
    }
    
    var size = Number(5 + (5*Math.random()));

    var element = $("<div class='circle'></div>");
    element.css("top",y);
    element.css("left",x);
    element.css("border-radius",(size/2)+"vw");
    if (Math.random() > 0.5){
        element.css("background-color","red");
    }else{
        element.css("background-color","blue");
    }
    $("#droplet-container").append(element);
    element.animate({ width: size+"vw", height: size+"vw", "top": `-=${size/2}vw`, "left": `-=${size/2}vw`}, timing);

    await sleep(500);
    var air = $("<div class='cover'></div>");
    air.css("top",y);
    air.css("left",x);
    air.css("border-radius",(size/2)+"vw");
    $("#droplet-container").append(air);
    air.animate({ width: (size+1)+"vw", height: (size+1)+"vw", "top": `-=${(size+1)/2}vw`, "left": `-=${(size+1)/2}vw`}, timing);

    await sleep(timing);
    element.remove();
    air.remove();
}

async function startSpawn(){
    while (true){
        await sleep(250 + (250*Math.random()));
        spawn();
    }
}

async function start(){
    var head = $("#head");
    var tail = $(".tail");
    var side = $("#side");

    head.css("opacity","1");
    side.css("opacity","1");
    tail.css("opacity","1");
    tail.css("left","0");

    startSpawn();
    while (true){
        await sleep(1000)
        side.css("transform","rotate(5deg)");
        await sleep(1000)
        side.css("transform","rotate(-5deg)");
    }
}