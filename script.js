var WIDTH = 640;
var HEIGHT = 400;


function preload() {
  bkgImg = loadImage('assets/pony.jpg');
  endImg = loadImage('assets/gameover.jpg');
}

function initTopLine() {
  fill(88, 81, 100); //limegreen
  rect(0, 0, WIDTH, 3);
}

function initBottomLine() {
  fill(88, 81, 100); //limegreen
  rect(0, HEIGHT - 3, WIDTH, 3);
}

function setup() {
  fr = 240;
  frameRate(fr);
  createCanvas(WIDTH, HEIGHT);
  angleMode(DEGREES);
  colorMode(HSB);
  rx = 0;
  direction = 'right';
  incr = 10;
  finish = 'down';
  score = 0;
  speed = .2;
  clear();
  background(0);

  initTopLine();
  // initBottomLine();
}

function draw() {
  image(bkgImg, 0, 3);
  fill(0, 100, 100);
  noStroke();
  
  // test directions
  if(direction == 'right') {
    rx += incr;
    if(rx >= WIDTH) {
      direction = 'left';
    } 
  } else {
    rx -= incr;
    if(rx < 0) {
      direction = 'right';
    }
  }

  // draw running square
  fill(0, 0, 100); //white
  rect(rx, ~~(HEIGHT / 2), 13, 13); //draw a quare
  
  // draw mouse cursor
  cursor('assets/cursor.png', 4, 4);

  // tests:
  // text(mouseX, 10, 30);
  // text(mouseY, 10, 90);

  // collision
  if((mouseX == rx || (mouseX >= rx + 10 && mouseX <= rx + 20)) && (mouseY >= (~~(HEIGHT / 2) - 24) && mouseY <= (~~(HEIGHT / 2) + 34))) {
    alert("You Crashed! >:\nbad luck I'm crying for you\nThis is Game Over :c");

    // if touched show gameover pic & end
    clear();
    image(endImg, 0, 0);
    noloop();
  }

  // add score if up || down
  if((mouseY >= -34 && mouseY <= 30 && finish == 'up') && (mouseX > 27 && mouseX < WIDTH + 17)) {
    score++;
    incr += speed; //speed up
    fill(88, 81, 100); //limegreen
    rect(0, HEIGHT - 3, WIDTH, 3);
    fill(0,0,0); //black
    rect(0, 0, WIDTH, 3);
    finish = 'down';
  } else if((mouseY <= HEIGHT + 77 && mouseY >= HEIGHT + 13 && finish == 'down') && (mouseX > 27 && mouseX < WIDTH + 17)) {
      score++;
      incr += speed; //speed up
      fill(88, 81, 100); //limegreen
      rect(0, 0, WIDTH, 3);
      fill(0,0,0); //black
      rect(0, HEIGHT - 3, WIDTH, 3);
      finish = 'up';
  }

  // test for overriding playfield area
  if((mouseX >= WIDTH || mouseX <= 0) && (mouseY <= 240)) {
    if(finish == 'up') {
      finish = 'down';
    }
  } else if((mouseX >= WIDTH || mouseX <= 0) && (mouseY >= 240)) {
    if(finish == 'down') {
      finish = 'up';
    }
  }

  textSize(50);
  fill('white');
  text(score, 10, 50); 
}