[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/m3rrFl41)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19255265&assignment_repo_type=AssignmentRepo)




# MDDN 242 2025 Assignment 2

## **Part One** *Initial Ideas*

## *IDEA ONE*

I created a dynamic recreation of the ABC News logo. Each letter in the logo ("a", "b", "c") is composed of two circles, creating a minimalist geometric design. The logo is fully customizable through adjustable parameters, allowing precise control over the visual structure of the letters.


*Parameters per Letter*
Every letter in "abc" is constructed using two circles:

  1. Base Circle: Fixed in size and position.

  2. Secondary Circle: Adjustable via the following parameters:

    - `size:` Radius of the secondary circle.

    - `offsetx:` Horizontal offset relative to the base circle.

    - `offsety:` Vertical offset relative to the base circle.

These parameters allow fine-tuning of the logo's visual balance and proportions.

*Customization*
Modify the following constants in sketch.js to adjust the logo:

  - logoSize: Base diameter of the logo's black background circle.

  - `backgroundColor`, `logoColor`, `letterColor`: Color scheme variables.

  - Adjust `size`, `offsetX`, and `offsetY` values to reconfigure letter geometry.

*Example Configuration*
Example parameters for secondary circles:

```javascript
const letterParams = {
  a: { size: 30, offsetx: -20, offsety: 10 },
  b: { size: 25, offsetx: 15, offsety: -5 },
  c: { size: 28, offsetx: 0, offsety: 15 }
}
```
![Preview Initial View](preview-1.jpg)

## *IDEA TWO*




## **Part Two** *Design the Alphabet*

For my initial dynamic design 