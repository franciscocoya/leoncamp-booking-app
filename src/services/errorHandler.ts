/**
 * Manejador de errores para las peticiones a la API.
 */
const handleError = (err: any) => {
  if (err.response) {
    // Errores 5xx
    if (err.response.status >= 500 && err.response.status < 600) {
      // Servidor sobrecargado
      if (err.response.status == 503) {
        // window.location.href = "/503";
      }

      // Servidor no disponible
      // window.location.href = "/500";
    }

    // Errores 4xx
    if (err.response.status >= 400 && err.response.status < 500) {
      // Acceso no autorizado
      if (err.response.status == 401) {
        // window.location.href = "/401";
      }

      // Página no encontrada
      // window.location.href = "/404";
    }
  }
};

export { handleError };
