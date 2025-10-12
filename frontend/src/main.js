import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import Toast from 'vue-toastification';

import 'vue-toastification/dist/index.css';
import './styles/index.css';
import './styles/global.css';
import './styles/swiper.css';

const app = createApp(App);

app
  .use(createPinia())
  .use(router)
  .use(Toast, {
    transition: 'Vue-Toastification__bounce',
    maxToasts: 20,
    newestOnTop: true,
  })
  .mount('#app');