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
    bindElementsToDrawing(element, category, numbersSet, target) {
        element.textContent = `${category}${numbersSet[target]}`;
        element.classList.add('visible');
        element.classList.add('anim');
        setTimeout(()=> {
            element.classList.remove('anim');//animations runs every time anim class is added
        }, 2000)
    }
    setRandomTarget(numbersSet) {
        return Math.floor(Math.random() * numbersSet.length);
    }
    //main draw method
    drawNumber(element, category = '', special = false) {
        if(special) {
            const newTarget = this.setRandomTarget(specialSet);
            this.bindElementsToDrawing(element, category, specialSet, newTarget);
        
        } else {
            if(this.bigNumbers.length === 0) {
                this.bigNumbers = [...NUMBERS];//repeat bigNumbers when all have been thrown
            }
            const newTarget = this.setRandomTarget(this.bigNumbers);
            this.bindElementsToDrawing(element, category, this.bigNumbers, newTarget);
            this.bigNumbers.splice(newTarget, 1);
        }
    }
}

export default Target;