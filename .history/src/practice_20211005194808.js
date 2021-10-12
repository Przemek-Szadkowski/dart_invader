const PRACTICE_TIME = 1800;

class Practice {
    constructor() {
        this.practiceTime = `${Math.floor(PRACTICE_TIME / 60)}:${PRACTICE_TIME % 60 > 9 ? PRACTICE_TIME % 60 : '0' + PRACTICE_TIME % 60}`;
        this.points = 0;
        this.isTimerPaused = false;
        this.practiceTimer = 0;
        this.showNextTarget = false;
        this.sessions = [];
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
                    this.saveToLocalStorage();
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

    practiceResume(modal) {
        const resumeText = `<p>Twój wynik:</p>
        <p>${this.points}</p>`;
        modal.insertAdjacentHTML('afterbegin', resumeText);
    }

    saveToLocalStorage() {
        let previousSessionsFromLocalStorage = JSON.parse(localStorage.getItem('sessions'));
        console.log(previousSessionsFromLocalStorage);

        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const hour = today.getHours();
        const minutes = today.getMinutes();

        const session = `<tr><td>${day}/${month}/${year}</td><td>${hour}:${minutes > 10 ? minutes : '0' + minutes}</td><td>${this.points}</td></tr>`

        if(previousSessionsFromLocalStorage === null) previousSessionsFromLocalStorage = [];
        previousSessionsFromLocalStorage.push(session);

        localStorage.setItem('sessions', JSON.stringify(previousSessionsFromLocalStorage));
    }
}

export default Practice;