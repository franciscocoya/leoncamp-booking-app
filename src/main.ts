import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { SetupCalendar, Calendar, DatePicker } from 'v-calendar';


import "@/assets/scss/main.scss";
import 'v-calendar/dist/style.css';

const app = createApp(App)

app.use(router).use(SetupCalendar).use(DatePicker);

app.mount('#app')
