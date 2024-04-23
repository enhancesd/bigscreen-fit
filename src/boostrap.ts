import Vue from 'vue';
import App from './App.vue';
import bigScreenFit from '../dist/esm/js';

Vue.use(bigScreenFit, {
    compress: false, // 不压缩
});

new Vue({
    render: (h) => h(App),
}).$mount('#emp-root')