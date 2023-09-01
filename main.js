let div = null;
let predefinedColor = '1468c7';

window.onload = () => {
  main();
}

function main() {
  const generate = document.querySelector(".generate");
  const container = document.querySelector(".container");
  const display = document.getElementById("display");
  const copy = document.getElementById("copy");
  display.value = predefinedColor.toUpperCase();

  generate.addEventListener("click", function() {
    let bgColor = generateColor();
    container.style.background = `#` + bgColor;
    display.value = bgColor.toUpperCase();
    copy.innerHTML = "Copy";
  });

  copy.addEventListener('click', function() {
    navigator.clipboard.writeText(`#` + display.value);

    if(div !== null) {
      div.remove();
      div = null;
    }
    if(isValidHex(display.value)) {
      generateToastMsg(`#${display.value} is copied successfully!`);
      this.innerHTML = "Coppied";
    } else {
      alert('Oops! the color code is not valid');
    }
  });

  display.addEventListener('keyup', function(e) {
    const code = e.target.value;
    if(code) {
      display.value = code.toUpperCase();
      if(isValidHex(code)) {
        container.style.background = `#` + code;
      }
    }
  })
}

function generateColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  console.log(red.toString(16), green.toString(16), blue.toString(16));

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
