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
    this.setContentScrollHandler();
  }

  private setContentScrollHandler(): void {
    const wrapperHeight = this.wrapper.offsetHeight;
    const pageHeight = this.page.offsetHeight;
    const heightDiff = wrapperHeight - pageHeight;

    if (heightDiff <= 0) return;

    this.content.onscroll = () => {
      console.log(this.content.scrollTop);
      this.scrollbar.style.transform = 
        `translateY(${-100 + this.content.scrollTop / heightDiff * 100}%)`;
    }
  }
}