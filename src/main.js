require('./common/style/style.css');

// ES6 class test
import {eventEmitter} from './common/event/eventEmitter.js';
let emitter = new eventEmitter();
console.log(emitter);

// zepto based test
// import eventEmitter from './common/event/eventEmitterBasedOnZepto.js';
// let emitter = new eventEmitter;

// node event test
// let eventEmitter = require('./common/event/node-eventEmitter.js');
// let emitter = new eventEmitter;
// // console.log(eventEmitter);
// // console.log(emitter);

// console.log(eventEmitter);
const f1Ele = document.querySelector('#w-favor1');
const f1TextEle = document.querySelector('.w-txt1');
const f2Ele = document.querySelector('#w-favor2');
const f2TextEle = document.querySelector('.w-txt2');

f1Ele.addEventListener('mouseover', function (e) {
    this.style.backgroundImage = '';
    f1TextEle.style.display = 'block';
})

f1Ele.addEventListener('mouseout', function (e) {
    this.style.backgroundImage = '';
    f1TextEle.style.display = 'none';
})

f1Ele.addEventListener('click', function (e) {
    let btnText = f1TextEle.innerHTML;
    emitter.emit('favedBy1');
    if (btnText === '收藏') {
        f1TextEle.innerHTML = '已收藏';
        // emitter.emit('favedBy1');
    }
    else {
        return;
    }
})

f2Ele.addEventListener('mouseover', function (e) {
    this.style.backgroundImage = '';
    f2TextEle.style.display = 'block';
})

f2Ele.addEventListener('mouseout', function (e) {
    this.style.backgroundImage = '';
    f2TextEle.style.display = 'none';
})

f2Ele.addEventListener('click', function (e) {
    let btnText = f2TextEle.innerHTML;
    emitter.emit('favedBy2');
    if (btnText === '收藏') {
        f2TextEle.innerHTML = '已收藏';
        // emitter.emit('favedBy2');
    }
    else {
        return;
    }
})



emitter.once('favedBy1', function () {
    f2TextEle.innerHTML = '已收藏';
})
emitter.once('favedBy1', function () {
    console.log('favedBy1 emitted');
})
emitter.once('favedBy2', function t () {
    f1TextEle.innerHTML = '已收藏';
})

emitter.offAll();
// var eventArray = emitter.listeners('favedBy1');
// console.log(eventArray);

