const defaultParagraph = "Touch typing builds muscle memory so you can type faster with fewer errors. The visual simulator demonstrates how much time you save over a year.";
let textToAnimate = defaultParagraph;
const displayEl = document.getElementById('text-display');
const speedInputEl = document.getElementById('wpm-input');
const modeSelectEl = document.getElementById('mode-select');
const customTextEl = document.getElementById('custom-text');
const inputEl = document.getElementById('user-input');
const wpmLiveEl = document.getElementById('wpm-live');
let activeInterval = null;
let globalIndex = 0;

// --- Live WPM tracking state ---
let raceStartTime = null;
let wpmTimer = null;

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

function resetWpmTracking() {
  clearInterval(wpmTimer);
  wpmTimer = null;
  raceStartTime = null;
  if (wpmLiveEl) wpmLiveEl.textContent = '0';
}

function countCorrectChars() {
  // Correct chars = spans currently marked as user-correct
  return displayEl.querySelectorAll('.char.user-correct').length;
}

function updateLiveWpm() {
  if (raceStartTime == null) return;
  const elapsedMinutes = (Date.now() - raceStartTime) / 60000;
  if (elapsedMinutes <= 0) {
    wpmLiveEl.textContent = '0';
    return;
  }
  const correctChars = countCorrectChars();
  const wpm = Math.round((correctChars / 5) / elapsedMinutes);
  wpmLiveEl.textContent = wpm >= 0 ? wpm : 0;
}

function startEngine() {
  clearInterval(activeInterval);
  resetWpmTracking();
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

  // Start the live WPM clock on the very first keystroke of a racer attempt
  if (modeSelectEl.value === 'racer' && raceStartTime == null && typedValue.length > 0) {
    raceStartTime = Date.now();
    wpmTimer = setInterval(updateLiveWpm, 200);
  }
  // Keep the display responsive on every keystroke too, not just the interval tick
  updateLiveWpm();

  if (typedValue.length >= textToAnimate.length) {
    updateLiveWpm(); // final snapshot before reset
    clearInterval(wpmTimer);
    setTimeout(startEngine, 1000);
  }
});

speedInputEl.addEventListener('input', startEngine);
modeSelectEl.addEventListener('change', startEngine);
customTextEl.addEventListener('input', startEngine);
startEngine();
