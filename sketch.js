const canvasWidth = 960;
const canvasHeight = 500;

const letterA = {
  "size": 80,
  "offsetx": 0,
  "offsety": 35
}

const letterB = {
  "size": 150,
  "offsetx": 0,
  "offsety": -145
}

const letterC = {
  "size": 100,
  "offsetx": 30,
  "offsety": 0
}

const backgroundColor = "#d9c8a1"; // Light rustic beige
const rusticBrown = "#8B4513";     // Saddlebrown for main lines
const grungeGray = "#5C4033";      // Darker grunge shade
const strokeColor = "#3C2F2F";     // Deep brown for stroke
const roughness = 5;               // Amount of roughness to add

function setup() {
  main_canvas = createCanvas(canvasWidth, canvasHeight);
  main_canvas.parent('canvasContainer');
  stroke(strokeColor);
  strokeWeight(18);
  strokeCap(SQUARE);
  noLoop();
}

function draw() {
  clear();
  let center_x = canvasWidth / 2;
  let center_y = canvasHeight / 2;
  drawLetter(center_x - 250, center_y, letterA);
  drawLetter(center_x, center_y, letterB);
  drawLetter(center_x + 250, center_y, letterC);
}

// Draw a rough line with staggered/jagged effect
function roughLine(x1, y1, x2, y2) {
  const steps = 8;
  let prevX = x1;
  let prevY = y1;
  
  for (let i = 1; i <= steps; i++) {
    let t = i / steps;
    let nextX = x1 + (x2 - x1) * t + random(-roughness, roughness);
    let nextY = y1 + (y2 - y1) * t + random(-roughness, roughness);
    
    line(prevX, prevY, nextX, nextY);
    
    prevX = nextX;
    prevY = nextY;
  }
  
}

function drawLetter(posx, posy, letterData) {
  let size2 = letterData["size"];
  let pos2x = posx + letterData["offsetx"];
  let pos2y = posy + letterData["offsety"];
  
  // Add some random staggering to the base position
  posx += random(-3, 3);
  posy += random(-3, 3);
  
  noFill();

  if (letterData === letterA) {
    // Runic A: Two diagonal lines with a horizontal bar
    strokeWeight(25);
    stroke(rusticBrown);
    roughLine(posx - 50, posy + 50, posx, posy - 50);      // Left diagonal
    roughLine(posx + 50, posy + 50, posx, posy - 50);      // Right diagonal
    stroke(grungeGray);
    roughLine(posx - size2 / 2, pos2y, posx + size2 / 2, pos2y); // Horizontal bar
  } 
  else if (letterData === letterB) {
    // Runic B: Vertical line with two angular extensions
    strokeWeight(25);
    stroke(rusticBrown);
    roughLine(posx - 25, posy - 50, posx - 25, posy + 50); // Main vertical
    stroke(grungeGray);
    roughLine(posx - 25, posy - 25, posx + size2 / 2, posy - 25); // Top horizontal
    roughLine(posx - 25, posy + 25, posx + size2 / 2, posy + 25); // Bottom horizontal
    roughLine(posx + size2 / 2, posy - 50, posx + size2 / 2, posy - 25); // Top vertical close
    roughLine(posx + size2 / 2, posy + 25, posx + size2 / 2, posy + 50); // Bottom vertical close
  } 
  else if (letterData === letterC) {
    // Runic C: Vertical line with top and bottom extensions
    strokeWeight(25);
    stroke(rusticBrown);
    roughLine(posx, posy - 50, posx, posy + 50);          // Main vertical
    stroke(grungeGray);
    roughLine(posx, posy - 50, posx + size2 / 2, posy - 50); // Top horizontal
    roughLine(posx, posy + 50, posx + size2 / 2, posy + 50); // Bottom horizontal
  }
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  } else if (key == '@') {
    saveBlocksImages(true);
  }
}