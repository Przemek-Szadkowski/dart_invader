const green_buttons = document.querySelectorAll('.dart');

green_buttons.forEach(element => {
    element.addEventListener('click', () => {
        element.classList.add('score');
    })
});