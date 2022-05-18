import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import i18n from './i18n';

import { SetupCalendar, DatePicker } from 'v-calendar';
import InstantSearch from 'vue-instantsearch/vue3/es';

import "@/assets/scss/main.scss";
import 'v-calendar/dist/style.css';

const app = createApp(App)

app.use(router);
app.use(i18n);
app.use(createPinia());
app.use(SetupCalendar);
app.use(DatePicker);
app.use(InstantSearch);

app.mount('#app');

i18n.global.locale = 'en';
