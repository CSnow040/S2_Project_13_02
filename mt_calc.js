"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 2

   Author: Caleb Snow
   Date:   3/14/19
   
   Filename: mt_calc.js
	
   Functions List:

   init()
      Initializes the contents of the web page and sets up the
      event handlers
      
   buttonClick(e)
      Adds functions to the buttons clicked within the calcutlor
      
   calcKeys(e)
      Adds functions to key pressed within the calculator window 
      
   eraseChar(textStr)
      Erases the last character from the text string, textStr
      
   evalEq(textStr, decimals) 
      Evaluates the equation in textStr, returning a value to the number of decimals specified by the decimals parameter

   lastEq(textStr) 
      Returns the previous expression from the list of expressions in the textStr parameter

*/
window.onload = init;

//creates the init function to make the buttons clickable
function init() {
      //this variable puts all of the information of the HTML into prespective for the javascript
      var calcButtons = document.getElementsByClassName("calcButton");

      //this for loop is used to apply the method of clicking any button on the calculator to put that number or phrase in the window
      for (var i = 0; i < calcButtons.length; i++) {
            calcButtons[i].onclick = buttonClick;
      }
      //this document variable makes it so that when you press any key down on the calculator or on your keyboard it shows up in the calculator window
      document.getElementById("calcWindow").onkeydown = calcKeys;
}

//gives feedback in the calculator window when a button is clicked and makes the phrases (text strings) then takes the action it was assigned in the switch case
function buttonClick(e) {
      var calcValue = document.getElementById("calcWindow").value;
      var calcDecimal = document.getElementById("decimals").value;
      var buttonValue = e.target.value;

      //this switch case is used to give each button that has a specific label a specific function
      switch (buttonValue) {
            case "del":
                  calcValue = "";
                  break;
            case "bksp":
                  calcValue = eraseChar(calcValue);
                  break;
            case "enter":
                  calcValue += " = " + evalEq(calcValue, calcDecimal) + "\n";
                  break;
            case "prev":
                  calcValue += lastEq(calcValue);
                  break;
            default:
                  calcValue += buttonValue;
                  break;
      }
      //these document varibles use the value method to put do the specific function in the calculators comment window
      document.getElementById("calcWindow").value = calcValue;
      document.getElementById("calcWindow").focus();
}

//This function is used to make each button do its specific event such as delete, backspace, and previous
function calcKeys(e) {
      var calcValue = document.getElementById("calcWindow").value;
      var calcDecimal = document.getElementById("decimals").value;

      //this switch case does the same thing but allows the user to use the keyboard to type the equation out
      switch (e.key) {
            case "Delete":
                  calcValue = "";
                  break;
            case "Enter":
                  calcValue += " = " + evalEq(calcValue, calcDecimal);
                  break;
            case "ArrowUp":
                  calcValue += lastEq(calcWindow.value);
                  e.preventDefault();
      }
      //this document variable is used to put the swtich case into action
      document.getElementById("calcWindow").value = calcValue;
}

/* ===================================================================== */

function eraseChar(textStr) {
      return textStr.substr(0, textStr.length - 1);
}

function evalEq(textStr, decimals) {
      var lines = textStr.split(/\r?\n/);
      var lastLine = lines[lines.length - 1];
      var eqValue = eval(lastLine);
      return eqValue.toFixed(decimals);
}

function lastEq(textStr) {
      var lines = textStr.split(/\r?\n/);
      var lastExp = lines[lines.length - 2];
      return lastExp.substr(0, lastExp.indexOf("=")).trim();
}