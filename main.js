/*
*
* Author: Uzzwal Dhali
* Author's Portfolio: https://www.uzzwal.com
*
*/

// Global Variables
let div = null;
let predefinedColor = '1468c7';

// Onload Handler
window.onload = () => {
  main();
}

// Boot Function
function main() {
  const container = document.querySelector(".container");
  const display = document.getElementById("colorDisplay");
  const hexCode = document.getElementById("hexCode");
  const rgbCode = document.getElementById("rgbCode");
  const copyHex = document.getElementById("copyHex");
  const copyRGB = document.getElementById("copyRGB");
  const input = document.getElementById('inputHex');
  const generate = document.querySelector(".generate");
  display.value = predefinedColor.toUpperCase();

  generate.addEventListener("click", function() {
    let bgColor = generateColor();
    container.style.background = `#` + bgColor;
    display.style.background = `#` + bgColor;
    input.value = bgColor.toUpperCase();
    hexCode.innerHTML = `#` + bgColor;
    copyHex.innerHTML = "Copy Hex";
    copyRGB.innerHTML = "Copy RGB";
  });

  copyHex.addEventListener('click', function() {
    navigator.clipboard.writeText(`#` + input.value);

    if(div !== null) {
      div.remove();
      div = null;
    }
    if(isValidHex(input.value)) {
      generateToastMsg(`#${input.value} is copied successfully!`);
      this.innerHTML = "Hex Code Coppied";
    } else {
      alert('Oops! the color code is not valid');
    }
  });

  input.addEventListener('keyup', function(e) {
    copyHex.innerHTML = "Copy Hex";
    const code = e.target.value;
    if(code) {
      input.value = code.toUpperCase();
      if(isValidHex(code)) {
        container.style.background = `#` + code;
        display.style.background = `#` + code;
        hexCode.innerHTML = `#` + code.toUpperCase();
      }
    }
  })
}

// Event Handlers

// DOM Functions

// Utilities Function

/**
 * generate and return an object of three colors
 * @returns
 */
function w() {

}


/**
 * This function will generate a hex code from random numbers
 * And a zero will be added before to make a payer if needed
 * @returns {object} color
 */
function generateHexCode({ red, green, blue }) {
  const generateHexValue = (value) => {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }
  return `#${generateHexValue(red)}${generateHexValue(green)}${generateHexValue(blue)}`.toUpperCase();
}


function generateColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return `${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}

function generateToastMsg(msg) {
  div = document.createElement('div');
  div.className = 'toast toast-in';
  div.innerHTML = msg;

  div.addEventListener('click', function() {
    div.classList.remove('toast-in');
    div.classList.add('toast-out');

    div.addEventListener('animationend', function() {
      div.remove();
      div = null;
    });
  });

  document.body.appendChild(div);
}

function isValidHex(code) {
  if(code.length !== 6) return false;
  return /^[0-9A-Fa-f]{6}$/i.test(code);
}
