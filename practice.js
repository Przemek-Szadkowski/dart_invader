class Practice {
    constructor() {
        this.practiceTime = 1800;
        this.points = 0;
    }

    startTimer(element) {
        let time = this.practiceTime;
        const practiceTimer = setInterval(() => {
            time -= 1;
            console.log(time);
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            console.log(minutes, seconds);
            element.innerHTML = `${minutes >= 10 ? minutes : '0' +  minutes}:${seconds >= 10 ? seconds : '0' + seconds}`;
        }, 1000)
    }
}

export default Practice;