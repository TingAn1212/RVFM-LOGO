async function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function spawn(){

}

async function start(){
    var dropletContainer = $("#droplet-container");
    var head = $("#head");
    var tail = $(".tail");
    var side = $("#side");

    head.css("opacity","1");
    side.css("opacity","1");
    tail.css("opacity","1");
    tail.css("left","0");

    while (true){
        await sleep(1000)
        side.css("transform","rotate(5deg)");
        await sleep(1000)
        side.css("transform","rotate(-5deg)");
    }
}