import '../lib/common';
import { arrayFromHTMLCollection } from '../lib/common';

export default class MenuButtons {
  menuButtons: HTMLElement;
  border: HTMLElement;
  buttons: HTMLCollectionOf<Element>;

  constructor(menuButtons: HTMLElement) {
    this.menuButtons = menuButtons;
    this.buttons = menuButtons.getElementsByClassName('js-menu-button');
    this.border = menuButtons.querySelector('.js-border');

    this.init();
  }

  private init(): void {
    this.updateBorder();
    this.setButtonsClickHandler();
  }

  private updateBorder(): void {
    const activeButton: Element = this.getActiveButton();
    const activeButtonOffsetLeft = this.getButtonOffsetLeft(activeButton);
    const activeButtonWidth = activeButton.clientWidth;

    this.border.style.width = `${activeButtonWidth}px`;
    this.border.style.transform = `translateX(${activeButtonOffsetLeft}px)`;
  }

  private getActiveButton(): Element {
    return arrayFromHTMLCollection(this.buttons).find(button =>
      button.classList.contains('active')
    );
  }

  private setActiveButton(button: Element):void {
    button.classList.add('active');
  }

  private getButtonOffsetLeft(button: Element): Number {
    return button.getBoundingClientRect().left - this.menuButtons.getBoundingClientRect().left;
  }

  private setButtonsClickHandler(): void {
    this.menuButtons.onclick = (event: Event) => {
      const target = event.target as Element;
      const button = target.closest('button');

      if (!button) return;

      this.getActiveButton().classList.remove('active');
      this.setActiveButton(button);
      this.updateBorder();
    }
  }
}
