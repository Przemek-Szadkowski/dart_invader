import Practice from './practice.js';

const greenButtons = document.querySelectorAll('.dart');
const timer = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset_button');

const practice = new Practice();

// add score class to darts button - START

greenButtons.forEach(element => {
    element.addEventListener('click', (e) => {
        const sameClassButtons = document.querySelectorAll(`.${e.target.classList[0]}`); // finding the same class button and prevent adding score class to two buttons from group
        sameClassButtons.forEach(el => {
            el.classList.remove('score');
        })
        element.classList.add('score');
    })
});

// add score class to darts button - END

startButton.addEventListener('click', () => {
    practice.isTimerPaused = false;
    practice.startTimer(timer);
    startButton.disabled = true;
    setTimeout(() => {
        pauseButton.disabled = false;
    }, 1000);
});

pauseButton.addEventListener('click', () => {
    practice.pauseTimer();
    startButton.disabled = false;
    pauseButton.disabled = true;
})

resetButton.addEventListener('click', () => {
    practice.resetPractice();
    startButton.disabled = false;
    pauseButton.disabled = false;
    timer.innerHTML = '30:00';
})
