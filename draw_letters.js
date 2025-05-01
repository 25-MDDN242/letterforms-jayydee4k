/* these are optional special variables which will change the system */
var systemBackgroundColor = "#e5d6b7"; // Lighter parchment color
var systemLineColor = "#3C2F2F"; // Deep brown
var systemBoxColor = "#8B4513"; // Saddlebrown

/* internal constants */
const rusticBrown = "#4D94FF"; // Lighter bright blue (was #0066FF)
const grungeGray = "#66B2FF"; // Even lighter blue for contrast (was #003399)
const roughness = 2; // Adjusted for 100x200 bounding box

// Function to convert numbers to Roman numerals
function toRoman(num) {
  if (isNaN(num) || num < 1 || num > 3999) return "N/A";
  
  // Special case for simple 1-9 numerals to ensure they work correctly
  const simpleRomans = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
  if (num >= 1 && num <= 9) {
    return simpleRomans[num-1];
  }
  
  const romanNumerals = [
    { value: 1000, numeral: "M" },
    { value: 900, numeral: "CM" },
    { value: 500, numeral: "D" },
    { value: 400, numeral: "CD" },
    { value: 100, numeral: "C" },
    { value: 90, numeral: "XC" },
    { value: 50, numeral: "L" },
    { value: 40, numeral: "XL" },
    { value: 10, numeral: "X" },
    { value: 9, numeral: "IX" },
    { value: 5, numeral: "V" },
    { value: 4, numeral: "IV" },
    { value: 1, numeral: "I" }
  ];
  
  let result = "";
  for (const romanNumeral of romanNumerals) {
    while (num >= romanNumeral.value) {
      result += romanNumeral.numeral;
      num -= romanNumeral.value;
    }
  }
  
  return result;
}

// Convert numeric swapWords to Roman numeral versions
var swapWords = [
  "RVNICXII",
  "ANCIENT!",
  "MYSTICAL"
];

// Current text display variables
var currentTextDisplayed = "RVNIC";
var textChangeSpeed = 3000; // milliseconds between text changes
var lastTextChangeTime = 0;
var textIndex = 0;

// Particle system for smoke effects
let particles = [];
class SmokeParticle {
  constructor(x, y, color) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-0.3, 0.3), random(-0.6, -0.1));
    this.acc = createVector(0, 0);
    this.color = color;
    this.alpha = 150; // Reduced from 200
    this.size = random(2, 5); // Smaller particles (was 3-8)
    this.life = random(15, 30); // Shorter lifespan (was 20-50)
  }
  
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.alpha -= this.alpha / this.life;
    this.size += 0.03; // Slower growth
    this.life--;
  }
  
  display() {
    noStroke();
    fill(red(this.color), green(this.color), blue(this.color), this.alpha);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
  
  isDead() {
    return this.life <= 0;
  }
}

// Add particles along a line
function addSmokeParticles(x1, y1, x2, y2, color) {
  const particleCount = 5; // Reduced from 10
  for (let i = 0; i < particleCount; i++) {
    let t = random(0, 1);
    let x = lerp(x1, x2, t);
    let y = lerp(y1, y2, t);
    // Add less randomness to position
    x += random(-3, 3);
    y += random(-3, 3);
    particles.push(new SmokeParticle(x, y, color));
  }
}

// Update and display all particles
function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }
}

/* Function to change the displayed text dynamically */
function changeDisplayText() {
  let currentTime = millis();
  if (currentTime - lastTextChangeTime > textChangeSpeed) {
    textIndex = (textIndex + 1) % swapWords.length;
    currentTextDisplayed = swapWords[textIndex];
    lastTextChangeTime = currentTime;
    return true; // text was changed
  }
  return false; // no change
}

/* Function to set display text manually */
function setDisplayText(newText) {
  if (typeof newText === "string" && newText.length > 0) {
    currentTextDisplayed = newText.toUpperCase();
    return true;
  }
  return false;
}

/* Improved line drawing with animation effect */
function roughLine(x1, y1, x2, y2, animProgress = 1.0) {
  const steps = 3; // More segments for smoother lines
  let prevX = x1;
  let prevY = y1;
  
  // If we're animating a build, only draw part of the line
  const drawSteps = animProgress < 1.0 ? Math.ceil(steps * animProgress) : steps;
  
  for (let i = 1; i <= drawSteps; i++) {
    let t = i / steps;
    // Add subtle curve to the line for more organic look
    let curveOffset = sin(t * PI) * roughness * 0.8;
    let nextX = x1 + (x2 - x1) * t + random(-roughness, roughness) + curveOffset;
    let nextY = y1 + (y2 - y1) * t + random(-roughness, roughness);
    
    line(prevX, prevY, nextX, nextY);
    
    prevX = nextX;
    prevY = nextY;
  }
}

/*
 * Draw the letter given the letterData
 * Letters are drawn within a bounding box from (0,0) to (100,200)
 */
function drawLetter(letterData) {
  push();
  
  // Ensure letterData exists and is an object
  if (!letterData || typeof letterData !== 'object') {
    console.warn("Invalid letterData provided to drawLetter:", letterData);
    pop();
    return;
  }

  // Stroke setup for runic style
  strokeWeight(10); // Adjusted from 18 for smaller box
  strokeCap(SQUARE);
  noFill();
  
  // Handle scaling for interpolation
  let scale_factor = letterData["draw_scale"] || 1;
  let cx = 50; // Center of the 100x200 box
  let cy = 100;
  
  // Set default colors for editor mode if these are simple line coordinates
  let isEditorMode = false;
  if (letterData.line1_x1 !== undefined && letterData.line1_color === undefined) {
    isEditorMode = true;
    letterData.line1_color = rusticBrown;
    letterData.line2_color = grungeGray;
  }
  
  // Draw up to 8 line segments
  for (let i = 1; i <= 8; i++) {
    // Get color or use default colors if not specified
    let color = letterData[`line${i}_color`];
    if (!color && letterData[`line${i}_x1`] !== undefined) {
      // If we have coordinates but no color, use default colors
      color = (i % 2 === 0) ? grungeGray : rusticBrown;
    }
    
    if (color) {
      // Apply glow effect
      drawingContext.shadowBlur = 15;
      drawingContext.shadowColor = color;
      
      stroke(color);
      let x1 = cx + (letterData[`line${i}_x1`] - cx) * scale_factor;
      let y1 = cy + (letterData[`line${i}_y1`] - cy) * scale_factor;
      let x2 = cx + (letterData[`line${i}_x2`] - cx) * scale_factor;
      let y2 = cy + (letterData[`line${i}_y2`] - cy) * scale_factor;
      
      // Get animation progress if available (for line-by-line build)
      let animProgress = letterData[`line${i}_anim`] !== undefined ? 
                         letterData[`line${i}_anim`] : 1.0;
      
      // Check if all coordinates are defined
      if (x1 !== undefined && y1 !== undefined && x2 !== undefined && y2 !== undefined) {
        roughLine(x1, y1, x2, y2, animProgress);
      }
      
      // Reset shadow after drawing each line
      drawingContext.shadowBlur = 0;
    }
  }
  
  // Update and draw particles after drawing the letter
  updateParticles();
  
  pop();
} 

/*
 * Interpolate between two letters for smooth transitions
 * Now builds/unbuilds the letter line by line instead of fading
 */
let previousVisibleLines = Array(8).fill(false);
let lineAnimationProgress = Array(8).fill(1.0);

function interpolate_letter(percent, oldObj, newObj) {
  let new_letter = {};
  
  // Count how many lines are in each letter
  let oldLineCount = 0;
  let newLineCount = 0;
  
  for (let i = 1; i <= 8; i++) {
    if (oldObj[`line${i}_color`]) {
      oldLineCount++;
    }
    if (newObj[`line${i}_color`]) {
      newLineCount++;
    }
  }
  
  // Set full scale for the entire animation
  new_letter["draw_scale"] = 1;
  
  // Initialize previousVisibleLines if needed
  if (!previousVisibleLines.length) {
    previousVisibleLines = Array(8).fill(false);
  }
  
  if (percent < 30) {
    // Phase 1: Unbuild the old letter line by line (in reverse) - faster (30% of animation)
    const remainingLines = Math.ceil(map(percent, 0, 30, oldLineCount, 0));
    
    let currentLine = 0;
    for (let i = 1; i <= 8; i++) {
      if (oldObj[`line${i}_color`]) {
        currentLine++;
        if (currentLine <= remainingLines) {
          // Calculate line-specific animation progress (shrinking effect)
          let linePercent = map(percent, 
                             max(0, 30 - (30/oldLineCount) * (oldLineCount - currentLine + 1)), 
                             30 - (30/oldLineCount) * (oldLineCount - currentLine), 
                             1, 0);
          linePercent = constrain(linePercent, 0, 1);
          
          // This line is still visible but may be shrinking
          new_letter[`line${i}_x1`] = oldObj[`line${i}_x1`] || 0;
          new_letter[`line${i}_y1`] = oldObj[`line${i}_y1`] || 0;
          new_letter[`line${i}_x2`] = oldObj[`line${i}_x2`] || 0;
          new_letter[`line${i}_y2`] = oldObj[`line${i}_y2`] || 0;
          new_letter[`line${i}_color`] = oldObj[`line${i}_color`] || null;
          new_letter[`line${i}_anim`] = linePercent;
          
          // Add particles at the end of disappearing lines
          if (linePercent < 0.95 && previousVisibleLines[i-1] && linePercent > 0.05) {
            let x1 = oldObj[`line${i}_x1`] || 0;
            let y1 = oldObj[`line${i}_y1`] || 0;
            let x2 = oldObj[`line${i}_x2`] || 0;
            let y2 = oldObj[`line${i}_y2`] || 0;
            let color = oldObj[`line${i}_color`] || grungeGray;
            
            // Only add particles at the currently disappearing endpoint
            let t = 1.0 - linePercent; 
            let particleX = lerp(x1, x2, t);
            let particleY = lerp(y1, y2, t);
            addSmokeParticles(particleX, particleY, particleX, particleY, color);
          }
        } else {
          // This line has disappeared - create smoke particles
          if (previousVisibleLines[i-1]) {
            let x1 = oldObj[`line${i}_x1`] || 0;
            let y1 = oldObj[`line${i}_y1`] || 0;
            let x2 = oldObj[`line${i}_x2`] || 0;
            let y2 = oldObj[`line${i}_y2`] || 0;
            let color = oldObj[`line${i}_color`] || grungeGray;
            addSmokeParticles(x1, y1, x2, y2, color);
            previousVisibleLines[i-1] = false;
          }
          // This line has disappeared
          new_letter[`line${i}_color`] = null;
        }
      }
    }
  } else {
    // Phase 2: Build the new letter line by line - slower (70% of animation)
    const visibleLines = Math.floor(map(percent, 30, 100, 0, newLineCount + 0.99));
    
    let currentLine = 0;
    let newVisibleLines = Array(8).fill(false);
    
    for (let i = 1; i <= 8; i++) {
      if (newObj[`line${i}_color`]) {
        currentLine++;
        if (currentLine <= visibleLines) {
          // Calculate line-specific animation progress (growing effect)
          let linePercent = map(percent, 
                             30 + (70/newLineCount) * (currentLine - 1), 
                             min(100, 30 + (70/newLineCount) * currentLine), 
                             0, 1);
          linePercent = constrain(linePercent, 0, 1);
          
          // This line should be visible and growing
          new_letter[`line${i}_x1`] = newObj[`line${i}_x1`] || 0;
          new_letter[`line${i}_y1`] = newObj[`line${i}_y1`] || 0;
          new_letter[`line${i}_x2`] = newObj[`line${i}_x2`] || 0;
          new_letter[`line${i}_y2`] = newObj[`line${i}_y2`] || 0;
          new_letter[`line${i}_color`] = newObj[`line${i}_color`] || null;
          new_letter[`line${i}_anim`] = linePercent;
          
          // Add particles at the end of growing lines
          if (linePercent > 0.05 && linePercent < 0.95) {
            let x1 = newObj[`line${i}_x1`] || 0;
            let y1 = newObj[`line${i}_y1`] || 0;
            let x2 = newObj[`line${i}_x2`] || 0;
            let y2 = newObj[`line${i}_y2`] || 0;
            let color = newObj[`line${i}_color`] || rusticBrown;
            
            // Only add particles at the currently growing endpoint
            let t = linePercent;
            let particleX = lerp(x1, x2, t);
            let particleY = lerp(y1, y2, t);
            addSmokeParticles(particleX, particleY, particleX, particleY, color);
          }
          
          newVisibleLines[i-1] = true;
        } else {
          // This line should not yet be visible
          new_letter[`line${i}_color`] = null;
          newVisibleLines[i-1] = false;
        }
      }
    }
    
    previousVisibleLines = newVisibleLines;
  }
  
  return new_letter;
}