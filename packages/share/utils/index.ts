// 引入Vue
import Vue from 'vue';
 
// 检查Vue的版本号
export const isVue2 = /^2/.test(Vue.version);
export const isVue3 = /^3/.test(Vue.version);