import $ from 'zepto';

class eventEmitter {
    constructor() {
        this.eventMonitor = $('<div>');
    }
    addListener(event, listener) {
        this.eventMonitor.on(event, listener);
        return this;
    }
    removeListener(event) {
        this.eventMonitor.off(event);
        return this;
    }
    emit(event, ...args) {
        this.eventMonitor.trigger(event, ...args);
        return this;
    }
    on(...args) {
        return this.addListener(...args);
    }
    off(...args) {
        return this.removeListener(...args);
    }
    once(event, listener) {
        this.eventMonitor.once(event, listener);
        return this;
    }
}

export default eventEmitter;
