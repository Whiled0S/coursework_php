import EventBus from '../lib/EventBus';

export default class Page {
  private page: HTMLElement;
  private scrollbar: HTMLElement;
  private content: HTMLElement;
  private wrapper: HTMLElement;

  constructor(page: Element) {
    this.page = page as HTMLElement;
    this.scrollbar = this.page.querySelector('.scrollbar');
    this.content = this.page.querySelector('.content');
    this.wrapper = this.page.querySelector('.wrapper');

    this.init();
  }

  private init() {
    this.initScroll();
    this.subscribeContentAppendAction();
  }

  private initScroll(): void {
    const pageHeight = this.page.offsetHeight;
    const wrapperHeight = this.wrapper.offsetHeight;
    const heightDiff = wrapperHeight - pageHeight;

    if (heightDiff <= 0)
      this.scrollbar.style.transform = 'translateY(-101%)';
    else {
      this.scrollbar.style.transform =
        `translateY(${-100 + this.content.scrollTop / heightDiff * 100}%)`;

      this.content.onscroll = () => {
        this.scrollbar.style.transform =
          `translateY(${-100 + this.content.scrollTop / heightDiff * 100}%)`;
      }
    }
  }

  private subscribeContentAppendAction(): void {
    EventBus.subscribe('changeContentSize', this.initScroll.bind(this));
  }
}