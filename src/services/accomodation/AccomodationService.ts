/**
 *
 * @author Francisco Coya
 * @version v1.0.0
 * @description Servicio que gestiona las llamadas a la API para obtener los alojamientos disponibles.
 *
 */
import axios from 'axios';

// Rutas alojamientos API: /api/accomodations
import {
  ALL_ACCOMODATIONS,
  ACCOMODATIONS_BASE_PATH,
} from './AccomodationsRoutesEnum';

// Rutas de las reservas API: /api/bookings
import { BOKINGS_BASE_PATH } from './BookingRoutesEnum';

// Ruta alojamientos: /api/accomodations

const baseUri: string = import.meta.env.VITE_API_URI;

const apiJwtToken: string = JSON.parse(
  sessionStorage?.getItem('user') || '{}'
)?.token;

/**
 * Lista todos los alojamientos disponibles.
 */
export const getAllAccomodations = async () => {
  const { data } = await axios.get(`${baseUri}${ACCOMODATIONS_BASE_PATH}/all`, {
    params: {
      page: 0,
      size: 2,
    },
    headers: {
      Authorization: `Bearer ${apiJwtToken}`,
    },
  });

  return data.content;
};

/**
 * Obtener un alojamiento por su número de registro.
 *
 * @param regNumber
 */
export async function getAccomodationByRegNumber(regNumber: string) {
  const { data } = await axios.get(
    `${baseUri}${ACCOMODATIONS_BASE_PATH}/${regNumber}`,
    {
      headers: {
        Authorization: `Bearer ${apiJwtToken}`,
      },
    }
  );
  return data;
}

/**
 * Listado de todos los alojamientos publicados por un usuario.
 */
export async function getAllUserAccomodations(idUser: number) {
  const { data } = await axios.get(
    `${baseUri}${ACCOMODATIONS_BASE_PATH}/user/${idUser}`,
    {
      headers: {
        Authorization: `Bearer ${apiJwtToken}`,
      },
    }
  );

  return data;
}

/**
 * Listado de todos los alojamientos reservados por un usuario.
 */
export async function getUserBookingsByUserId(userId: number) {
  const { data } = await axios.get(
    `${baseUri}${BOKINGS_BASE_PATH}/users/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${apiJwtToken}`,
      },
    }
  );

  return data;
}

/**
 * Listado de alojamientos guardados por un usuario.
 *
 * @param userId
 * @returns
 */
export async function getUserSavedAccomodationsByUserId(userId: number) {
  const { data } = await axios.get(
    `${baseUri}${ACCOMODATIONS_BASE_PATH}/saved/users/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${apiJwtToken}`,
      },
    }
  );

  return data;
}

/**
 * Valoración media (En estrellas) de un alojamiento.
 */
export async function getAccomodationStarAverage(regNumber: string) {
  const { data } = await axios.get(
    `${baseUri}${ACCOMODATIONS_BASE_PATH}/reviews/${regNumber}/stars`,
    {
      headers: {
        Authorization: `Bearer ${apiJwtToken}`,
      },
    }
  );

  return data;
}

/**
 *
 * Listado de las valoraciones del alojamiento con el número de registro pasado como parámetro.
 *
 * @param regNumber
 * @returns
 */
export async function getLatestAccomodationReviewsByRegisterNumber(
  regNumber: string
) {
  const { data } = await axios.get(
    `${baseUri}${ACCOMODATIONS_BASE_PATH}/reviews/${regNumber}/latest`,
    {
      headers: {
        Authorization: `Bearer ${apiJwtToken}`,
      },
    }
  );

  return data;
}

/**
 * Listado de todas las valoraciones del alojamiento con el número de registro pasado como parámetro.
 * 
 * @param regNumber
 * 
 * @returns
 */
export async function getAllAccomodationReviewsByRegisterNumber(
  regNumber: string
) {
  const { data } = await axios.get(
    `${baseUri}${ACCOMODATIONS_BASE_PATH}/reviews/${regNumber}`,
    {
      headers: {
        Authorization: `Bearer ${apiJwtToken}`,
      },
    }
  );

  return data;
}

/**
 * Eliminar un alojamiento por su número de registro.
 */
export async function deleteAccomodationBySavedAccomodationId(
  regNumber: number
) {
  await axios.delete(
    `${baseUri}${ACCOMODATIONS_BASE_PATH}/saved/${regNumber}`,
    {
      headers: {
        Authorization: `Bearer ${apiJwtToken}`,
      },
    }
  );
}

/**
 * Listado de todas las ciudades
 */
export async function getAllCities() {
    const accomodations = await getAllAccomodations();
    return [...new Set(accomodations.map((accomodation) => accomodation.idAccomodationLocation.city))]
}
