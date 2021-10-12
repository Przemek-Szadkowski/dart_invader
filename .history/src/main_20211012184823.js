import Practice from './practice.js';
import Target from './setTargets.js';
import * as texts from './appTexts.js';
import {getElement, getElements, loadFromLocalStorageToTable, saveToLocalStorage } from './helpers.js';
import * as constants from './constants.js';

//elements
const greenButtons = getElements(constants.GREEN_BUTTONS_CLASS);
const timer = getElement(constants.TIMER_CLASS);
const startButton = getElement(constants.START_BUTTON_CLASS);
const pauseButton = getElement(constants.PAUSE_BUTTON_CLASS);
const resetButton = getElement(constants.RESET_BUTTON_CLASS);
const historyButton = getElement(constants.HISTORY_BUTTON_CLASS);
const containerForBigNumber = getElement(constants.CONTAINER_FOR_BIG_NUMBER_CLASS);
const containerForSmallNumber = getElement(constants.CONTAINER_FOR_SMALL_NUMBER_CLASS);
const containerForDoubleNumber = getElement(constants.CONTAINER_FOR_DOUBLE_NUMBER_CLASS);
const containerForBullNumber = getElement(constants.CONTAINER_FOR_BULL_NUMBER_CLASS);
const containerForTripleNumber = getElement(constants.CONTAINER_FOR_TRIPLE_NUMBER_CLASS);
const modalContainer = getElement(constants.MODAL_CONTAINER_CLASS);
const resumeField = getElement(constants.RESUME_FIELD_CLASS);
const historyModalContainer = getElement(constants.HISTORY_MODAL_CONTAINER_CLASS);
const modalReset = getElement(constants.MODAL_RESET_CLASS);
const historyResetButton = getElement(constants.HISTORY_RESET_BUTTON_CLASS);
const resultsTable = getElement(constants.RESULTS_TABLE_CLASS);
const hintContainer = getElement(constants.HINT_CONTAINER_CLASS);
const helpButton = getElement(constants.HELP_BUTTON_CLASS);
const nextButton = getElement(constants.NEXT_BUTTON_CLASS);
const textHintContainer = getElement(constants.TEXT_HINT_CONTAINER_CLASS);
const buttonsDiv = getElement(constants.BUTTONS_DIV_CLASS );
const panelDiv = getElement(constants.PANEL_DIV_CLASS);

const practice = new Practice();
let targetsSet = null;
let hintTexts = [];

timer.textContent = practice.resetTimer(); 

// a potem sprawdzić czy w listenerach wszystko gra ;)

startButton.addEventListener('click', () => {
    practice.removingScoreClass(greenButtons);
    practice.startTimer(timer, modalContainer, resumeField);
    startButton.disabled = true;
    historyButton.disabled = true;
    helpButton.disabled = true;
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
            }
        }

        //this part can be shorter!!!

        if(practice.showNextTarget && targetsSet.dartsInRound === 3) {
            if(practice.points < 30) {
                setTimeout(() => {
                    targetsSet.dartsInRound = 0;
                    targetsSet.drawNumber(containerForBigNumber);
                    practice.removingScoreClass(greenButtons);
                }, 400)
            } else if(practice.points < 50) {
                setTimeout(() => {
                    containerForBigNumber.classList.remove('visible');
                    targetsSet.dartsInRound = 0;
                    targetsSet.drawNumber(containerForSmallNumber);
                    practice.removingScoreClass(greenButtons);
                }, 400)
            } else if(practice.points < 80) {
                setTimeout(() => {
                    containerForSmallNumber.classList.remove('visible');
                    targetsSet.dartsInRound = 0;
                    const randomFlag = Math.floor(Math.random() * 12);
                    console.log(randomFlag)
                    if(randomFlag === 1 || randomFlag === 2) {//if 1 or 2 set Target to 50 or 25
                        targetsSet.drawNumber(containerForBullNumber, '', true);
                        containerForDoubleNumber.classList.remove('visible');
                    } else {
                        containerForBullNumber.classList.remove('visible');
                        targetsSet.drawNumber(containerForDoubleNumber, 'D');
                    }
                    practice.removingScoreClass(greenButtons);
                }, 400)
            } else if(practice.points < 100) {
                containerForBullNumber.classList.remove('visible');
                containerForDoubleNumber.classList.remove('visible');
                targetsSet.dartsInRound = 0;
                targetsSet.drawNumber(containerForTripleNumber, 'T');
                practice.removingScoreClass(greenButtons);
            }
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
    practice.reset(targetsSet, startButton, pauseButton, historyButton, helpButton, timer, containerForBigNumber);
    practice.removingScoreClass(greenButtons);
})

modalReset.addEventListener('click', () => {
    practice.reset(targetsSet, startButton, pauseButton, historyButton, helpButton, timer, containerForBigNumber);
    practice.removingScoreClass(greenButtons);
    containerForTripleNumber.classList.remove('visible');
    modalContainer.classList.remove('visible');
    resumeField.textContent = '';
})

historyButton.addEventListener('click', () => {
    historyModalContainer.classList.add('visible');
    loadFromLocalStorageToTable(resultsTable);
})

historyResetButton.addEventListener('click', () => {
    historyModalContainer.classList.remove('visible');
})

helpButton.addEventListener('click', () => {
    hintContainer.classList.add('visible');
    textHintContainer.insertAdjacentHTML('afterbegin', texts.hints[0].text);
    helpButton.disabled = true;
    panelDiv.classList.add('disactive');
    buttonsDiv.classList.add('disactive');
    hintTexts = [...texts.hints];
    hintTexts.shift();
})

nextButton.addEventListener('click', () => {
    textHintContainer.innerHTML = '';
    hintTexts.length === 1 ? nextButton.textContent = 'zamknij' : nextButton.textContent = 'dalej';
    if(!hintTexts.length) {
        helpButton.disabled = false;
        panelDiv.classList.remove('disactive');
        buttonsDiv.classList.remove('disactive');
        hintContainer.className = 'hint';
        hintTexts = [...texts.hints];
        return;
    }
    hintContainer.classList.add(hintTexts[0].name);
    textHintContainer.insertAdjacentHTML('afterbegin', hintTexts[0].text);
    hintTexts.shift(); //delete first hint from array
});

if(practice.endGame === true) {
    modalContainer.classList.add('visible');
}