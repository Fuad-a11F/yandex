class EventBus<E extends string> {
  listeners: { [key in E]?: Function[] } = {};

  on<F>(event: E, callback: F) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]?.push(callback);
  }

  off<F>(event: E, callback: F) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    this.listeners[event] = this.listeners[event]!.filter(
      (listener) => listener !== callback,
    );
  }

  emit<F>(event: E, ...args: F) {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event]!.forEach(function (listener) {
      // @ts-ignore
      listener(...args);
    });
  }
}

export default EventBus;
