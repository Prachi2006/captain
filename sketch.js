
var backgroundImage,captain;
var alien1,alien2,alien3,alien4;
var score=0
var life=1;
var gameState="start";

function preload(){
  backgroundImage=loadImage("IMAGES/background.jpg")
  captainImage=loadImage("IMAGES/captain.png")
  alien1Image=loadImage("IMAGES/alien1.png")
  alien2Image=loadImage("IMAGES/alien2.png")
  alien3Image=loadImage("IMAGES/alien3.png")
  alien4Image=loadImage("IMAGES/alien4.png")
  fireballImage=loadImage("IMAGES/fireball1.png")


}



function setup(){
createCanvas(windowWidth ,550);

createCaptain();

alienGroup=new Group();
fireballGroup=new Group();
}

function draw(){
background(backgroundImage);
if(gameState==="start"){
  aliens();
if(keyDown(RIGHT_ARROW)){
  captain.x=captain.x+5;
}
if(keyDown(LEFT_ARROW)){
  captain.x=captain.x-5;
}

if(keyDown("space")){
Spawnfireball();
}
for(var i=0;i<alienGroup.length;i++){
   if(alienGroup.get(i).isTouching(fireballGroup)){
      alienGroup.get(i).destroy(); 
      fireballGroup.destroyEach();
     score=score+1;
     } 
    }

    for(var i=0;i<alienGroup.length;i++){
      if(alienGroup.get(i).collide(captain)){
        alienGroup.get(i).destroy();
       
        life=life-1;
        captain.destroy();
        object=setTimeout(createCaptain,2000);
       
     }
    }

    if(life===0){
      gameState="end";
    }
    drawSprites();
    textSize(30);
    fill("white")
    textFont("Comic Sans MS");
    text("Score:"+score,200,50);
    text("Life:"+life,900,50)
  }
  else if(gameState==="end"){
    textSize(100);
    textFont("Comic Sans MS");
    fill("white")
    text("Game End!",windowWidth/2-200,275);
  }



}
function aliens(){
  if(frameCount%120===0){
    alien=createSprite(1300,360,20,20)
    alien.velocityX=-7;
    alien.debug=true;
    alien.scale=1.2;
    alien.setCollider("rectangle",0,0,150,150);
    var rant=Math.round(random(1,4));
    switch(rant){
      case 1:
        alien.addImage(alien1Image);
        break;

        case 2:
          alien.addImage(alien2Image);
          break;

          case 3:
            alien.addImage(alien3Image);
            break;

            case 4:
              alien.addImage(alien4Image);
              break;
    }
    alienGroup.add(alien);
  }
}

function Spawnfireball(){
  fireball=createSprite(200,300,20,20);
  fireball.addImage(fireballImage)
  fireball.x=captain.x+120;
  fireball.velocityX=5;
  fireball.scale=0.2;
  fireballGroup.add(fireball)

}

function createCaptain(){
captain=createSprite(100,365,20,50);
captain.addImage(captainImage);
captain.scale=0.5;
}







