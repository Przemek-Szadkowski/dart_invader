export class Common {
    constructor(elementSelector) {
        this.element = this.bindToElement(elementSelector);
    }

    bindToElement(elementToFind) {
        console.log(elementToFind);
        const element = document.querySelector(elementToFind);

        if(!element) throw new Error(`Element not found! Selector: ${elementToFind}`);

        return element;
    }
}