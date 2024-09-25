class EventBus<E extends string> {
  listeners: { [key in E]?: ((...args: unknown[]) => void)[] } = {};

  on<F>(event: E, callback: F) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]?.push(callback as () => void);
  }

  off<F>(event: E, callback: F) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    this.listeners[event] = this.listeners[event]!.filter(
      (listener) => listener !== callback,
    );
  }

  emit<F>(event: E, ...args: F[]) {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event]!.forEach(function (listener) {
      listener(...args);
    });
  }

  destroy() {
    this.listeners = {};
  }
}

export default EventBus;
