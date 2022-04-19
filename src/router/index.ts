import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home/HomeView.vue';
import AccountView from '../views/Account/AccountView.vue';
import SavedAccomodationsView from '../views/SavedAccomodations/SavedAccomodationsView.vue';
import BookingsView from '../views/Bookings/BookingsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/saved',
      name: 'saved',
      component: SavedAccomodationsView
    },
    {
      path: '/bookings',
      name: 'bookings',
      component: BookingsView
    },
    {
      path: '/account/:username',
      name: 'account',
      component: AccountView
    },
  ]
})

export default router
