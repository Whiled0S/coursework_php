export default class PageWrapper {
  private wrapper: HTMLElement;
  private pages: HTMLCollectionOf<Element>;
  private activePage: Element;

  constructor(wrapper: HTMLElement) {
    this.wrapper = wrapper;
    this.pages = this.wrapper.getElementsByClassName('page');
    this.activePage = this.wrapper.querySelector('.active');
  }

  public showPage(index: number): void {
    this.setActivePage(this.pages.item(index));
    this.wrapper.style.transform = `translateX(${-index / this.pages.length * 100}%)`;
  }

  private setActivePage(page: Element) {
    this.activePage.classList.remove('active');
    page.classList.add('active');
    this.activePage = page;
  }
}