export class Helpers {
    getElement(className) {
        const element = document.querySelector(className);

        if(!element) throw new Error(`Element not found! Element class name: ${className}`);

        return element;
    };
    getElements(className) {

    });
}