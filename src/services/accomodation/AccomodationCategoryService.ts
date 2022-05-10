/**
 *
 * @author Francisco Coya
 * @version v1.0.0
 * @description Servicio que gestiona las llamadas a la API para gestionar las operaciones
 * de las categorías de alojamiento.
 *
 */
import axios from 'axios';
import { handleError } from '../errorHandler';

// Ruta alojamientos: /api/accomodations
import {
  API_ACCOMODATION_CATEGORIES,
  API_ACCOMODATIONS,
} from '@/helpers/apiRoutes';

const apiJwtToken: string = JSON.parse(
  sessionStorage?.getItem('user') || '{}'
)?.token;

/**
 * Listado de todas las categorías de alojamiento disponibles en la aplicación.
 *
 * @returns
 */
export const getAllAccomodationCategories = async (): Promise<any> => {
  const { data } = (await axios
    .get(`${API_ACCOMODATION_CATEGORIES}/all`)
    .catch((err) => handleError(err))) as any;

  return data;
};

/**
 * Actualiza la categoría del alojamiento.
 * @param category
 */
export const updateAccomodationCategory = async (
  regNumber: string,
  category: any
) => {
  const { accomodationCategory, id } = category;

  await axios
    .patch(
      `${API_ACCOMODATIONS}/${regNumber}/category/edit`,
      {
        accomodationCategory,
        id,
      },
      {
        headers: {
          Authorization: `Bearer ${apiJwtToken}`,
        },
      }
    )
    .catch((err) => console.log(err));
};
