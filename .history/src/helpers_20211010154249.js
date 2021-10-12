import { tableHeader } from "./appTexts"; texts from './appTexts.js';

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