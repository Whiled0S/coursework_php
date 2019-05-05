import ImageUpload from './ImageUpload';
import ImageResponse from '../classes/ImageResponse';
import EventBus from '../lib/EventBus';
import {arrayFromHTMLCollection} from "../lib/common";

export default class ImageUploadService {
    private readonly form: HTMLFormElement;
    private itemsContainer: HTMLElement;

    private text = {
        success: 'Изображения успешно загружены',
        empty: 'Загрузите изображения',
        error: 'Не удалось загрузить изображения',
        incorrect: 'Неверный формат изображения',
        small: 'Слишком маленький размер изображения',
        corrupted: 'Файл поврежден'
    };

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
        this.form.onsubmit = async (event) => {
            event.preventDefault();

            const response = await ImageUploadService.uploadImages(new FormData(this.form));

            if (response.success) {
                this.resetForm();
                EventBus.emit('showMessage', 'success', this.text.success);
            } else if (response.empty)
                EventBus.emit('showMessage', 'info', this.text.empty);
            else if (response.incorrect)
                EventBus.emit('showMessage', 'danger', this.text.incorrect);
            else if (response.corrupted)
                EventBus.emit('showMessage', 'danger', this.text.corrupted);
            else if (response.small)
                EventBus.emit('showMessage', 'danger', this.text.small);
            else
                EventBus.emit('showMessage', 'danger', this.text.error);
        }
    }

    private static async uploadImages(formData: FormData): Promise<ImageResponse> {
        return fetch("http://localhost/coursework_php/backend/index.php", {
            method: "POST",
            body: formData
        }).then(res => res.json());
    }

    private resetForm(): void {
        const activeElements = this.itemsContainer.getElementsByClassName('active');
        arrayFromHTMLCollection(activeElements).map(element => element.remove());
    }
}