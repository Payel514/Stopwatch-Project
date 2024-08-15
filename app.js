let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 0;

const display = document.querySelector('.display');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');
const startPauseBtn = document.getElementById('startPause');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');
const clearLapsBtn = document.getElementById('clearLaps');
const lapList = document.getElementById('lapList');
const lapCountEl = document.getElementById('lapCount');
const bgColorInput = document.getElementById('bgColor');
const timerColorInput = document.getElementById('timerColor');

function startPause() {
    if (isRunning) {
        clearInterval(timerInterval);
        startPauseBtn.textContent = 'Resume';
        isRunning = false;
        display.classList.remove('running');
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        startPauseBtn.textContent = 'Pause';
        isRunning = true;
        display.classList.add('running');
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    let minutes = Math.floor(elapsedTime / 60000);
    let seconds = Math.floor((elapsedTime % 60000) / 1000);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
    millisecondsEl.textContent = milliseconds.toString().padStart(2, '0');
}

function lap() {
    if (isRunning) {
        lapCount++;
        const li = document.createElement('li');
        li.innerHTML = `
            <span>Lap ${lapCount}: ${minutesEl.textContent}:${secondsEl.textContent}.${millisecondsEl.textContent}</span>
            <span class="delete-lap">×</span>
        `;
        lapList.insertBefore(li, lapList.firstChild);
        updateLapCount();

        li.querySelector('.delete-lap').addEventListener('click', function() {
            lapList.removeChild(li);
            lapCount--;
            updateLapCount();
        });
    }
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    millisecondsEl.textContent = '00';
    startPauseBtn.textContent = 'Start';
    display.classList.remove('running');
}

function clearLaps() {
    lapList.innerHTML = '';
    lapCount = 0;
    updateLapCount();
}

function updateLapCount() {
    lapCountEl.textContent = `(${lapCount})`;
}

function updateBackgroundColor() {
    document.body.style.backgroundColor = bgColorInput.value;
}

function updateTimerColor() {
    display.style.color = timerColorInput.value;
}

startPauseBtn.addEventListener('click', startPause);
lapBtn.addEventListener('click', lap);
resetBtn.addEventListener('click', reset);
clearLapsBtn.addEventListener('click', clearLaps);
bgColorInput.addEventListener('input', updateBackgroundColor);
timerColorInput.addEventListener('input', updateTimerColor);

display.addEventListener('click', function() {
    if (isRunning) {
        lap();
    }
});