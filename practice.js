class Practice {
    constructor() {
        this.practiceTime = 900;
        this.points = 0;
        this.isTimerPaused = false;
        this.practiceTimer = 0;
        this.showNextTarget = false;
    }

    startTimer(element, modal) {
        clearInterval(this.practiceTimer);
        this.practiceTimer = setInterval(() => {
            if(!this.isTimerPaused) {
                this.practiceTime -= 1;
                const minutes = Math.floor(this.practiceTime / 60);
                const seconds = this.practiceTime % 60;
                if(minutes === 0 && seconds === 0) {
                    element.textContent = '00:00';
                    clearInterval(this.practiceTimer);
                    modal.classList.add('visible');
                    const inner_modal = modal.querySelector('.modal_inner');
                    this.practiceResume(inner_modal);
                } else {
                    element.textContent = `${minutes >= 10 ? minutes : '0' +  minutes}:${seconds >= 10 ? seconds : '0' + seconds}`;
                }
            } else {
                clearInterval(this.practiceTimer);
            }
        }, 1000)
    }//dodąc informacje na koniec gry do modala, button zamykający modala i robiący to samo co przycisk reset!!!!

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

    practiceResume(modal) {
        const resumeText = `<p>Twój wynik:</p>
        <p>${this.points}</p>`;
        modal.insertAdjacentHTML('afterbegin', resumeText);
    }
}

export default Practice;