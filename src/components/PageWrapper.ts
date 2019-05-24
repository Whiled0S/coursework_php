import Page from "./Page";
import {arrayFromHTMLCollection} from "../lib/common";

export default class PageWrapper {
  private wrapper: HTMLElement;
  private pages: HTMLCollectionOf<Element>;
  private activePage: Element;

  constructor(wrapper: HTMLElement) {
    this.wrapper = wrapper;
    this.pages = this.wrapper.getElementsByClassName('page');
    this.activePage = this.wrapper.querySelector('.active');

    this.init();
  }

  private init() {
    arrayFromHTMLCollection(this.pages).map(page => new Page(page));
  }

  private setActivePage(page: Element) {
    this.activePage.classList.remove('active');
    page.classList.add('active');
    this.activePage = page;
  }

  public showPage(index: number): void {
    this.setActivePage(this.pages.item(index));
    this.wrapper.style.transform = `translateX(${-index / this.pages.length * 100}%)`;
  }
}