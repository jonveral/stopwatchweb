let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;
let isRunning = false;
let lapCount = 1;

const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const millisecondsElement = document.getElementById('milliseconds');
const lapsList = document.getElementById('lapsList');

function updateDisplay() {
    hoursElement.textContent = padTime(hours);
    minutesElement.textContent = padTime(minutes);
    secondsElement.textContent = padTime(seconds);
    millisecondsElement.textContent = padMilliseconds(milliseconds);
}

function padTime(time) {
    return time.toString().padStart(2, '0');
}

function padMilliseconds(time) {
    return time.toString().padStart(3, '0');
}

function startTimer() {
    if (!isRunning) {
        interval = setInterval(() => {
            milliseconds += 10;
            
            if (milliseconds === 1000) {
                milliseconds = 0;
                seconds++;
            }
            
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
            
            updateDisplay();
        }, 10);
        isRunning = true;
    }
}

function stopTimer() {
    clearInterval(interval);
    isRunning = false;
}

function resetTimer() {
    stopTimer();
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    lapCount = 1;
    updateDisplay();
    lapsList.innerHTML = '';
}

function addLap() {
    if (isRunning) {
        const lapTime = `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}.${padMilliseconds(milliseconds)}`;
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `
            <span class="lap-number">Lap ${lapCount}</span>
            <span class="lap-time">${lapTime}</span>
        `;
        lapsList.prepend(lapItem);
        lapCount++;
        
        // Limit laps to 20
        if (lapsList.children.length > 20) {
            lapsList.removeChild(lapsList.lastChild);
        }
    }
}

// Event Listeners
document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('stopBtn').addEventListener('click', stopTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);
document.getElementById('lapBtn').addEventListener('click', addLap);

// Keyboard Controls
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 's':
            startTimer();
            break;
        case 't':
            stopTimer();
            break;
        case 'r':
            resetTimer();
            break;
        case 'l':
            addLap();
            break;
    }
});