export default {
  changeContentSize: {
    callbacks: []
  },

  emit(actionName: string) {
    this[actionName].callbacks.map((callback: Function) => callback());
  },

  subscribe(actionName: string, callback: Function) {
    this[actionName].callbacks.push(callback);
  }
}