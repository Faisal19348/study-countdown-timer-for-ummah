let timerInterval;
        let remainingTime = 2 * 60 * 60; // 2 hours in seconds
        let isPaused = false;

        const timerElement = document.getElementById("timer");
        const soundcloudPlayer = document.getElementById("soundcloudPlayer");
        

       // Initialize the SoundCloud widget
const iframeElement = document.getElementById('soundcloud-widget'); // Replace with your iframe's ID
const widget = SC.Widget(iframeElement);

        function updateTimer() {
            const hours = Math.floor(remainingTime / 3600);
            const minutes = Math.floor((remainingTime % 3600) / 60);
            const seconds = remainingTime % 60;

            timerElement.textContent = 
                `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            if (remainingTime === 0) {
                clearInterval(timerInterval);
                widget.pause();    
            }
        }

        function startTimer() {
            if (!timerInterval) {
                timerInterval = setInterval(() => {
                    if (!isPaused && remainingTime > 0) {
                        remainingTime--;
                        updateTimer();
                        widget.play(); 
                    }
                }, 1000);
            }
        }

        function pauseTimer() {
            isPaused = true;
            widget.pause(); 
        }

        function resumeTimer() {
            isPaused = false;
            widget.play(); 
        }

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    remainingTime = 2 * 60 * 60; // Reset timer to 2 hours
    updateTimer();

    // Reset SoundCloud track to the beginning
    widget.seekTo(0); // Seek to the 0-point
    widget.pause();   // Pause playback
}


        // Function to send play/pause message to SoundCloud iframe
        function postMessageToSoundCloud(action) {
            soundcloudPlayer.contentWindow.postMessage(JSON.stringify({
                method: action
            }), "*");
        }

        updateTimer(); // Initialize timer display
