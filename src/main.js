import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import 'vant/lib/index.css';
import './assets/css/main.css';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');

export default app;
