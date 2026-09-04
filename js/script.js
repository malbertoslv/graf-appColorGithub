const redRange = document.getElementById('redRange');
const greenRange = document.getElementById('greenRange');
const blueRange = document.getElementById('blueRange');


const redInput = document.getElementById('redInput');
const greenInput = document.getElementById('greenInput');
const blueInput = document.getElementById('blueInput');


const htmlColorPicker = document.getElementById('htmlColorPicker');


const colorPreview = document.getElementById('colorPreview');
const previewText = document.getElementById('previewText');
const hexInput = document.getElementById('hexInput');

const copyBtn = document.getElementById('copyBtn');
const copyIcon = document.getElementById('copyIcon');
const copyText = document.getElementById('copyText');
const randomBtn = document.getElementById('randomBtn');

function componentToHex(c) {
  const hex = parseInt(c || 0).toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

function clampValue(val) {
  let num = parseInt(val);
  if (isNaN(num)) return 0;
  if (num < 0) return 0;
  if (num > 255) return 255;
  return num;
}

function updateColor(source) {
  let r, g, b;

  if (source === 'picker') {
    const rgb = hexToRgb(htmlColorPicker.value);
    r = rgb.r;
    g = rgb.g;
    b = rgb.b;

    redRange.value = r; redInput.value = r;
    greenRange.value = g; greenInput.value = g;
    blueRange.value = b; blueInput.value = b;

  } else if (source === 'input') {
    r = clampValue(redInput.value);
    g = clampValue(greenInput.value);
    b = clampValue(blueInput.value);

    redRange.value = r;
    greenRange.value = g;
    blueRange.value = b;

  } else {
    r = clampValue(redRange.value);
    g = clampValue(greenRange.value);
    b = clampValue(blueRange.value);

    redInput.value = r;
    greenInput.value = g;
    blueInput.value = b;
  }

  const hex = `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`.toUpperCase();

  if (source !== 'picker') {
    htmlColorPicker.value = hex;
  }

  // Asignar fondo al recuadro
  colorPreview.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  
  // Asignar texto inferior
  previewText.textContent = `rgb(${r}, ${g}, ${b})`;

  hexInput.value = hex;
}

htmlColorPicker.addEventListener('input', () => updateColor('picker'));

redRange.addEventListener('input', () => updateColor('range'));
greenRange.addEventListener('input', () => updateColor('range'));
blueRange.addEventListener('input', () => updateColor('range'));

redInput.addEventListener('input', () => updateColor('input'));
greenInput.addEventListener('input', () => updateColor('input'));
blueInput.addEventListener('input', () => updateColor('input'));

[redInput, greenInput, blueInput].forEach(input => {
  input.addEventListener('blur', () => updateColor('input'));
});

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(hexInput.value).then(() => {
    copyIcon.className = 'bi bi-check2-all me-1';
    copyText.textContent = '¡Copiado!';
    copyBtn.classList.replace('btn-primary', 'btn-success');

    setTimeout(() => {
      copyIcon.className = 'bi bi-clipboard me-1';
      copyText.textContent = 'Copiar';
      copyBtn.classList.replace('btn-success', 'btn-primary');
    }, 2000);
  });
});

randomBtn.addEventListener('click', () => {
  redRange.value = Math.floor(Math.random() * 256);
  greenRange.value = Math.floor(Math.random() * 256);
  blueRange.value = Math.floor(Math.random() * 256);
  updateColor('range');
});

updateColor('range');