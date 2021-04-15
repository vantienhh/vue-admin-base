import { config } from 'dotenv';
import { createApp } from 'vue';

import './plugins/vee-validate';

import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './plugins/vue-i18n';
import axios from './plugins/axios';

config();
const app = createApp(App);

app.use(store).use(router).use(i18n).use(axios);
app.mount('#app');
