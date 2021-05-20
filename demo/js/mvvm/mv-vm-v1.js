import Vue from './Vue.js';

console.log("enter mv-vm-v1.js");

let vueDemo = new Vue({
    el: 'mvvm',
    data: {
        text: 'HelloWorld',
        no_change: '123'
    }
})

console.log('vueDemo', vueDemo)