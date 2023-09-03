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
  document.getElementById("hexCode").innerText = `#` + predefinedColor.toUpperCase();
  document.getElementById("inputHex").value = predefinedColor.toUpperCase();


  const rgbCodeDisplay = document.getElementById("rgbCode");
  const copyHex = document.getElementById("copyHex");
  const copyRGB = document.getElementById("copyRGB");
  const input = document.getElementById('inputHex');


  const generate = document.querySelector(".generate");

  generate.addEventListener("click", generateColor);

  copyHex.addEventListener('click', function() {
    navigator.clipboard.writeText(`#` + input.value);

    if(div !== null) {
      div.remove();
      div = null;
    }
    if(isValidHex(input.value)) {
      generateToastMsg(`#${input.value} is copied successfully!`);
      this.innerHTML = "Hex Code Coppied";
      copyRGB.innerText = 'Copy RGB';
    } else {
      alert('Oops! the color code is not valid');
    }
  });

  copyRGB.addEventListener('click', function() {
    navigator.clipboard.writeText(rgbCode.innerText);
    generateToastMsg(`${rgbCode.innerText} is copied successfully!`);
    this.innerHTML = "RGB Code Coppied";
    copyHex.innerText = 'Copy Hex';
  })

  input.addEventListener('keyup', function(e) {
    copyHex.innerHTML = "Copy Hex";
    const code = e.target.value;
    if(code) {
      // input.value = code;
      if(isValidHex(code)) {
        updateColorCodeToDom(hexToNumbers(code));
      }
    }
  })
}

// Event Handlers
function generateColor() {
    const numbers = generateRandomNumbers();
    updateColorCodeToDom(numbers);
    copyHex.innerHTML = "Copy Hex";
    copyRGB.innerHTML = "Copy RGB";
  }

// DOM Functions
function updateColorCodeToDom(numbers) {
  const hexCode = generateHexCode(numbers);
  const rgbCode = generateRGBCode(numbers);
  document.querySelector(".container").style.background = `#`+hexCode;
  document.getElementById("colorDisplay").style.background = `#`+hexCode;
  document.getElementById("hexCode").innerText = `#`+hexCode;
  document.getElementById("rgbCode").innerText = rgbCode;
  document.getElementById("sliderRedValue").innerText = numbers.red;
  document.getElementById("sliderRed").value = numbers.red;
  document.getElementById("sliderGreenValue").innerText = numbers.green;
  document.getElementById("sliderGreen").value = numbers.green;
  document.getElementById("sliderBlueValue").innerText = numbers.blue;
  document.getElementById("sliderBlue").value = numbers.blue;
  document.getElementById("inputHex").value = hexCode;
}

// Utilities Function

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
  return `${generateHexValue(red)}${generateHexValue(green)}${generateHexValue(blue)}`.toUpperCase();
}

/**
 *
 * @param {object} param0
 * @returns text
 */
function generateRGBCode({ red, green, blue }) {
  return `rgb(${red}, ${green}, ${blue})`;
}

/**
 * Generating color codes, basically three Random Numbers
 * @returns
 */
function generateRandomNumbers() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return {red, green, blue};
}

/**
 *
 * Convert Hex to Number
 * @param {string} hex
 * @returns {object}
 *
 */
function hexToNumbers(hex) {
  const red = parseInt(hex.slice(0,2), 16);
  const green = parseInt(hex.slice(2,4), 16);
  const blue = parseInt(hex.slice(4), 16);

  return { red, green, blue };
}

/**
 * Generating a toast message
 */
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

/**
 * Checking the HexaDecimal value length first
 * then checking the type id that is a valid HexaDecimal code
 * @param {*} code
 * @returns true or false
 */
function isValidHex(code) {
  if(code.length !== 6) return false;
  return /^[0-9A-Fa-f]{6}$/i.test(code);
}
