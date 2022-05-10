/**
 * Rutas de de la aplicación.
 */
const USER_SIGNIN_ROUTE = '/signin';
const USER_SIGNUP_ROUTE = '/signup';
const SAVED_ACCOMODATIONS_ROUTE = '/saved';
const RESET_PASSWORD_ROUTE = '/password/reset';
const HELP_ROUTE = '/help';
// Esta ruta comienza desde la ruta de la cuenta de usuario, por lo que está parametrizada.
const UPLOAD_ACCOMODATION_ROUTE = '/accomodations/upload';

// Rutas pasos subida alojamiento
const UPLOAD_ACCOMODATION_BASIC_DATA = 'basic-data';
const UPLOAD_ACCOMODATION_LOCATION = 'location';

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


const publicRoutes = [
    '/'
];

export {
    publicRoutes,
    authRoutes,
    USER_SIGNIN_ROUTE,
    USER_SIGNUP_ROUTE,
    RESET_PASSWORD_ROUTE,
    SAVED_ACCOMODATIONS_ROUTE,
    UPLOAD_ACCOMODATION_ROUTE,

    UPLOAD_ACCOMODATION_BASIC_DATA,
    UPLOAD_ACCOMODATION_LOCATION,


    HELP_ROUTE,
    ERROR_401_ROUTE,
    ERROR_404_ROUTE,
    ERROR_500_ROUTE,
    ERROR_503_ROUTE
}