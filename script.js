let timerInterval;
        let remainingTime = 2 * 60 * 60; // 2 hours in seconds
        let isPaused = false;
        const timerElement = document.getElementById("timer");
        const audio = document.getElementById("audio");
        function updateTimer() {
            const hours = Math.floor(remainingTime / 3600);
            const minutes = Math.floor((remainingTime % 3600) / 60);
            const seconds = remainingTime % 60;
            timerElement.textContent = 
                `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            if (remainingTime === 0) {
                clearInterval(timerInterval);
                audio.pause();
                audio.currentTime = 0; // Reset audio to the beginning
                print("Times up,very good,Go for a breake")
            }
        }
        function startTimer() {
            if (!timerInterval) {
                timerInterval = setInterval(() => {
                    if (!isPaused && remainingTime > 0) {
                        remainingTime--;
                        updateTimer();
                        audio.play().catch(error => {
                            console.log("Error playing audio:", error);
                        });
                    }
                }, 1000);
            }
        }
        function pauseTimer() {
            isPaused = true;
            audio.pause();
        }
        function resumeTimer() {
            isPaused = false;
            audio.play();
        }
        function resetTimer() {
            clearInterval(timerInterval);
            timerInterval = null;
            remainingTime = 2 * 60 * 60;
            updateTimer();
            audio.pause();
            audio.currentTime = 0;
        }
        updateTimer(); // Initialize timer display
