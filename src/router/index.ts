import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/Home/HomeView.vue';

// -----------------------------------------------------------------------------

import AccountView from '@/views/Account/AccountView.vue';
import UserProfileView from '@/views/Account/UserProfileView.vue';
import AccomodationsAdsView from '@/views/Account/AccomodationsAdsView.vue';
import UserBookingsView from '@/views/Account/UserBookingsView.vue';

// -----------------------------------------------------------------------------

import SavedAccomodationsView from '@/views/SavedAccomodations/SavedAccomodationsView.vue';

import BookingsView from '@/views/Bookings/BookingsView.vue';
import BookingDetailView from '@/views/Bookings/BookingDetailView.vue';

import LoginView from '@/views/Auth/LoginView.vue';
import RegisterView from '@/views/Auth/RegisterView.vue';
import ForgotPasswordView from '@/views/Auth/ForgotPasswordView.vue';

// Rutas públicas
const authRoutes = ['/signin', '/signup', '/password/reset'];
const publicRoutes = [...authRoutes, '/'];

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
      component: HomeView,
    },
    {
      path: '/saved',
      name: 'saved',
      component: SavedAccomodationsView,
    },
    {
      path: '/account/:username',
      name: 'account',
      component: AccountView,
      children: [
        // Detalles del perfil personal del usuario.
        {
          path: 'profile',
          name: 'user-profile',
          component: UserProfileView,
        },
        {
          // Alojamientos publicados por el usuario
          path: 'accomodations',
          name: 'user-ads',
          component: AccomodationsAdsView,
        },
        {
          // Reservas realizadas por el usuario en sesión
          path: 'bookings',
          name: 'user-bookings',
          component: UserBookingsView,
        },
      ],
    },
    {
      // Detalle de la reserva de un alojamiento
      path: '/bookings/:bookingId',
      name: 'booking-detail',
      component: BookingDetailView,
    },
    {
      path: '/accomodation/:registerNumber',
      name: 'accomodation-detail',
      component: () =>
        import('@/views/Accomodations/AccomodationDetailView.vue'),
    },
  ],
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
