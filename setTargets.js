const BIG_NUMBERS = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

class Target {
    constructor() {
        this.dartsInRound = 0;
        this.bigNumbers = [...BIG_NUMBERS];
    }
    addDartInRound() {
        this.dartsInRound++;
    }
    resetDarts() {
        this.dartsInRound = 0;
    }
    //randomization methods
    drawBigNumber(element) {
        console.log(this.bigNumbers);
        if(this.bigNumbers.length === 0) {
            this.bigNumbers = [...BIG_NUMBERS];
        }
        const newTarget = Math.floor(Math.random() * this.bigNumbers.length);
        element.textContent = this.bigNumbers[newTarget];
        element.classList.add('visible');
        this.bigNumbers.splice(newTarget, 1);
        console.log(newTarget);
        console.log(this.bigNumbers);
    }
}

export default Target;