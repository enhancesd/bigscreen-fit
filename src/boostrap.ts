import Vue from 'vue';
import App from './App.vue';
import bigsDirective from '@bigscreen-fit/directive';

Vue.use(bigsDirective, {
    compress: false, // 不压缩
});
new Vue({
    render: (h) => h(App),
}).$mount('#emp-root')