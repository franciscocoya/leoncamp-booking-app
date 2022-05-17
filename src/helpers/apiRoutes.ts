// -- Rutas de autenticación
const API_BASE_URL: string = import.meta.env.VITE_API_URI;

const LOGIN_URL = `${API_BASE_URL}${import.meta.env.VITE_API_LOGIN_URL}`;
const SIGNUP_URL = `${API_BASE_URL}${import.meta.env.VITE_API_SIGNUP_URL}`;
const RESET_PASSWORD_URL = `${API_BASE_URL}${
  import.meta.env.VITE_API_RESET_PASSWORD_URL
}`;

const RESET_PASSWORD_LOGGED_USER = `${API_BASE_URL}/auth`;

// -----------------------------------------------------------------------------

// -- Rutas de usuario
const API_USERS = `${API_BASE_URL}${import.meta.env.VITE_API_USERS}`;

// /config/u
const API_USER_CONFIG = `${API_BASE_URL}${
  import.meta.env.VITE_API_USER_CONFIG
}`;

// /config
const API_CONFIG = `${API_BASE_URL}${import.meta.env.VITE_API_CONFIG}`;

// -----------------------------------------------------------------------------

// -- Rutas de alojamiento
const API_ACCOMODATIONS = `${API_BASE_URL}${
  import.meta.env.VITE_API_ACCOMODATIONS
}`;

// -- Rutas servicios de un alojamiento
const API_ACCOMODATION_SERVICES = `${API_BASE_URL}${
  import.meta.env.VITE_API_ACCOMODATION_SERVICES
}`;

// -- Rutas de las categorías de alojamiento
const API_ACCOMODATION_CATEGORIES = `${API_BASE_URL}${
  import.meta.env.VITE_API_ACCOMODATION_CATEGORIES
}`;

// -- Rutas de las normas de alojamiento.
const API_ACCOMODATION_RULES = `${API_BASE_URL}${
  import.meta.env.VITE_API_ACCOMODATION_RULES
}`;

const API_ACCOMODATION_LOCATIONS = `${API_BASE_URL}${import.meta.env.VITE_API_ACCOMODATION_LOCATION}`;

// -----------------------------------------------------------------------------

// -- Rutas de reservas
const API_BOOKINGS = `${API_BASE_URL}${import.meta.env.VITE_API_BOOKINGS}`;
// -----------------------------------------------------------------------------

// -- Rutas de reservas

const API_PAYMENTS = `${API_BASE_URL}${import.meta.env.VITE_API_PAYMENTS}`;
// -----------------------------------------------------------------------------

export {
  LOGIN_URL,
  SIGNUP_URL,
  RESET_PASSWORD_URL,
  RESET_PASSWORD_LOGGED_USER,
  API_USERS,
  API_CONFIG,
  API_USER_CONFIG,
  API_ACCOMODATIONS,
  API_ACCOMODATION_SERVICES,
  API_ACCOMODATION_CATEGORIES,
  API_ACCOMODATION_RULES,
  API_ACCOMODATION_LOCATIONS,
  API_BOOKINGS,
  API_PAYMENTS
};
