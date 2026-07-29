const defaultParagraph = "Touch typing builds muscle memory so you can type faster with fewer errors. The visual simulator demonstrates how much time you save over a year.";
let textToAnimate = defaultParagraph;

const displayEl = document.getElementById('text-display');
const speedInputEl = document.getElementById('wpm-input');
const modeSelectEl = document.getElementById('mode-select');
const customTextEl = document.getElementById('custom-text');
const inputEl = document.getElementById('user-input');

let activeInterval = null;
let globalIndex = 0;

function initializeTextStructure() {
  const userCustomString = customTextEl.value.trim();
  textToAnimate = userCustomString.length > 0 ? userCustomString : defaultParagraph;

  displayEl.innerHTML = '';
  textToAnimate.split('').forEach(char => {
    const span = document.createElement('span');
    span.className = 'char';
    span.innerText = char;
    displayEl.appendChild(span);
  });
  inputEl.value = '';
}

function startEngine() {
  clearInterval(activeInterval);
  initializeTextStructure();
  
  const currentMode = modeSelectEl.value;
  let currentWPM = parseInt(speedInputEl.value) || 120;
  
  if (currentWPM > 500) currentWPM = 500;
  if (currentWPM < 1) currentWPM = 1;

  const intervalTime = (60 * 1000) / (currentWPM * 5); 
  const charSpans = displayEl.querySelectorAll('.char');
  globalIndex = 0;

  if (currentMode === 'racer') {
    inputEl.disabled = false;
    inputEl.placeholder = "Start typing here to race the pace bar...";
    inputEl.focus();
  } else {
    inputEl.disabled = true;
    inputEl.placeholder = "Watching Auto Simulator mode...";
  }

  activeInterval = setInterval(() => {
    if (currentMode === 'simulator') {
      if (globalIndex < charSpans.length) {
        charSpans[globalIndex].classList.add('completed');
        globalIndex++;
      } else {
        clearInterval(activeInterval);
        setTimeout(startEngine, 1500); 
      }
    } else if (currentMode === 'racer') {
      charSpans.forEach(span => span.classList.remove('pace-marker'));
      if (globalIndex < charSpans.length) {
        charSpans[globalIndex].classList.add('pace-marker');
        globalIndex++;
      } else {
        clearInterval(activeInterval);
      }
    }
  }, intervalTime);
}

inputEl.addEventListener('input', () => {
  const typedValue = inputEl.value.split('');
  const charSpans = displayEl.querySelectorAll('.char');

  charSpans.forEach((span, index) => {
    const typedChar = typedValue[index];
    if (typedChar == null) {
      span.classList.remove('user-correct', 'user-incorrect');
    } else if (typedChar === span.innerText) {
      span.classList.add('user-correct');
      span.classList.remove('user-incorrect');
    } else {
      span.classList.add('user-incorrect');
      span.classList.remove('user-correct');
    }
  });

  if (typedValue.length >= textToAnimate.length) {
    setTimeout(startEngine, 1000);
  }
});

speedInputEl.addEventListener('input', startEngine);
modeSelectEl.addEventListener('change', startEngine);
customTextEl.addEventListener('input', startEngine);

startEngine();
