import { saveToLocalStorage } from './helpers.js';

const PRACTICE_TIME = 10;

class Practice {
    constructor() {
        this.practiceTime = PRACTICE_TIME;
        this.points = 0;
        this.isTimerPaused = false;
        this.practiceTimer = 0;
        this.showNextTarget = false;
        this.sessions = [];
    }

    startTimer(element, modal, fieldForResume) {
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
                    this.practiceResume(fieldForResume);
                    saveToLocalStorage(this.points);
                } else {
                    element.textContent = `${minutes >= 10 ? minutes : '0' +  minutes}:${seconds >= 10 ? seconds : '0' + seconds}`;
                }
            } else {
                clearInterval(this.practiceTimer);
            }
        }, 1000)
    }

    pauseTimer() {
        this.isTimerPaused = true;
    }

    resetTimer() {
        return`${Math.floor(PRACTICE_TIME / 60)}:${PRACTICE_TIME % 60 > 9 ? PRACTICE_TIME % 60 : '0' + PRACTICE_TIME % 60}`;
    }

    resetPractice() {
        this.practiceTime = PRACTICE_TIME;
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

    practiceResume(resumeField) {
        const resumeText = `
        Twój wynik:
        ${this.points}`;
        resumeField.innerText = resumeText;
    }

    removingScoreClass(buttons) {
        buttons.forEach(button => {
            if(!this.isTimerPaused) {
                button.classList.remove('score');
                button.disabled = false;   
            }
        })
    }

    reset(targetsSet, startButton, pauseButton, historyButton, helpButton, timer, containerForBigNumber) {
        this.resetPractice();
        if(targetsSet) targetsSet.resetDarts();
        startButton.disabled = false;
        pauseButton.disabled = false;
        historyButton.disabled = false;
        helpButton.disabled = false;
        this.showNextTarget = false;
        timer.textContent = this.resetTimer();
        containerForBigNumber.textContent = '';
    }
}

export default Practice;