let timerInterval;
let remainingTime = 2 * 60 * 60; // 2 hours in seconds
let isPaused = false;

const timerElement = document.getElementById("timer");
const iframeElement = document.getElementById("soundcloud-widget");
const widget = SC.Widget(iframeElement); // Initialize SoundCloud widget

// Function to format and update the timer display
function updateTimer() {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    timerElement.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (remainingTime === 0) {
        clearInterval(timerInterval);
        widget.pause(); // Stop music when the timer ends
    }
}

// Function to start the timer
function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            if (!isPaused && remainingTime > 0) {
                remainingTime--;
                updateTimer();
                widget.play(); // Play music during the countdown
            }
        }, 1000);
    }
}

// Function to pause the timer
function pauseTimer() {
    isPaused = true;
    widget.pause(); // Pause music
}

// Function to resume the timer
function resumeTimer() {
    isPaused = false;
    widget.play(); // Resume music
}

// Function to reset the timer and SoundCloud track
function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    remainingTime = 2 * 60 * 60; // Reset to 2 hours
    updateTimer();

    widget.seekTo(0); // Reset music to the beginning
    widget.pause();   // Pause playback
}

// Initialize the timer display
updateTimer();
