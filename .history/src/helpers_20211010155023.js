import { tableHeader } from "./appTexts.js";

export const getElement = (className) => {
    const element = document.querySelector(className);

    if(!element) throw new Error(`Element not found! Element class name: ${className}`);

    return element;
};
export const getElements = (className) => {
    const elements = document.querySelectorAll(className);

    if(!elements) throw new Error(`Elements not found! Elements class name: ${className}`);

    return elements;
};

export function loadFromLocalStorageToTable(table) {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem('sessions'));
    table.innerHTML = '';
    table.innerHTML = `<table>${tableHeader}<tbody></tbody></table>`;
    const tBodyElement = table.querySelector('tbody');
    if(dataFromLocalStorage) {
        dataFromLocalStorage.forEach(session => {
            tBodyElement.insertAdjacentHTML('afterbegin', session);
        });
    };
}

export function saveToLocalStorage() {
    let previousSessionsFromLocalStorage = JSON.parse(localStorage.getItem('sessions'));

    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const hour = today.getHours();
    const minutes = today.getMinutes();

    const session = `<tr><td>${day}/${month}/${year}</td><td>${hour}:${minutes > 10 ? minutes : '0' + minutes}</td><td>${this.points}</td></tr>`

    if(previousSessionsFromLocalStorage === null) previousSessionsFromLocalStorage = [];
    previousSessionsFromLocalStorage.push(session);

    localStorage.setItem('sessions', JSON.stringify(previousSessionsFromLocalStorage));
}