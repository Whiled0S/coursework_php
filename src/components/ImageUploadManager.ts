import ImageUpload from './ImageUpload';
import EventBus from '../lib/EventBus';

export default class ImageUploadManager {
  private form: HTMLFormElement;

  constructor(form: HTMLFormElement) {
    this.form = form;

    this.init();
  }

  private init() {
    this.appendUploadComponent();
  }

  private appendUploadComponent(): void {
    const imageUploadComponent = new ImageUpload();

    this.setComponentUpdateHandler(imageUploadComponent);
    this.setComponentCloseHandler(imageUploadComponent);

    this.form.appendChild(imageUploadComponent.template);
  }

  private removeUploadComponent(component: ImageUpload): void {
    this.form.removeChild(component.template);
  }

  private setComponentUpdateHandler(component: ImageUpload): void {
    component.onUpdate = async () => {
      if (!component.template.classList.contains('active')) {
        await this.appendUploadComponent();
        EventBus.emit('changeContentSize');
      }
    }
  }

  private setComponentCloseHandler(component: ImageUpload): void {
    component.onClose = async () => {
      await this.removeUploadComponent(component);
      EventBus.emit('changeContentSize');
    };
  }
}