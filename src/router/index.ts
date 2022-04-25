import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home/HomeView.vue';
import AccountView from '../views/Account/AccountView.vue';
import SavedAccomodationsView from '../views/SavedAccomodations/SavedAccomodationsView.vue';
import BookingsView from '@/views/Bookings/BookingsView.vue';
import LoginView from '@/views/Login/LoginView.vue';

// Rutas públicas
const publicRoutes = ["/signin", "/signup", "/"];


const router = createRouter({
  history: createWebHistory(),
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/signin',
      name: 'signin',
      component: LoginView,
    },
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
});

// Middleware autenticación
router.beforeEach((to, from, next) => {
  const authRequired = !publicRoutes.includes(to.path);
  const isLogged = sessionStorage.getItem('token');

  if (authRequired && !isLogged) {
    next('/signin');
  } else {
    next();
  }
});

export default router;
