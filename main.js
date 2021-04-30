import Practice from './practice.js';
import Target from './setTargets.js';

const greenButtons = document.querySelectorAll('.dart');
const timer = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset_button');
const historyButton = document.getElementById('history_button');
const containerForBigNumber = document.querySelector('.bigNumber');
const containerForSmallNumber = document.querySelector('.smallNumber');
const containerForDoubleNumber = document.querySelector('.double');
const containerForBullNumber = document.querySelector('.bull');
const containerForTripleNumber = document.querySelector('.triple');
const modalContainer = document.querySelector('.modal_outer');
const modalReset = document.getElementById('modal_reset');

const temporaryCounter =document.getElementById('counter');

const practice = new Practice();
let targetsSet = null;

timer.textContent = `${Math.floor(practice.practiceTime / 60)}:${practice.practiceTime % 60 > 9 ? practice.practiceTime % 60 : '0' + practice.practiceTime % 60}`; 

function removingScoreClass() {
    greenButtons.forEach(element => {
        if(!practice.isTimerPaused) {
            element.classList.remove('score');
            element.disabled = false;   
        }
    })
}

function reset() {
    practice.resetPractice();
    if(targetsSet) targetsSet.resetDarts();
    startButton.disabled = false;
    pauseButton.disabled = false;
    historyButton.disabled = false;
    practice.showNextTarget = false;
    timer.textContent = `${Math.floor(practice.practiceTime / 60)}:${practice.practiceTime % 60 > 9 ? practice.practiceTime % 60 : '0' + practice.practiceTime % 60}`; 
    containerForBigNumber.textContent = '';
}

startButton.addEventListener('click', () => {
    removingScoreClass();
    practice.startTimer(timer, modalContainer);
    startButton.disabled = true;
    historyButton.disabled = true;
    setTimeout(() => {
        pauseButton.disabled = false;
    }, 1000);

    if(!practice.isTimerPaused) {
        targetsSet = new Target(); //prevents setting dartsInRound to zero when pause button is checked
        targetsSet.drawNumber(containerForBigNumber);
    }

    practice.isTimerPaused = false;
    greenButtons.forEach(element => {
        element.disabled = false;
    })
    practice.showNextTarget = true;
});


greenButtons.forEach(element => {
    element.addEventListener('click', (e) => {
        
        // add score class to darts button - START

        let greenButton;
        let redButton;

        const sameClassButtons = document.querySelectorAll(`.${e.target.classList[0]}`); // finding the same class button and prevent adding score class to two buttons from group

        const hasGreenButtonScoreClass = [...sameClassButtons][0].classList.contains('score');//flag to prevent subtract points when green buttton din't checked
        const hasRedButtonScoreClass = [...sameClassButtons][1].classList.contains('score');

        sameClassButtons.forEach(el => {
            el.classList.remove('score');
            if(el.classList.contains('green')) greenButton = el;
            if(el.classList.contains('red')) redButton = el;
        })
        element.classList.add('score');

        // add score class to darts button - END

        // this block allow to change mark green button to red button and subtracts point during this change
        if(practice.practiceTimer) { //add points only if game was started
            if(e.target.classList.contains('green')) {
                practice.addPoint();
                if(!hasRedButtonScoreClass) targetsSet.addDartInRound();
                greenButton.disabled = true;
                redButton.disabled = false;
            } else {
                // if green button was checked in the same round, red buttton substracts point from practice.points
                if(hasGreenButtonScoreClass) practice.subtractPoint();
                if(!hasGreenButtonScoreClass) targetsSet.addDartInRound();
                redButton.disabled = true;
                greenButton.disabled = false;
                // console.log(practice.points);
            }
        }

        //this part can be shorter
        if(practice.showNextTarget && targetsSet.dartsInRound === 3) {
            if(practice.points < 30) {
                setTimeout(() => {
                    targetsSet.dartsInRound = 0;
                    targetsSet.drawNumber(containerForBigNumber);
                    removingScoreClass();
                }, 400)
            } else if(practice.points < 50) {
                setTimeout(() => {
                    containerForBigNumber.classList.remove('visible');
                    targetsSet.dartsInRound = 0;
                    targetsSet.drawNumber(containerForSmallNumber);
                    removingScoreClass();
                }, 400)
            } else if(practice.points < 80) {
                setTimeout(() => {
                    containerForSmallNumber.classList.remove('visible');
                    targetsSet.dartsInRound = 0;
                    const randomFlag = Math.floor(Math.random() * 12);
                    console.log(randomFlag)
                    if(randomFlag === 1 || randomFlag === 2) {
                        targetsSet.drawNumber(containerForBullNumber, '', true);
                        containerForDoubleNumber.classList.remove('visible');
                    } else {
                        containerForBullNumber.classList.remove('visible');
                        targetsSet.drawNumber(containerForDoubleNumber, 'D');
                    }
                    removingScoreClass();
                }, 400) //historia gry wraz z działającym przyciskiem, a potem jeszcze instruckje i przycisk ze znakiem zapytania i jeszcze favicon!!!:)))
            } else if(practice.points < 100) {
                containerForBullNumber.classList.remove('visible');
                containerForDoubleNumber.classList.remove('visible');
                targetsSet.dartsInRound = 0;
                targetsSet.drawNumber(containerForTripleNumber, 'T');
                removingScoreClass();
            }
            temporaryCounter.textContent = practice.points;//temporary counter - for tests
        }
    })
});

pauseButton.addEventListener('click', () => {
    practice.pauseTimer();
    startButton.disabled = false;
    pauseButton.disabled = true;
    greenButtons.forEach(element => {
        element.disabled = true;
    })
})

resetButton.addEventListener('click', () => {
    reset();
    removingScoreClass();
})

modalReset.addEventListener('click', () => {
    reset();
    removingScoreClass();
    containerForTripleNumber.classList.remove('visible');
    modalContainer.classList.remove('visible');
})

if(practice.endGame === true) {
    modalContainer.classList.add('visible');
}