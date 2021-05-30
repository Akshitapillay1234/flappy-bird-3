
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var bg,bgImage;
var fg,fgImage;
var bird,birdImage 
var pipe1,pipeNorthImage;
var pipe2,pipeSouthImage;
var pipe1Group, pipe2Group;
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart, restartImage;



function preload()
{
	bgImage=loadImage("bg.png.png");
	fgImage=loadImage("fg.png.png")
	birdImage=loadImage("bird.png.png")
	pipeNorthImage=loadImage("pipeNorth.png");
    pipeSouthImage=loadImage("pipeSouth.png");
	restartImage=loadImage("restart.png");
	
}

    function setup() {
	createCanvas(300 ,500);


	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
	 bg= createSprite(144,256,10,10)
	 bg.addImage(bgImage)

     fg= createSprite(144,470,20,20)
	 fg.addImage(fgImage)

	 bird= createSprite(25,256,20,20)
	 bird.addImage(birdImage)
	 bird.scale=0.2
	  
	pipe1Group = new Group();
    pipe2Group = new Group();

	score=0;

	restart = createSprite(144,256,10,10);
    restart.addImage(restartImage);
    restart.visible=false;
    restart.scale = 0.4;

	
	

	Engine.run(engine);
  
}


 function draw() {
	rectMode(CENTER);
    background(0,151,157);

	if(gameState===PLAY){
		
		
		fg.velocityX=-1;

		if(fg.x<137){
		fg.x=fg.width/2;
	
		}
	
		if(keyDown("space")){
		bird.y=bird.y-12
		}
		else{
		bird.velocityY=4;
	   }
		
	   pipe_move();
	   if(frameCount % 75 === 0){
		score++;
	}
		
			
			
	
	//game end
	if (bird.isTouching(pipe1Group) || bird.isTouching(pipe2Group)){
		gameState = END;
	  }
	  if(bird.isTouching(fg)){
		gameState = END;
	  }
	  
	}
     
	else if(gameState === END)  {
		fg.velocityX = 0;
		bird.visible = false;
		bird.x=25;
		bird.y=256;
		pipe1Group.setVelocityXEach(0);
		pipe2Group.setVelocityXEach(0);
		pipe1Group.setLifetimeEach(-1);
		pipe2Group.setLifetimeEach(-1);
		restart.visible=true;
		
		}    
        if(mousePressedOver(restart)){
			reset();
		  }

     drawSprites();
	
	 textSize(30);
    text("Score:" + score,175,500);
    }

     function pipe_move(){
	if (frameCount % 75 === 0 ){
	  pipe1 = createSprite(144,0,10,100);
	  pipe1.addImage(pipeNorthImage);
	  pipe1.scale=0.25;

	  pipe1.y = random(0,50);
	  pipe1.velocityX = -2;
	  pipe1Group.add(pipe1);
	  pipe1Group.setLifetimeEach(144);
	 
	  pipe2 = createSprite(144,512,10,100);
	  pipe2.addImage(pipeSouthImage);
	  pipe2.scale=0.5;
	  pipe2.y = random(462,512);
	  pipe2.velocityX = -2;
	  pipe2Group.add(pipe2);
	  pipe2Group.setLifetimeEach(144);
	
	}
	
	}
	function reset(){
		gameState = PLAY;
		pipe1Group.destroyEach();
		pipe2Group.destroyEach();
		score = 0;
		bird.visible=true;
		restart.visible=false
	  }
 




