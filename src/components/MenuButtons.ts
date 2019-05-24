import { arrayFromHTMLCollection } from '../lib/common';

export default class MenuButtons {
  menuButtons: HTMLElement;
  border: HTMLElement;
  buttons: HTMLCollectionOf<Element>;
  activeButton: Element;
  callback: Function; 

  constructor(menuButtons: HTMLElement, callback?: (index: Number) => void) {
    this.menuButtons = menuButtons;
    this.buttons = menuButtons.getElementsByClassName('js-menu-button');
    this.border = menuButtons.querySelector('.js-border');
    this.activeButton = menuButtons.querySelector('.active');
    this.callback = callback || function(): void {};

    this.init();
  }

  private init(): void {
    this.updateBorder();
    this.setButtonsClickHandler();
  }

  private updateBorder(): void {
    const activeButtonOffsetLeft: Number = this.getButtonOffsetLeft(this.activeButton);
    const activeButtonWidth: Number = this.activeButton.clientWidth;

    this.border.style.width = `${activeButtonWidth}px`;
    this.border.style.transform = `translateX(${activeButtonOffsetLeft}px)`;

    const activeIndex: Number = arrayFromHTMLCollection(this.buttons).indexOf(this.activeButton);
    this.callback(activeIndex);
  }

  private setActiveButton(button: Element):void {
    this.activeButton = button;
    button.classList.add('active');
  }

  private getButtonOffsetLeft(button: Element): Number {
    return button.getBoundingClientRect().left - this.menuButtons.getBoundingClientRect().left;
  }

  private setButtonsClickHandler(): void {
    this.menuButtons.onclick = (event: Event) => {
      const target: Element = event.target as Element;
      const button: Element = target.closest('button');

      if (!button || button === this.activeButton) return;

      this.activeButton.classList.remove('active');
      this.setActiveButton(button);
      this.updateBorder();
    }
  }
}
