import messageTemplate from '../templates/message.html';
import {parseStringToHtml} from '../lib/common';

export default class Message {
    template: HTMLElement;
    wrapperElement: HTMLElement;
    textElement: HTMLSpanElement;

    type: string;
    text: string;

    constructor(type: string, text: string) {
        this.template = parseStringToHtml(messageTemplate);
        this.wrapperElement = this.template.querySelector('.message__wrapper');
        this.textElement = this.template.querySelector('.message__text');

        this.type = type;
        this.text = text;

        this.init();
    }

    private init(): void {
        this.initTemplate();
    }

    private initTemplate(): void {
        this.wrapperElement.classList.add(this.type);
        this.textElement.innerText = this.text;
    }
}