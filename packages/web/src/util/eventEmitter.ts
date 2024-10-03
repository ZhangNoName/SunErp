class EventEmitter {
  private events = new Map<string, Function[]>();

  on(event: string, callback: Function) {
    const listeners = this.events.get(event) || [];
    listeners.push(callback);
    this.events.set(event, listeners);
  }

  emit(event: string, ...args: any[]) {
    const listeners = this.events.get(event);
    if (listeners) {
      listeners.slice().forEach((listener) => listener(...args));
    }
  }

  off(event: string, callback?: Function) {
    const listeners = this.events.get(event);
    if (listeners) {
      if (callback) {
        this.events.set(
          event,
          listeners.filter((l) => l !== callback)
        );
      } else {
        this.events.delete(event);
      }
    }
  }

  once(event: string, callback: Function) {
    const onceListener = (...args: any[]) => {
      callback(...args);
      this.off(event, onceListener);
    };
    this.on(event, onceListener);
  }
}

const EventBus = new EventEmitter();
export default EventBus;
