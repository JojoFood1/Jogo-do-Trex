var cloudsGroup
var obstaclesGroup
var trex
var trexRun;
var trexCollided
var ground
var invisibleGround
var groundAnimation
var cloud
var cloudImage
var obstacle1, obstacle2, obstacle3
var obstacle4
var obstacle5
var obstacle6
var obstacle
var gameOverIMG, restartIMG
var score = 0;
var PLAY = 1
var END = 0
var gameState = PLAY;
var jumpSound, dieSound, checkpointSound

function preload(){
 
  trexRun = loadAnimation("trex1.png","trex3.png","trex4.png")
  trexCollided = loadImage("trex_collided.png")
  groundAnimation = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  gameOverIMG = loadImage("gameOver.png")
  restartIMG = loadImage("restart.png")

  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkpointSound = loadSound("checkpoint.mp3")
  
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
}

function setup(){
  createCanvas(600,200)
  
  //crie um sprite de trex
 
 trex = createSprite(50,190,30,80)
 trex.addAnimation("running", trexRun)
 trex.addAnimation("collide", trexCollided)
 trex.scale = 0.5
 
 ground = createSprite(200,180,400,20)
 ground.addImage(groundAnimation)
 
 gameOver = createSprite(300, 100);
 gameOver.addImage(gameOverIMG)

 restart = createSprite(300,140);
 restart.addImage(restartIMG);

 gameOver.scale = 0.5;
 restart.scale = 0.5;


 invisibleGround = createSprite(200,190,400,5)
 invisibleGround.visible = false
 
 obstaclesGroup = new Group ();
 cloudsGroup = new Group();

 trex.setCollider("circle", 0, 0, 40)

}

function draw(){
  
  background("white")
  
 text("Pontuação - " +score, 500, 20)

if(gameState === PLAY){

  trex.velocityY = trex.velocityY+0.5
  score = score + Math.round(frameCount/60)
  ground.velocityX = - (5+score / 1000)

  if(score % 100 == 0 && score > 0) {
    checkpointSound.play()
  }
  gameOver.visible = false
  restart.visible = false

  if(ground.x < 0){
    ground.x = ground.width/2
  }
 
  if(keyDown("space") && trex.y >= 150){
    trex.velocityY = -10
    jumpSound.play()
   }
  
   createClouds()

   createObstacles()
   
   
   if(obstaclesGroup.isTouching (trex)){
     gameState = END
      dieSound.play()
      trex.velocityY = -10
    jumpSound.play()
   }
  
  }

  else if(gameState === END){

    ground.velocityX = 0;
    
    trex.velocityY = 0;

    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)

    gameOver.visible = true
    restart.visible = true
    
    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)

    trex.changeAnimation("collide")

    
  }

  if(mousePressedOver(restart)) {
    reset()
  }

  function reset(){

    gameState = PLAY;
    restart.visible = false
    gameOver.visible = false
    trex.changeAnimation("running") 
    obstaclesGroup.destroyEach()
    cloudsGroup.destroyEach()
    fill("red")
    score = 0
  
  }

trex.collide(invisibleGround)



drawSprites()
}

function createClouds(){
  if(frameCount % 60 == 0){
    cloud = createSprite(600, 120, 15, 30)
    cloud.velocityX = - (4+score / 1000)
    cloud.addImage(cloudImage)
    cloud.scale = 0.5
    
    cloud.lifetime = width / cloud.velocityX
    cloud.depth = trex.depth
    trex.depth = trex.depth +2
    
    cloud.y = Math.round(random(20, 60))
    cloudsGroup.add(cloud)
  }

  }



function createObstacles(){
  if(frameCount % 60 == 0){
    obstacle = createSprite(600,165,50,20)
    obstacle.velocityX = - (5+score / 1000)
    obstacle.lifetime = width / obstacle.velocityX
    var rand = Math.round(random(1, 6))
    switch(rand){
      case 1 : obstacle.addImage(obstacle1)
      break;
      
      case 2 : obstacle.addImage(obstacle2)
      break;
      
      case 3 : obstacle.addImage(obstacle3)
      break;
      
      case 4 : obstacle.addImage(obstacle4)
      break;
      
      case 5 : obstacle.addImage(obstacle5)
      break;
     
      case 6 : obstacle.addImage(obstacle6)
      break;
      
      default : break

    }
  
  obstacle.scale = 0.5

  obstaclesGroup.add(obstacle)

  }
}

