[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/m3rrFl41)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19255265&assignment_repo_type=AssignmentRepo)

# MDDN 242 2025 Assignment 2

# Letterforms Project

This project explores the creation of a set of unique letterforms with a common logical model, parametrically defined to create a cohesive typeface system.

## Overview

This project creates a set of 37 letterforms (A-Z, 0-9, and default) using a parameter-based drawing system. Each character is defined using a common logical framework with 12-20 parameters, allowing for consistent style across the entire alphabet while maintaining uniqueness for each character.

## Project Structure

The project consists of several key files:
- `letters.js` - Parameter definitions for each character
- `draw_letters.js` - Drawing functions that render letterforms based on parameters
- `sketch.html` - Displays the entire alphabet on a single canvas
- `alphabet.html` - Shows individual characters for review
- `interaction.html` - Demonstrates interpolation between letterforms
- `exhibition.html` - Animates word transitions

## Part 1: Initial Design Approach

I began by designing the letters A, B, and C to establish the foundational parameters for the entire system. My goal was to create a consistent but expressive visual language with minimal parameters.

### Parameter System

I identified the following core parameters for my letterforms:
- `width` - Overall width of the letterform
- `height` - Overall height of the letterform
- `strokeWeight` - Thickness of lines
- `roundness` - Corner rounding factor
- `xOffset` - Horizontal positioning adjustment
- `yOffset` - Vertical positioning adjustment
- [Additional parameters specific to my design]

Sample parameter implementation for the letter 'A':

```javascript
letterA = {
  width: 60,
  height: 100,
  strokeWeight: 8,
  roundness: 0.3,
  xOffset: 0,
  yOffset: 0,
  // Additional parameters specific to my design
}
```

### Design Principles

My approach focused on [describe your unique design approach and style choices]. I experimented with [describe your experimental process], ultimately settling on a system that balances [describe your design priorities].

## Part 2: Full Alphabet Implementation

After establishing the core parameters with the initial letters, I extended the system to cover the entire alphabet, digits, and a default character for missing glyphs.

### Parameter Consistency

I maintained coherence across characters by [describe your approach to parameter consistency]. Each character inherits the shared parameters while introducing specific adjustments where needed.

Example of parameter definition in `letters.js`:

```javascript
const alphabet = {
  'A': {
    width: 60,
    height: 100,
  },
  'B': {
    width: 55,
    height: 100,
  },
}
```

The drawing function in `draw_letters.js` interprets these parameters to render each letterform consistently:

```javascript
function drawLetter(letterData) {

  strokeWeight(letterData.strokeWeight);

  beginShape();

  endShape(CLOSE);
}
```

## Part 3: Interpolation

I implemented interpolation between letterforms to create smooth transitions from one character to another. This enables dynamic animations when typing.

### Interpolation Implementation

The interpolation function blends parameters between two letterforms based on a percentage:

```javascript
function interpolate_letter(percent, oldData, newData) {
  let result = {};
  
  for (let param in oldData) {
    if (oldData.hasOwnProperty(param)) {
      result[param] = map(percent, 0, 100, oldData[param], newData[param]);
    }
  }
  
  return result;
}
```

This function creates transitional forms that maintain the visual integrity of the letterforms while smoothly changing from one to another.

## Part 4: Exhibition

The exhibition mode showcases the letterforms through animated word transitions. I customized the display with my unique font name and sample words.

In `exhibition.html`, I set:

```javascript
var swapWords = ["FONTNAME","PICKWORD","ETC12345"];
```

Where "FONTNAME" represents the name I've given to my typeface

## Technical Challenges and Solutions

During development, I encountered several challenges:

1. **Parameterization Balance** - Finding the right balance between too many parameters (complexity) and too few (limited expressiveness). I solved this by [describe your solution].

2. **Consistent Letterform Style** - Ensuring all 37 characters maintained a cohesive style while still being distinct. My approach was [describe your approach].

3. **Interpolation Edge Cases** - Some letterforms presented challenges during interpolation. I addressed this by [describe your solution].

## Reflections

This project pushed me to think systematically about type design while maintaining creative expression. By enforcing parameter constraints, I discovered that [share insight about what you learned].

The most successful aspect of my design is [describe what worked best], while in future iterations I would improve [describe what you'd change].

## Usage Instructions

1. View the full alphabet in `sketch.html`
2. Explore individual characters in `alphabet.html`
3. Test interpolation by typing in `interaction.html`
4. Experience word animations in `exhibition.html`

***Note*** Visual images are created using Mid-Journey and edited with photoshop. 
