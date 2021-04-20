import Practice from './practice.js';

const green_buttons = document.querySelectorAll('.dart');
const timer = document.getElementById('timer');
const start_button = document.getElementById('start');
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


const practice = new Practice();

start_button.addEventListener('click', () => {
    practice.startTimer(timer);
    start_button.disabled = true;
});
