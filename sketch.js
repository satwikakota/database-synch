var ball;
var database,position;
function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    database=firebase.database();
    var ballPositionLocation=database.ref("ball/position");
    ballPositionLocation.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        updatePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        updatePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        updatePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        updatePosition(0,+1);
    }
    drawSprites();
}

function updatePosition(x,y){
    database.ref("ball/position").set({
        x:position.x+x,
        y:position.y+y
    })
}

function readPosition(data){
    position=data.val()
    ball.x=position.x;
    ball.y=position.y;
}
function showError(){
    alert("There is a Trouble in Connecting to the Database");
}