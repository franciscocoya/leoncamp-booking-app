/**
 * @author Francisco Coya
 * @version v1.0.0
 * @description Funciones de traducción para los componentes y vistas de la aplicación.
 */

const bookinStatus: string[] = ["PENDIENTE", "CONFIRMADA", "COMPLETADA", "CANCELADA"];
const categories: string[] = ["Apartamento", "Loft", "Chalet", "Ático", "Dúplex", "Adosado", "Estudio"];
const amenities: string[] = [
    'Wifi',
    'Calefacción',
    'TV',
    'Ropa de cama',
    'Toallas',
    'Detector de humo',
    'Botiquín',
    'Desayuno',
    'Aparcamiento gratuito',
    'Aire acondicionado',
    'Agua caliente',
    'Secador de pelo',
    'Lavadora',
    'Plancha',
    'Vajilla',
    'Admite mascotas',
    'Apto para fumadores',
    'Cuna',
    'Productos de limpieza',
    'Microondas',
    'Cafetera',
    'Accesible para minusválidos',
    'Congelador',
    'Horno',
    'Lavavajillas',
    'Terraza / patio',
    'Ascensor',
    'Bañera de hidromasaje',
    'Piscina privada',
    'Piscina compartida',
    'Jardín',
    'Zona para trabajar / Oficina'
];

/**
 * Obtiene la posición en <code>user_bookings_view</code>en el fichero i18n del estado de la reserva.
 * 
 * @param status 
 * @returns 
 */
export const translateBookingStatus = (status: string): number => bookinStatus.indexOf(status);

/**
 * Obtiene la posición en <code>accomodation_categories</code> del fichero i18n de la categoría.
 * 
 * @param category 
 * @returns 
 */
export const translateCategory = (category: string): number => categories.indexOf(category);

/**
 * Obtiene la posición en <code>amenities</code> del fichero i18n del servicio.
 * 
 * @param amenity 
 * @returns 
 */
export const translateAmenity = (amenity: string): number => amenities.indexOf(amenity);