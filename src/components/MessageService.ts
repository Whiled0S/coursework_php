import EventBus from '../lib/EventBus';
import Message from './Message';

export default class MessageService {
    messageBlock: HTMLElement;

    constructor(messageBlock: HTMLElement) {
        this.messageBlock = messageBlock;

        this.init();
    }

    private init(): void {
        this.setShowMessageListener();
    }

    private addMessage(template: HTMLElement): void {
        this.messageBlock.prepend(template);
    }

    private removeMessage(template: HTMLElement): void {
        template.addEventListener('animationend', () => {
            if (template.classList.contains('hidden'))
                template.remove();
        });

        template.classList.add('hidden');
    }

    private setShowMessageListener(): void {
        EventBus.subscribe('showMessage', async (type: string, text: string) => {
            const message: Message = new Message(type, text);

            this.addMessage(message.template);

            setTimeout(() => {
                this.removeMessage(message.template);
            }, 3000);
        });
    }
}