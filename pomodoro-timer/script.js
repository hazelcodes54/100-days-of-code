/* Pomodoro Timer - simple implementation */
const display = document.getElementById('display');
const modeEl = document.getElementById('mode');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const workInput = document.getElementById('work-duration');
const breakInput = document.getElementById('break-duration');
const bellSound = document.getElementById('bell-sound');
const autoSwitchEl = document.getElementById('auto-switch');

let workDuration = parseInt(workInput.value, 10) || 25;
let breakDuration = parseInt(breakInput.value, 10) || 5;
let timeLeft = workDuration * 60; // seconds
let timer = null;
let isRunning = false;
let mode = 'work'; // 'work' or 'break'

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');
  display.textContent = `${minutes}:${seconds}`;
  modeEl.textContent = mode === 'work' ? 'Work' : 'Break';
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft -= 1;
      updateDisplay();
    } else {
      bellSound.play().catch(() => {});
      // If auto switch is enabled, switch modes, otherwise stop
      if (autoSwitchEl.checked) {
        switchMode();
        startTimer();
      } else {
        pauseTimer();
      }
    }
  }, 1000);
}

function pauseTimer() {
  if (!isRunning) return;
  clearInterval(timer);
  timer = null;
  isRunning = false;
}

function resetTimer() {
  pauseTimer();
  workDuration = parseInt(workInput.value, 10) || 25;
  breakDuration = parseInt(breakInput.value, 10) || 5;
  mode = 'work';
  timeLeft = workDuration * 60;
  updateDisplay();
}

function switchMode() {
  mode = mode === 'work' ? 'break' : 'work';
  timeLeft = mode === 'work' ? workDuration * 60 : breakDuration * 60;
  updateDisplay();
}

startBtn.addEventListener('click', () => {
  startTimer();
});

pauseBtn.addEventListener('click', () => {
  pauseTimer();
});

resetBtn.addEventListener('click', () => {
  resetTimer();
});

// Keep inputs synchronized with values, and save settings
[workInput, breakInput].forEach((input) => {
  input.addEventListener('change', () => {
    workDuration = parseInt(workInput.value, 10) || 25;
    breakDuration = parseInt(breakInput.value, 10) || 5;
    saveSettings();
    if (!isRunning) timeLeft = workDuration * 60;
    updateDisplay();
  });
});

// auto switch toggling saves settings
autoSwitchEl.addEventListener('change', () => saveSettings());

// Save & load settings
function saveSettings() {
  const settings = {
    work: workDuration,
    break: breakDuration,
    autoSwitch: autoSwitchEl.checked,
  };
  localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
}

function loadSettings() {
  const raw = localStorage.getItem('pomodoroSettings');
  if (!raw) return;
  try {
    const s = JSON.parse(raw);
    if (s.work) { workInput.value = s.work; workDuration = s.work; }
    if (s.break) { breakInput.value = s.break; breakDuration = s.break; }
    if (typeof s.autoSwitch === 'boolean') autoSwitchEl.checked = s.autoSwitch;
  } catch (e) {
    console.warn('Could not load settings', e);
  }
}

// init
loadSettings();
resetTimer();
updateDisplay();

// Save settings when the user leaves
window.addEventListener('beforeunload', saveSettings);