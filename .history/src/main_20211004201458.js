import Practice from './practice.js';
import Target from './setTargets.js';
import Help from './help.js';
import {getElement, getElements} from './helpers.js';
import * from './constans';

const greenButtons = getElements(GREEN_BUTTONS_CLASS);
const timer = getElement(TIMER_CLASS);
const startButton = getElement(START_BUTTON_CLASS);
const pauseButton = getElement(PAUSE_BUTTON_CLASS);
const resetButton = getElement(RESET_BUTTON_CLASS);
const historyButton = getElement(HISTORY_BUTTON_CLASS);
const containerForBigNumber = getElement(CONTAINER_FOR_BIG_NUMBER_CLASS);
const containerForSmallNumber = getElement(CONTAINER_FOR_SMALL_NUMBER_CLASS);
const containerForDoubleNumber = getElement(CONTAINER_FOR_DOUBLE_NUMBER_CLASS);
const containerForBullNumber = getElement(CONTAINER_FOR_BULL_NUMBER_CLASS);
const containerForTripleNumber = getElement(CONTAINER_FOR_TRIPLE_NUMBER_CLASS);
const modalContainer = getElement(MODAL_CONTAINER_CLASS);
const historyModalContainer = getElement(HISTORY_MODAL_CONTAINER_CLASS);
const modalReset = getElement(MODAL_RESET_CLASS);
const historyResetButton = getElement(HISTORY_RESET_BUTTON_CLASS);
const resultsTable = getElement(RESULTS_TABLE_CLASS);
const hintContainer = getElement(HINT_CONTAINER_CLASS);
const helpButton = getElement(HELP_BUTTON_CLASS);
const nextButton = getElement(NEXT_BUTTON_CLASS);
const textHintContainer = getElement(TEXT_HINT_CONTAINER_CLASS);
const buttonsDiv = getElement(BUTTONS_DIV_CLASS );
const panelDiv = getElement(PANEL_DIV_CLASS);

const tableHeader = `<thead><tr><th>Data</th><th>Godzina</th><th>Ilość punktów</th></tr></thead>`;

const practice = new Practice();
const help = new Help();
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
    helpButton.disabled = false;
    practice.showNextTarget = false;
    timer.textContent = `${Math.floor(practice.practiceTime / 60)}:${practice.practiceTime % 60 > 9 ? practice.practiceTime % 60 : '0' + practice.practiceTime % 60}`; 
    containerForBigNumber.textContent = '';
}

function loadFromLocalStorage() {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem('sessions'));
    resultsTable.innerHTML = '';
    resultsTable.innerHTML = `<table>${tableHeader}<tbody></tbody></table>`;
    // resultsTable.insertAdjacentHTML('beforeend', tableHeader);
    const tBodyElement = resultsTable.querySelector('tbody');
    dataFromLocalStorage.forEach(session => {
        tBodyElement.insertAdjacentHTML('afterbegin', session);
    });
}

startButton.addEventListener('click', () => {
    removingScoreClass();
    practice.startTimer(timer, modalContainer);
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
                }, 400)
            } else if(practice.points < 100) {
                containerForBullNumber.classList.remove('visible');
                containerForDoubleNumber.classList.remove('visible');
                targetsSet.dartsInRound = 0;
                targetsSet.drawNumber(containerForTripleNumber, 'T');
                removingScoreClass();
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
    reset();
    removingScoreClass();
})

modalReset.addEventListener('click', () => {
    reset();
    removingScoreClass();
    containerForTripleNumber.classList.remove('visible');
    modalContainer.classList.remove('visible');
})

historyButton.addEventListener('click', () => {
    historyModalContainer.classList.add('visible');
    loadFromLocalStorage();
})

historyResetButton.addEventListener('click', () => {
    historyModalContainer.classList.remove('visible');
})

helpButton.addEventListener('click', () => {
    hintContainer.classList.add('visible');
    textHintContainer.insertAdjacentHTML('afterbegin', help.firstStep);
    helpButton.disabled = true;
    panelDiv.classList.add('disactive');
    buttonsDiv.classList.add('disactive');
})

nextButton.addEventListener('click', () => {
    textHintContainer.innerHTML = '';
    if(hintContainer.classList.contains('eleventh')) {
        helpButton.disabled = false;
        panelDiv.classList.remove('disactive');
        buttonsDiv.classList.remove('disactive');
        hintContainer.className = 'hint';
    } else if(hintContainer.classList.contains('tenth')) {
        hintContainer.classList.add('eleventh');
        textHintContainer.insertAdjacentHTML('afterbegin', help.eleventhStep);
        nextButton.textContent = 'zamknij';
    } else if(hintContainer.classList.contains('ninth')) {
        hintContainer.classList.add('tenth');
        textHintContainer.insertAdjacentHTML('afterbegin', help.tenthStep);
    } else if(hintContainer.classList.contains('eight')) {
        hintContainer.classList.add('ninth');
        textHintContainer.insertAdjacentHTML('afterbegin', help.ninthStep);
    } else if(hintContainer.classList.contains('seventh')) {
        hintContainer.classList.add('eight');
        textHintContainer.insertAdjacentHTML('afterbegin', help.eightStep);
    } else if(hintContainer.classList.contains('sixth')) {
        hintContainer.classList.add('seventh');
        textHintContainer.insertAdjacentHTML('afterbegin', help.seventhStep);
    } else if(hintContainer.classList.contains('fifth')) {
        hintContainer.classList.add('sixth');
        textHintContainer.insertAdjacentHTML('afterbegin', help.sixthStep);
    } else if(hintContainer.classList.contains('fourth')) {
        hintContainer.classList.add('fifth');
        textHintContainer.insertAdjacentHTML('afterbegin', help.fifthStep);
    } else if(hintContainer.classList.contains('third')) {
        hintContainer.classList.add('fourth');
        textHintContainer.insertAdjacentHTML('afterbegin', help.fourthStep);
    } else if(hintContainer.classList.contains('second')) {
            hintContainer.classList.add('third');
            textHintContainer.insertAdjacentHTML('afterbegin', help.thirdStep);
    } else if(!hintContainer.classList.contains('second')) {
        hintContainer.classList.add('second');
        textHintContainer.insertAdjacentHTML('afterbegin', help.secondStep);
    };
})

// dodać następne klasy - być może je sprawdzać w sensie czy są poprzednie i wtedy dodawać
// na końcu przywrócić diosable=false dla help buttona

if(practice.endGame === true) {
    modalContainer.classList.add('visible');
}