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
const appEl = document.getElementById('app');
const progressCircle = document.getElementById('progress-circle');
const currentTask = document.getElementById('current-task');

let workDuration = parseInt(workInput.value, 10) || 25;
let breakDuration = parseInt(breakInput.value, 10) || 5;
let timeLeft = workDuration * 60; // seconds
let totalSeconds = timeLeft;
let timer = null;
let isRunning = false;
let mode = 'work'; // 'work' or 'break'

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');
  display.textContent = `${minutes}:${seconds}`;
  modeEl.textContent = mode === 'work' ? 'Work' : 'Break';
  // update ring progress
  const percent = 1 - (timeLeft / totalSeconds);
  setProgress(percent);
  // switch app mode class for styling
  appEl.classList.toggle('work-mode', mode === 'work');
  appEl.classList.toggle('break-mode', mode === 'break');
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
  appEl.classList.add('running');
}

function pauseTimer() {
  if (!isRunning) return;
  clearInterval(timer);
  timer = null;
  isRunning = false;
  appEl.classList.remove('running');
}

function resetTimer() {
  pauseTimer();
  workDuration = parseInt(workInput.value, 10) || 25;
  breakDuration = parseInt(breakInput.value, 10) || 5;
  mode = 'work';
  timeLeft = workDuration * 60;
  totalSeconds = timeLeft;
  updateDisplay();
}

function switchMode() {
  mode = mode === 'work' ? 'break' : 'work';
  timeLeft = mode === 'work' ? workDuration * 60 : breakDuration * 60;
  totalSeconds = timeLeft;
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
    totalSeconds = timeLeft;
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
    currentTask: currentTask?.value || ''
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
    if (s.currentTask) { currentTask.value = s.currentTask; }
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

// Set up the progress ring stroke dash array and helper
const radius = 54;
const circumference = 2 * Math.PI * radius;
if (progressCircle) {
  progressCircle.style.strokeDasharray = `${circumference}`;
  progressCircle.style.strokeDashoffset = `${circumference}`;
}
  
// Theme toggle logic
document.addEventListener('DOMContentLoaded', () => {
  const themeSwitch = document.getElementById('themeSwitch');
  const body = document.body;
  if (!themeSwitch) return;
  // Load theme from localStorage
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    themeSwitch.checked = true;
  }
  themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
      body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  });
});

function setProgress(pct) {
  if (!progressCircle) return;
  const offset = circumference * (1 - Math.max(0, Math.min(1, pct)));
  progressCircle.style.strokeDashoffset = offset;
}

// Keyboard shortcuts: Space toggles, Enter starts, R resets
window.addEventListener('keydown', (e) => {
  const activeTag = document.activeElement?.tagName?.toLowerCase();
  if (activeTag === 'input' || activeTag === 'textarea') {
    // ignore if typing in inputs
    return;
  }
  if (e.code === 'Space') {
    e.preventDefault();
    if (isRunning) pauseTimer(); else startTimer();
  } else if (e.code === 'Enter') {
    startTimer();
  } else if (e.key.toLowerCase() === 'r') {
    resetTimer();
  }
});

// save current task on change
currentTask?.addEventListener('change', saveSettings);