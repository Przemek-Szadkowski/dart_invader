import Practice from './practice.js';

const green_buttons = document.querySelectorAll('.dart');
const timer = document.getElementById('timer');
// add score class to darts button

green_buttons.forEach(element => {
    element.addEventListener('click', (e) => {
        const sameClassButtons = document.querySelectorAll(`.${e.target.classList[0]}`); // finding the same class button and prevent adding score class to two buttons from group
        sameClassButtons.forEach(el => {
            el.classList.remove('score');
        })
        element.classList.add('score');
    })
});

// timer

const practice = new Practice();
practice.startTimer();
