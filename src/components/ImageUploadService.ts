import ImageUpload from './ImageUpload';
import EventBus from '../lib/EventBus';

export default class ImageUploadService {
    private readonly form: HTMLFormElement;
    private itemsContainer: HTMLElement;

    constructor(form: HTMLFormElement) {
        this.form = form;
        this.itemsContainer = this.form.querySelector('.js-items');

        this.init();
    }

    private init() {
        this.appendUploadComponent();
        this.setFormSubmitHandler();
    }

    private appendUploadComponent(): void {
        const imageUploadComponent = new ImageUpload();

        this.setComponentUpdateHandler(imageUploadComponent);
        this.setComponentCloseHandler(imageUploadComponent);

        this.itemsContainer.appendChild(imageUploadComponent.template);
    }

    private removeUploadComponent(component: ImageUpload): void {
        this.itemsContainer.removeChild(component.template);
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

    private setFormSubmitHandler(): void {
        this.form.onsubmit = (event) => {
            event.preventDefault();

            this.uploadImages(new FormData(this.form));
        }
    }

    private async uploadImages(formData: FormData): Promise<void> {
        const response = await fetch("http://localhost/coursework_php/backend/index.php", {
            method: "POST",
            body: formData
        }).then(res => res.json());

        console.log(response);
    }
}