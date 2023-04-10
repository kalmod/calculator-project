# calculator-project
This is the Calculator Project from the Odin Project. 
  [The Odin Project | Project: Calculator](https://www.theodinproject.com/lessons/foundations-calculator)


#### Objectives

1. Configure CSS for the Calculator.
  - Create Calculator Body
  - Create Calculator Screen
    - May need to use z-index on Screen if I try to establish depth.
    - Set Font for Screen.
    - Character limit??
    - Added a screen for history. Maybe look into adjusting the font size based on length for both? [Possible Reference](https://gabriellazcano.com/blog/how-to-auto-adjust-font-size-to-fit-div/)
  - Create Calculator Buttons
    - Buttons should animate on click.
    - Numbers, Operations, Equals/Enter, Clear
    - Generate buttons automatically with JS.
      - translation distnace is based off of half of height & width. Must grab both using js and apply.
      - Had to set top of button to a top 0 so it animates correctly.
      - width of left & right = height of container
      - width of front & back = width of container

2. Configure CSS Behavior.
  - Create the following functions:
    - add
    - subtract
    - multiply
    - divide
  - Create `operate` function to handle using numbers and calling the appropriate function.
  - Create function to populate the display.
    - Behavior:
    - Pressing multiple operands in a row only changes it, doesn't add multiple
    - Calling an operand doesn't erase the previous entered number. Remains until a user inputs a new one.
      If they press enter without using a new number, uses what ever is currently displayed.
  - Decimal numbers.
  - Add button to control position of calculator.