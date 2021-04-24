class Target {
    constructor() {
        this.dartsInRound = 0;
        this.bigNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    }
    addDartInRound() {
        this.dartsInRound++;
    }
    resetDarts() {
        this.dartsInRound = 0;
    }
    //randomization methods
    drawBigNumber(element) {
        const newTarget = Math.floor(Math.random() * this.bigNumbers.length + 1);
        element.innerHTML = newTarget;
        element.classList.add('visible');
    }
}

export default Target;