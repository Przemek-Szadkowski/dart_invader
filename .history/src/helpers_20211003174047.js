class Helpers {
    getElement(className) {
        const element = document.querySelector(className);

        if(!element) throw new Error(`Element not found! Element class name: ${className}`);

        return element;
    };
    getElements(className) {
        const elements = document.querySelectorAll(className);

        if(!elements) throw new Error(`Elements not found! Elements class name: ${className}`);

        return elements;
    };
}

export default Helpers;