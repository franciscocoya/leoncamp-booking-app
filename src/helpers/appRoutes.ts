/**
 * Rutas de de la aplicación.
 */
const USER_SIGNIN_ROUTE = '/signin';
const USER_SIGNUP_ROUTE = '/signup';
const SAVED_ACCOMODATIONS_ROUTE = '/saved';
const RESET_PASSWORD_ROUTE = 'password/reset';
const USER_CONFIGURATION = 'config';
const USER_PRIVACY = 'privacy';
const HELP_ROUTE = '/help';
// Esta ruta comienza desde la ruta de la cuenta de usuario, por lo que está parametrizada.
const UPLOAD_ACCOMODATION_ROUTE = '/accomodations/upload';

// Rutas pasos subida alojamiento
const UPLOAD_ACCOMODATION_BASIC_DATA = 'basic-data';
const UPLOAD_ACCOMODATION_LOCATION = 'location';
const UPLOAD_ACCOMODATION_SERVICES = 'services';
const UPLOAD_ACCOMODATION_RULES = 'rules';
const UPLOAD_ACCOMODATION_IMAGES = 'images';

// Ruta realización de la reserva de la aplicación
const BOOKING_ACCOMODATION_ROUTE = '/booking';

// Errors
const ERROR_401_ROUTE = '/401';
const ERROR_404_ROUTE = '/404';
const ERROR_500_ROUTE = '/500';
const ERROR_503_ROUTE = '/503';

const authRoutes = [
    USER_SIGNIN_ROUTE,
    USER_SIGNUP_ROUTE,
    '/password/reset'
];

const headerRoutes = ['saved', 'home', 'user-bookings', 
'error-404', 'account', 'user-profile',
'user-ads', 'user-configuration', 'user-privacy', 'reset-password'];


const publicRoutes = [
    '/'
];

export {
    publicRoutes,
    authRoutes,
    headerRoutes,
    USER_SIGNIN_ROUTE,
    USER_SIGNUP_ROUTE,
    RESET_PASSWORD_ROUTE,
    USER_PRIVACY,
    USER_CONFIGURATION,
    SAVED_ACCOMODATIONS_ROUTE,
    UPLOAD_ACCOMODATION_ROUTE,

    UPLOAD_ACCOMODATION_BASIC_DATA,
    UPLOAD_ACCOMODATION_LOCATION,
    UPLOAD_ACCOMODATION_SERVICES,
    UPLOAD_ACCOMODATION_RULES,
    UPLOAD_ACCOMODATION_IMAGES,

    BOOKING_ACCOMODATION_ROUTE,

    HELP_ROUTE,
    ERROR_401_ROUTE,
    ERROR_404_ROUTE,
    ERROR_500_ROUTE,
    ERROR_503_ROUTE
}