import Practice from './practice.js';

const greenButtons = document.querySelectorAll('.dart');
const timer = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset_button');

const practice = new Practice();


greenButtons.forEach(element => {
    element.addEventListener('click', (e) => {
        
        // add score class to darts button - START
        let greenButton;
        let redButton;

        const sameClassButtons = document.querySelectorAll(`.${e.target.classList[0]}`); // finding the same class button and prevent adding score class to two buttons from group
        sameClassButtons.forEach(el => {
            el.classList.remove('score');
            if(el.classList.contains('green')) {
                greenButton = el;
                console.log(greenButton)
            }
            if(el.classList.contains('red')) {
                redButton = el;
                console.log(redButton);
            }
        })
        element.classList.add('score');

        // add score class to darts button - END

        // this block allow to change mark green button to red button and subtracts point during this change
        if(practice.practiceTimer) { //add points only if game was started
            if(e.target.classList.contains('green')) {
                practice.addPoint();
                greenButton.disabled = true;
                redButton.disabled = false;
                console.log(practice.points);
            } else {
                // if green button was checked in the same round, red buttton substracts point from practice.points
                if(greenButton.disabled === true) {
                    practice.subtractPoint();
                    console.log(practice.points);
                }
                redButton.disabled = true;
                greenButton.disabled = false;
                console.log(practice.points);
            }
        }
    })
});

function removingScoreClass() {
    greenButtons.forEach(element => {
        element.classList.remove('score');
        element.disabled = false;
    })
}

startButton.addEventListener('click', () => {
    practice.isTimerPaused = false;
    practice.startTimer(timer);
    removingScoreClass();
    startButton.disabled = true;
    setTimeout(() => {
        pauseButton.disabled = false;
    }, 1000);
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
    practice.resetPractice();
    startButton.disabled = false;
    pauseButton.disabled = false;
    timer.innerHTML = '30:00';
    removingScoreClass();
})