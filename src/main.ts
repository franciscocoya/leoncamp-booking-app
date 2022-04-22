import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { SetupCalendar, DatePicker } from 'v-calendar';
import InstantSearch from 'vue-instantsearch/vue3/es';

import "@/assets/scss/main.scss";
import 'v-calendar/dist/style.css';

const app = createApp(App)

app.use(router).use(SetupCalendar).use(DatePicker).use(InstantSearch);

app.mount('#app');
