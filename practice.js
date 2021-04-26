class Practice {
    constructor() {
        this.practiceTime = 1800;
        this.points = 0;
        this.isTimerPaused = false;
        this.practiceTimer = 0;
        this.showNextTarget = false;
    }

    startTimer(element) {
        clearInterval(this.practiceTimer);
        this.practiceTimer = setInterval(() => {
            if(!this.isTimerPaused) {
                this.practiceTime -= 1;
                const minutes = Math.floor(this.practiceTime / 60);
                const seconds = this.practiceTime % 60;
                //czy tutaj wstawić ifa i sprawdzić gdy minutesw i seconds wynoszą 00:00???????
                element.textContent = `${minutes >= 10 ? minutes : '0' +  minutes}:${seconds >= 10 ? seconds : '0' + seconds}`;
            } else {
                clearInterval(this.practiceTimer);
            }
        }, 1000)
    }

    pauseTimer() {
        this.isTimerPaused = true;
    }

    resetPractice() {
        this.practiceTime = 1800;
        this.points = 0;
        this.isTimerPaused = false;
        clearInterval(this.practiceTimer);
        this.practiceTimer = 0;
        this.showNextTarget = false;
    }

    addPoint() {
        this.points++;
    }

    subtractPoint() {
        this.points--;
    }
}

export default Practice;