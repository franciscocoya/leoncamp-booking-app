import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/Home/HomeView.vue';

import AccountView from '@/views/Account/AccountView.vue';
import UserProfileView from '@/views/Account/UserProfileView.vue';

import SavedAccomodationsView from '@/views/SavedAccomodations/SavedAccomodationsView.vue';
import BookingsView from '@/views/Bookings/BookingsView.vue';
import LoginView from '@/views/Auth/LoginView.vue';
import RegisterView from '@/views/Auth/RegisterView.vue';
import ForgotPasswordView from '@/views/Auth/ForgotPasswordView.vue';

// Rutas públicas
const authRoutes = ["/signin", "/signup", "/password/reset"];
const publicRoutes = [...authRoutes, "/"];



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
      path: '/signup',
      name: 'signup',
      component: RegisterView,
    },
    {
      path: '/password/reset',
      name: 'reset-password',
      component: ForgotPasswordView,
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
      component: AccountView,
      children: [
        {
          path: 'profile',
          name: 'user-profile',
          component: UserProfileView
        }
      ]
    },
  ]
});

// Middleware autenticación
router.beforeEach((to, from, next) => {
  const authRequired = !publicRoutes.includes(to.path);
  const isLogged = JSON.parse(sessionStorage.getItem('user'))?.token;

  if (authRequired && !isLogged) {
    next('/signin');
  } else {
    // Si el usuario está logeado, no podrá acceder a las rutas de autenticación (signin y signup).
    authRoutes.includes(to.path) && isLogged ? next('/') : next();
  }
});

export default router;
