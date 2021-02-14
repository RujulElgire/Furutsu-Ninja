//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;
var score;
var knife, apple;
var knifeImage;
var appleGroup;
var flag;

function preload() {
  knifeSound = loadSound("knifeSwoosh.mp3")
  gameOverSound = loadSound("gameover.mp3")
  knifeImage = loadImage("knife-1.png");
  fruit1Img = loadImage("fruit1.png")
  fruit2Img = loadImage("fruit2.png")
  fruit3Img = loadImage("fruit3.png")
  fruit4Img = loadImage("fruit4.png")
  alienImg = loadAnimation("alien1.png", "alien2.png")
  alien2Img = loadImage("alien2.png")
  gameOver1 = loadImage("gameover.png")
}



function setup() {
  createCanvas(400, 500);

  //creating sword
  knife = createSprite(40, 200, 20, 20);
  knife.addImage(knifeImage);
  knife.scale = 0.5;

  appleGroup = createGroup();
  alienGroup = createGroup();
  flag = Math.round(random(1, 4));

  //set collider for sword
  knife.setCollider("rectangle", 0, 0, 40, 40);

  gameOver = createSprite(200,250,50,50);
    gameOver.addImage(gameOver1)
  
  score = 0;
  score.scale = 0.1;
  //create fruit and monster Group variable here
}

function draw() {
  background("lightBlue");

  if (gameState === PLAY) {
    
    //calling fruit and monster function
    gameOver.visible = false
    // Move knife with mouse
    knife.y = World.mouseY;
    knife.x = World.mouseX;

    // Increase score if knife touching fruit

    // Go to end state if knife touching enemy

  }

  createfruit1();
  createMonstors();
  if (knife.isTouching(appleGroup)) {
    score = score + 1;
    appleGroup.destroyEach();
    knifeSound.play()
  }
  if (knife.isTouching(alienGroup)) {
    gameState = END;
    gameOverSound.play()
  }
  if (gameState == END) {
    appleGroup.destroyEach()
    alienGroup.destroyEach()
    gameOver.visible = true;
    text("press 'R' to restart",150,300)
  }
  if(keyDown("r")) {
    gameState = PLAY
    score = 0;
  }
  drawSprites();

  //Display score
  textSize(25);
  text("Score : " + score, 250, 50);
}

function createfruit1() {

  if (frameCount % 80 == 0) {
    apple = createSprite(-1, random(50, 350), 10, 10);
    appleGroup.add(apple);
    apple.lifetime = 100
    apple.scale = 0.1
    apple.velocityX = 5;
    if (flag == 1) {
      apple.addImage(fruit1Img)
    }
    if (flag == 2) {
      apple.addImage(fruit2Img)
    }
    if (flag == 3) {
      apple.addImage(fruit3Img)
    }
    if (flag == 4) {
      apple.addImage(fruit4Img)
    }
  }

}

function createMonstors() {
  if (frameCount % 100 == 0) {
    monstor = createSprite(-12, random(50, 350, 10, 10))
    monstor.lifetime = 100
    alienGroup.add(monstor)
    monstor.velocityX = 5;
    monstor.addAnimation("running", alienImg)
  }
}