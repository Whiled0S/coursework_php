class EventBusAction {
  public callbacks: Array<() => void> = [];
}

let EventBus = {
  changeContentSize: new EventBusAction(),
  showMessage: new EventBusAction(),

  emit(actionName: string, ...args: Array<any>) {
    if (!this[actionName]) return;

    this[actionName].callbacks.map((callback: Function) => callback(...args));
  },

  subscribe(actionName: string, callback: Function) {
    this[actionName].callbacks.push(callback);
  }
};

export default EventBus;