import { createRouter, createWebHistory } from 'vue-router';

// Rutas públicas
const authRoutes: string[] = ['/signin', '/signup', '/password/reset'];
const publicRoutes: string[] = [...authRoutes, '/'];
const publicRoutesNames: string[] = ['accomodation-detail', 'user-profile-public', 'app-help', 'error-404', 'error-500', 'home'];

const router = createRouter({
  history: createWebHistory(),
  base: import.meta.env.BASE_URL,
  routes: [
    {
      // Inicio de sesión
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/Auth/LoginView.vue'),
    },
    {
      // Registro
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/Auth/RegisterView.vue'),
    },
    {
      // Restablecer contraseña
      path: '/password/reset',
      name: 'reset-password',
      component: () => import('@/views/Auth/ForgotPasswordView.vue'),
    },
    {
      // Inicio
      path: '/',
      name: 'home',
      component: () => import('@/views/Home/HomeView.vue'),
    },
    {
      // Alojamientos guardados por el usuario en sesión
      path: '/saved',
      name: 'saved',
      component: () => import('@/views/SavedAccomodations/SavedAccomodationsView.vue'),
    },
    {
      path: '/account/:accUser/accomodation/:registerNumber/edit',
      name: 'accomodation-edit',
      component: () => import('@/views/Accomodations/AccomodationEditView.vue'),
    },
    {
      // Perfil del usuario en sesión
      path: '/account/:username',
      name: 'account',
      redirect: () => {
        return {
          name: 'user-profile',
        }
      },
      component: () => import('@/views/Account/AccountView.vue'),
      children: [
        // Detalles del perfil personal del usuario.
        {
          path: 'profile',
          name: 'user-profile',
          component: () => import('@/views/Account/UserProfileView.vue'),
        },
        {
          // Alojamientos publicados por el usuario
          path: 'accomodations',
          name: 'user-ads',
          component: () => import('@/views/Account/AccomodationsAdsView.vue'),
        },
        {
          // Reservas realizadas por el usuario en sesión
          path: 'bookings',
          name: 'user-bookings',
          component: () => import('@/views/Account/UserBookingsView.vue'),
        },
      ],
    },
    {
      // Detalle de la reserva de un alojamiento
      path: '/bookings/:bookingId',
      name: 'booking-detail',
      component: () => import('@/views/Bookings/BookingDetailView.vue'),
    },
    {
      // Detalle de un alojamiento
      path: '/accomodation/:registerNumber',
      name: 'accomodation-detail',
      component: () =>
        import('@/views/Accomodations/AccomodationDetailView.vue'),
    },
    {
      // Perfil de un usuario
      path: '/u/:userId',
      name: 'user-profile-public',
      component: () => import('@/views/UserProfile/UserProfilePublicView.vue'),
    },
    {
      // Ayuda de la aplicacion
      path: '/help',
      name: 'app-help',
      component: () => import('@/views/Help/HelpView.vue'),
    },
    {
      // Ruta para la página de error 404
      path: '/401',
      name: 'error-401',
      component: () => import('@/views/Error/401View.vue'),
    },
    {
      // Ruta para la página de error 404
      path: '/404',
      name: 'error-404',
      component: () => import('@/views/Error/404View.vue'),
    },
    {
      // Ruta para la página de error 500
      path: '/500',
      name: 'error-500',
      component: () => import('@/views/Error/500View.vue'),
    },
    {
      // Ruta para la página de error 503
      path: '/503',
      name: 'error-503',
      component: () => import('@/views/Error/503View.vue'),
    },
    {
      path: '/:catchAll(.*)',
      redirect: {
        name: 'error-404',
      }
    }
  ],
});

// Middleware autenticación
router.beforeEach((to, from, next) => {
  const authRequired = !publicRoutes.includes(to.path);
  const isLogged = JSON.parse(sessionStorage.getItem('user'))?.token;
  if (!publicRoutesNames.includes(to.name) && (authRequired && !isLogged)) {
    next('/signin');
  } else {
    // Si el usuario está logeado, no podrá acceder a las rutas de autenticación (signin y signup).
    // authRoutes.includes(to.path) && isLogged ? next('/') : next();
    next();
  }
});

export default router;
