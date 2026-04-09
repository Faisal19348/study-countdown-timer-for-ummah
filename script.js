let timerInterval;
let remainingTime = 2 * 60 * 60; // 2 hours in seconds
let isPaused = false;
let isPlaying = false;

const timerElement = document.getElementById("timer");
const audioPlayer = document.getElementById("audioPlayer");

// Function to format and update the timer display
function updateTimer() {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    timerElement.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (remainingTime === 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        isPlaying = false;
    }
}

// Function to start the timer
function startTimer() {
    if (!timerInterval) {
        console.log("Starting timer and audio...");
        audioPlayer.play().catch(function(error) {
            console.log("Audio play error:", error);
        });
        isPlaying = true;
        timerInterval = setInterval(() => {
            if (!isPaused && remainingTime > 0) {
                remainingTime--;
                updateTimer();
            }
        }, 1000);
    }
}

// Function to pause the timer and audio
function pauseTimer() {
    isPaused = true;
    if (isPlaying) {
        audioPlayer.pause();
    }
}

// Function to resume the timer and audio
function resumeTimer() {
    if (timerInterval && isPaused) {
        isPaused = false;
        if (isPlaying) {
            audioPlayer.play().catch(function(error) {
                console.log("Audio play error:", error);
            });
        }
    }
}

// Function to reset the timer and audio
function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    isPaused = false;
    isPlaying = false;
    remainingTime = 2 * 60 * 60; // Reset to 2 hours
    audioPlayer.currentTime = 0;
    audioPlayer.pause();
    updateTimer();
}

// Initialize the timer display
updateTimer();
