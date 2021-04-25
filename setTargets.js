const NUMBERS = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
const specialSet = [25, 50];

class Target {
    constructor() {
        this.dartsInRound = 0;
        this.bigNumbers = [...NUMBERS];
    }
    addDartInRound() {
        this.dartsInRound++;
    }
    resetDarts() {
        this.dartsInRound = 0;
    }
    //draw method
    drawNumber(element, category = '', special = false) {
        if(special) {
            const newTarget = Math.floor(Math.random() * specialSet.length);
            element.textContent = `${category}${specialSet[newTarget]}`;
            element.classList.add('visible');
        } else {
            if(this.bigNumbers.length === 0) {
                this.bigNumbers = [...NUMBERS];
            }
            const newTarget = Math.floor(Math.random() * this.bigNumbers.length);
            element.textContent = `${category}${this.bigNumbers[newTarget]}`;
            element.classList.add('visible');
            this.bigNumbers.splice(newTarget, 1);
        }
    }
}

export default Target;