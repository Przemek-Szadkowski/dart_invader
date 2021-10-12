import { Common } from "./common.js";

const TIMER_SELECTOR = '.timer';

class mainScreen extends Common {
    constructor() {
        super();
        this.bindElements();
    }

    bindElements() {
        const timer = this.bindToElement(TIMER_SELECTOR);
        console.log(timer);
    }
}

const newScreen = new mainScreen();