let timerInterval = null;
let remainingTime = 2 * 60 * 60;
let isPaused = false;

const timerElement = document.getElementById("timer");
const audioPlayer = document.getElementById("audioPlayer");
const musicStatus = document.getElementById("musicStatus");

function fmt(t) {
    const h = Math.floor(t / 3600);
    const m = Math.floor((t % 3600) / 60);
    const s = t % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function setMusicStatus(state) {
    if (state === 'playing') {
        musicStatus.textContent = 'Playing';
        musicStatus.style.color = '#5ec98a';
    } else {
        musicStatus.textContent = 'Stopped';
        musicStatus.style.color = '#888';
    }
}

function startTimer() {
    if (timerInterval || remainingTime === 0) return;
    isPaused = false;
    audioPlayer.play().catch(err => console.log("Audio error:", err));
    setMusicStatus('playing');
    timerInterval = setInterval(() => {
        if (!isPaused && remainingTime > 0) {
            remainingTime--;
            timerElement.textContent = fmt(remainingTime);
        }
        if (remainingTime === 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
            setMusicStatus('stopped');
        }
    }, 1000);
}

function pauseTimer() {
    if (!timerInterval || isPaused) return;
    isPaused = true;
    audioPlayer.pause();
    setMusicStatus('stopped');
}

function resumeTimer() {
    if (!timerInterval || !isPaused) return;
    isPaused = false;
    audioPlayer.play().catch(err => console.log("Audio error:", err));
    setMusicStatus('playing');
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    isPaused = false;
    remainingTime = 2 * 60 * 60;
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    timerElement.textContent = fmt(remainingTime);
    setMusicStatus('stopped');
    hideOverlay();
}

function showOverlay() {
    document.getElementById('focusOverlay').style.display = 'flex';
}

function hideOverlay() {
    document.getElementById('focusOverlay').style.display = 'none';
}

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        if (timerInterval && !isPaused) {
            isPaused = true;
            audioPlayer.pause();
            setMusicStatus('stopped');
            showOverlay();
        }
    } else {
        if (timerInterval && isPaused) {
            isPaused = false;
            audioPlayer.play().catch(err => console.log("Audio error:", err));
            setMusicStatus('playing');
            hideOverlay();
        }
    }
});
