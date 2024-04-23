import { createApp } from 'vue';
import App from './App.vue';
import bigScreenFit from '../dist/esm/js';

const app = createApp(App);

app.use(bigScreenFit, {
    compress: false, // 不压缩
});
app.mount('#emp-root');