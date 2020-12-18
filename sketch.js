var PLAY = 1;
var END = 0;
var gameState = PLAY;


var trex, trex_running, trex_collided,trexImg;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;
var gameOverImg, restartImg;
var block2,block3,block4,block5,block6
var background,backgroundImg;


localStorage["HighestScore"] = 0;

function preload(){

  gameOverImg = loadImage("gameOver.jpeg")
  restartImg = loadImage("restart.png")
  trexImg = loadImage("runner.png")
 
 
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,170,20,20);
  trex.shapeColor = "red"
  trex.addImage(trexImg)
  trex.scale = 0.12;
  
  ground = createSprite(200,175,1200,7);
  
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  

  
  restart = createSprite(300,140);

  
  
  gameOver.scale = 0.5;
  restart.scale = 0.05;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,175,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background("blue");
  fill("red")
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && trex.y >= 159) {
      trex.velocityY = -11;
    }
  
    trex.velocityY = trex.velocityY + 0.7
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }


    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
        
    }


    if (trex.isTouching(cloudsGroup)) {
      gameState = END;
    }
  }



  
   if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    gameOver.addImage("gameOver123",gameOverImg)
    restart.addImage("restart123",restartImg)
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
   
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  } 

  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(50,100));
    cloud.scale = 0.5;
    cloud.velocityX = -2
    cloud.shapeColor = "red"
    
     //assign lifetime to the variable
    cloud.lifetime = 300;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,17,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    obstacle.shapeColor = "orange"
    
 
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}