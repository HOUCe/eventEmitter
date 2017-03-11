/**
* 构造一个新的Emitter实例，并返回
* @使用举例
* var Emitter = require('emitter');
* var emitter = new Emitter();
*/

class eventEmitter {

    /**
    * 对一个指定事件向该事件的collection中添加一个监听函数
    * @function参数解释
    * @param {String} event - 想要添加的事件名称，字符串类型
    * @param {Function} listener - 要添加的监听函数，函数类型
    * @returns {Object} 返回Emitter实例
    * @使用举例
    * emitter.on('foo', listener);
    */
    on(event, listener) {
        // 使用现有的collection，如果不存在，则创建
        this.eventCollection = this.eventCollection || {};
        this.eventCollection[event] = this.eventCollection[event] || [];

        // 讲给定的监听函数push进入指定事件的collection
        this.eventCollection[event].push(listener);

        return this;
    }

    /**
    * 使用on方法，并劫持listener参数，注意this漂移问题.
    * @function参数解释
    * @param {String} event - 想要添加的事件名称，字符串类型
    * @param {Function} listener - 要添加的监听函数，函数类型
    * @returns {Object} 返回Emitter实例
    * @使用举例
    * emitter.once('foo', listener);
    */
    once(event, listener) {
        // 使用箭头函数绑定this
        // const fn => {
        //     this.off(event, fn);
        //     listener.apply(this, arguments);
        // }

        const self = this;
        function fn () {
            self.off(event, fn);
            listener.apply(this, arguments);
        }

        fn.listener = listener;

        this.on(event, fn);

        return this;
    }

    /**
     * 对指定的事件在其collection之中删除一个监听函数
     * @function
     * @param {String} event - 想要删除的事件名称，字符串类型
     * @param {Function} listener - 要删除的监听函数，函数类型
     * @returns {Object} 返回Emitter实例
     * @example
     * emitter.off('foo', listener);
     */
    off(event, listener) {

        // 指定事件的监听函数数组
        let listeners;

        // 指定的事件的collection不存在，则直接返回实例
        if (!this.eventCollection || !(listeners = this.eventCollection[event])) {
            return this;
        }

        listeners.forEach((fn, i) => {
            if (fn === listener || fn.listener === listener) {
                // 删除监听函数
                listeners.splice(i, 1);
            }
        });

        // 如果删除指定监听函数后该指定事件的监听函数数组为空，则删除此collection
        if (listeners.length === 0) {
            delete this.eventCollection[event];
        }

        return this;
    }

    /**
     * 按照存储顺序，依次执行指定事件的监听函数
     * @function
     * @param {String} event - 想要触发的事件名称，字符串类型
     * @param {...Object} data - 想要传递给监听函数的数据
     * @returns {Object} Returns an instance of Emitter.
     * @example
     * // Emits the "foo" event with 'param1' and 'param2' as arguments.
     * emitter.emit('foo', 'param1', 'param2');
     */
    emit(event, ...args) {

        // 指定事件的监听函数数组
        let listeners;

        // 指定的事件的collection不存在，则直接返回实例
        if (!this.eventCollection || !(listeners = this.eventCollection[event])) {
            return this;
        }

        // 克隆监听函数群
        listeners = listeners.slice(0);

        listeners.forEach(fn => fn.apply(this, args));

        return this;
    }

}
/**
* Exports Emitter
*/
export default eventEmitter;


