import fileUploadTemplate from '../templates/file-upload.html';
import {parseStringToHtml} from '../lib/common';

export default class ImageUpload {
  public template: HTMLElement;

  private input: HTMLInputElement;
  private label: HTMLLabelElement;
  private image: HTMLImageElement;
  private overlay: HTMLElement;

  constructor() {
    this.template = parseStringToHtml(fileUploadTemplate);
    this.input = this.template.querySelector('input');
    this.label = this.template.querySelector('label');
    this.image = this.template.querySelector('img');
    this.overlay = this.template.querySelector('.js-overlay');

    this.init();
  }

  private init(): void {
    this.setUploadHandler();
    this.setOverlayClickHandler();
  }

  private setUploadHandler(): void {
    this.input.onchange = () => {
      this.setBackground();
      this.onUpdate();
      this.markAsActive();
    }
  }

  private setBackground(): void {
    if (!this.input.files || !this.input.files[0]) return;

    const fileReader = new FileReader();

    fileReader.onload = () =>
      this.image.src = fileReader.result.toString();
    fileReader.readAsDataURL(this.input.files[0]);
  }

  private markAsActive(): void {
    this.template.classList.add('active');
  }

  private setOverlayClickHandler(): void {
    this.overlay.onclick = (event) => {
      const clickedElement: HTMLElement = <HTMLElement>event.target;
      const elementClassList = clickedElement.classList;

      if (elementClassList.contains('refresh') || elementClassList.contains('upload')) return;

      event.preventDefault();

      if (elementClassList.contains('remove')) this.onClose();
    }
  }

  public onClose() {}
  public onUpdate() {}
}