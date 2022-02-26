var jumpSound,checkPointSound,dieSound;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;

var obstaclesGroup;

var newImage;

var restart, restartImage;

var gameOver, gameOverImage;

var Score =0

var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var PLAY=1;
var END=0;
var gameState = PLAY;


function preload(){
  jumpSound = loadSound("jump.mp3");
  checkPointSound = loadSound("checkpoint.mp3");
  dieSound = loadSound("die.mp3");
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");               
  
restartImage = loadImage("restart.png");

gameOverImage = loadImage("gameOver.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
 
  obstacle1= loadImage("obstacle1.png");
  obstacle2= loadImage("obstacle2.png");
  obstacle3= loadImage("obstacle3.png");
  obstacle4= loadImage("obstacle4.png");
  obstacle5= loadImage("obstacle5.png");
  obstacle6= loadImage("obstacle6.png");

}

function setup() {
  createCanvas(windowWidth,windowHeight);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,185,400,10);
  invisibleGround.visible = false;
  
obstaclesGroup= new Group();
cloudsGroup= new Group();

gameOver = createSprite(300,90);
gameOver.addImage(gameOverImage);
gameOver.scale= 0.7
gameOver.visible = false;

restart = createSprite(300,120);
restart.addImage(restartImage);
restart.scale=0.5
restart.visible = false;
trex.setCollider("circle",0,0,40);
trex.debug=false


}

function draw() {
  background(180);
  
text("Score:"+Score,510,20);

  if(gameState===PLAY){
    ground.velocityX = -4;
  Score=Score +Math.round(getFrameRate()/60);
  ground.velocityX=-(4+3*Score/100);
  obstaclesGroup.setVelocityXEach-(4+3*Score/100);
  spawnClouds();
  spawnObstacle();

if(Score>0&&Score%1000===0){
checkPointSound.play();
}

  if(keyDown("space")&& trex.y >= 110) {
    
    if(trex.collide(invisibleGround)){
        trex.velocityY = -10.5;
    }
  
  }
  trex.velocityY = trex.velocityY + 0.6

  if(trex.y==165){
    jumpSound.play();  
   }

  if (ground.x < 0){
    ground.x = ground.width/2;
  
  }
 
if (obstaclesGroup.isTouching(trex)){
gameState=END;

}

}else if(gameState===END){
  
    ground.velocityX = 0;
  
    restart.visible = true;
    gameOver.visible= true;

    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);

    cloudsGroup.setLifetimeEach(-1);
    cloudsGroup.setVelocityXEach(0);
    trex.velocityY=0
    trex.changeAnimation("collided",trex_collided);

    dieSound.play();

  }
  
 
    
    
  
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  


  }

  
  trex.collide(invisibleGround);
  if(mousePressedOver(restart)){
    reset();
    console.log("empieza de nuevo")
  }



  //aparecer nubes
  drawSprites();
}

function spawnClouds() {
  //escribir aquí el código para aparecer las nubes
  if (frameCount % 60 == 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    cloud.lifetime = 205;
    
    

    //ajustar la profundidad
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;

    cloudsGroup.add(cloud);
    }
}
function spawnObstacle(){
if(frameCount%80===0){
var obstacle = createSprite(500,160,10,40);
obstacle.velocityX =-(4+3*Score/100);
var rand = Math.round(random(1,6));
switch(rand){
case 1: obstacle.addImage(obstacle1);
break;
case 2: obstacle.addImage(obstacle2);
break;
case 3: obstacle.addImage(obstacle3);
break;
case 4: obstacle.addImage(obstacle4);
break;
case 5: obstacle.addImage(obstacle5);
break;
case 6: obstacle.addImage(obstacle6);
break;
} 
obstacle.scale = 0.5;
obstacle.lifetime =300;
obstaclesGroup.add(obstacle);
}


}

function reset(){
gameState= PLAY;
gameOver.visible=false;
restart.visible=false;
obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();
trex.changeAnimation("running",trex_running);
Score=0

}





