// Variables
let x = 200;
let y = 0;
let gravity = 0.5; // Gravity effect when @space is not pressed
let wing = 0;
let velocity = 0;
let fly = -1;
let flapSpeed = 15;
let height = 600;
let groundHeight = 0;
let state = "start";
let score = "";

function setup() {
  createCanvas(600, height);
  groundHeight = height - 150;
}


function draw() {
  if (state === "start") {
    startScreen();
  } else if (state === "game") {
    gameScreen();
  } else if (state === "result") {
    resultScreen();
  }
}

function mouseClicked() {
  if (state === "start") {
    if (
      mouseX > 200 && mouseX < 200 + 200 &&
      mouseY > 100 && mouseY < 100 + 100
    ) {
      state = "game";
    }
  } else if (state === "result") {
    if (
      mouseX > 200 && mouseX < 200 + 200 &&
      mouseY > 100 && mouseY < 100 + 100
    ) {
      // Reset the game and bird position
      x = 200;
      y = 0;
      velocity = 0;
      state = "game";
    }
  }
}


function startScreen() {
  background(20, 140, 250);
  scenery();
  text("CLICK TO START", 250,150);
  stroke(0);
  strokeWeight(1);
  fill(100,300,100);
  rect(200,100,200,100);
  fill(0,0,0);
  noStroke();
  text("CLICK TO START", 250,150);
  
}


// Game Screen
function gameScreen() {
  // Clear the background
  background(20, 140, 250);
  fill (0,0,0);
  move(); // Update position and wing movement
  Bird(x, y); // Draw the bird at updated position

  // Check velocity when landing
  if (y >= groundHeight) {
    if (velocity > 5) {
      score = "LOSE, bird crashed";
    } else {
      score = "WIN, bird landed";
    }
    state = "result";
  }
  scenery();
  Nest();


}

// Result Screen
function resultScreen() {
  background(20, 140, 250);
  scenery();
  stroke(0);
  strokeWeight(1);
  fill(100, 300, 100);
  rect(200, 100, 200, 100);
  noStroke();
  fill(100,0,0);
  text(score, 250, 135);
  text("RESTART", 270, 155);
}

// Move up/down with gravity effect
// Movement logic
function move() {
  // 'SPACE' key
  if (keyIsDown(32)) {
    velocity += fly;
  }

gravity +=0.00005;

  velocity += gravity;
  y += velocity;

  // Prevent the bird to fall through the ground
  if (y > groundHeight) {
    y = groundHeight;
  }

  velocity = constrain(velocity, -10, 20);

  // Wings moving
  wing = sin(frameCount * flapSpeed) * 7;
}

// Bird function
function Bird(x, y) {
  wings(x, y);
  mainBody(x, y);
}

  // Wings
function wings(x, y) {
  noStroke();
  fill(255, 255, 255);
  ellipse(x + 70, y + 80 + wing, 150 * 0.3, 75 * 0.3);  // Left wing
  ellipse(x + 130, y + 80 - wing, 150 * 0.3, 75 * 0.3); // Right wing
  ellipse(x + 70, y + 75 + wing, 200 * 0.3, 75 * 0.3);  // Left big wing
  ellipse(x + 130, y + 75 - wing, 200 * 0.3, 75 * 0.3); // Right big wing
}


  // Main body
function mainBody(x, y) {

  // Feet
  fill(0, 0, 0);
  rect(x + 290 * 0.3, y + 390 * 0.3, 10 * 0.3, 30 * 0.3);
  rect(x + 360 * 0.3, y + 390 * 0.3, 10 * 0.3, 30 * 0.3);
  rect(x + 360 * 0.3, y + 420 * 0.3, 20 * 0.3, 10 * 0.3);
  rect(x + 280 * 0.3, y + 420 * 0.3, 20 * 0.3, 10 * 0.3);

  // Penguin belly
  noStroke();
  push();
  fill(255, 255, 255);
  ellipse(x + 100, y + 90, 180 * 0.3, 200 * 0.3);
  pop();

  // Belly ring
  fill(0, 0, 0);
  ellipse(x + 100, y + 90, 110 * 0.3, 150 * 0.3);

  // Head
  fill(120, 80, 20);
  ellipse(x + 100, y + 50, 130 * 0.3, 130 * 0.3);

  // Eyes
  fill(0, 0, 0);
  ellipse(x + 360 * 0.3, y + 145 * 0.3, 30 * 0.3, 30 * 0.3);
  ellipse(x + 305 * 0.3, y + 145 * 0.3, 30 * 0.3, 30 * 0.3);

  // Eye pupils
  fill(255, 255, 255);
  ellipse(x + 360 * 0.3, y + 46, 3, 3);
  ellipse(x + 305 * 0.3, y + 46, 3, 3);

  // Nose
  fill(200, 100, 0);
  triangle(x + 95, y + 50, x + 105, y + 50, x + 100, y + 58);

}

//Clouds
function scenery() {
  noStroke();
  fill (255,255,255);

  // Cloud 1
  ellipse (100,150,150,70);
  ellipse (100,120,150,70);
  ellipse (120,140,150,70);
  ellipse (30,140,150,70);
  ellipse (100,150,150,70);
  ellipse (100,120,150,70);
  ellipse (120,140,150,70);
  ellipse (30,140,150,70);

  // Cloud 2
  ellipse (500,130,150,70);
  ellipse (500,100,150,70);
  ellipse (520,120,150,70);
  ellipse (430,120,150,70);
  ellipse (500,130,150,70);
  ellipse (500,100,150,70);
  ellipse (520,120,150,70);
  ellipse (430,120,150,70);
}

//Birds Nest
function Nest() {
  fill (0,100,0);
  ellipse (300, 610, 800,60);
  fill (80, 55,0);
  ellipse (300,590,150,40);
  fill(250,250,250);
  ellipse (270, 570,30,40);
  ellipse (300, 570,30,40);
  ellipse (330, 570,30,40);

  }
