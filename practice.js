class Practice {
    constructor() {
        this.practiceTime = 1800;
        this.points = 0;
    }

    startTimer() {
        let time = this.practiceTime;
        const practiceTimer = setInterval(() => {
            time -= 1;
            console.log(time);
        }, 1000)
    }
    // i teraz razy 60 i do tego sekundy i przenieść to na element p do DOMU
}

export default Practice;