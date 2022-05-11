/**
 *
 * @author Francisco Coya
 * @version v1.0.0
 * @description Servicio que gestiona las llamadas a la API para obtener los alojamientos disponibles.
 *
 */
import axios from 'axios';
import { handleError } from '@/services/errorHandler';

import type { Coordinate } from '@/models/accomodation/coordinates.model';

// Rutas alojamientos API: /api/accomodations
import { ACCOMODATIONS_BASE_PATH } from './AccomodationsRoutesEnum';

import {
  API_ACCOMODATION_SERVICES,
  API_ACCOMODATION_RULES,
} from '@/helpers/apiRoutes';

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
  const { data } = (await axios
    .get(`${baseUri}${ACCOMODATIONS_BASE_PATH}/all`, {
      params: {
        page: 0,
        size: 2,
      },
      headers: {
        Authorization: `Bearer ${apiJwtToken}`,
      },
    })
    .catch((err) => handleError(err))) as any;

  return data.content;
};

/**
 * Obtener un alojamiento por su número de registro.
 *
 * @param regNumber
 */
export async function getAccomodationByRegNumber(regNumber: string) {
  return await axios
    .get(`${baseUri}${ACCOMODATIONS_BASE_PATH}/${regNumber}`, {
      headers: {
        Authorization: `Bearer ${apiJwtToken}`,
      },
      timeout: 5000,
    })
    .then((res) => res.data)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      handleError(err);
    });
}

/**
 * Listado de todos los alojamientos publicados por un usuario.
 */
export async function getAllUserAccomodations(idUser: number) {
  const { data } = (await axios
    .get(`${baseUri}${ACCOMODATIONS_BASE_PATH}/user/${idUser}`, {
      headers: {
        Authorization: `Bearer ${apiJwtToken}`,
      },
    })
    .catch((err) => handleError(err))) as any;

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
 * Listado de todos los servicios disponibles en la aplicación.
 *
 * @returns
 */
export async function getAllAvaibleServices() {
  const { data } = await axios.get(`${API_ACCOMODATION_SERVICES}/all`, {
    headers: {
      Authorization: `Bearer ${apiJwtToken}`,
    },
  });

  return data;
}

/**
 * Listado de todas las normas disponibles en la aplicación.

 * @returns 
 */
export async function getAllAvailableRules() {
  const { data } = await axios.get(`${API_ACCOMODATION_RULES}/all`, {
    headers: {
      Authorization: `Bearer ${apiJwtToken}`,
    },
  });

  return data;
}

/**
 * Listado de todas las ciudades
 */
export async function getAllCities(): Promise<string[]> {
  const accomodations = await getAllAccomodations();
  return [
    ...new Set(
      accomodations.map(
        (accomodation: any) => accomodation.idAccomodationLocation.city
      )
    ),
  ] as string[];
}

// ---------------------------------------------------------------
// -- Imágenes de alojamientos
// ---------------------------------------------------------------

/**
 * Añade una nueva imagen al alojamiento con número de registro <code>regNumber</code>.
 *
 * @param regNumber
 * @param imgUrl
 * @returns
 */
export async function addNewImageToAccomodation(
  regNumber: string,
  imgUrl: string
) {
  const { data } = (await axios
    .post(
      `${baseUri}${ACCOMODATIONS_BASE_PATH}/${regNumber}/images/new`,
      {
        imageUrl: imgUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${apiJwtToken}`,
        },
      }
    )
    .catch((err) => console.log(err))) as any;

  return data;
}

/**
 * Elimina una imagen del alojamiento con número de registro <code>regNumber</code>.
 *
 * @param regNumber
 * @param imageId
 */
export async function deleteImageFromAccomodation(
  regNumber: string,
  imageId: number
) {
  await axios
    .delete(
      `${baseUri}${ACCOMODATIONS_BASE_PATH}/${regNumber}/images/${imageId}`,
      {
        headers: {
          Authorization: `Bearer ${apiJwtToken}`,
        },
      }
    )
    .catch((err) => console.log(err));
}

/**
 * Actualización de los datos del alojamiento pasado como parámetro.
 *
 * Las imágenes no se actualizan, ya que se actualizan a la hora de subir o eliminar
 * con los botones de Añadir imagen o el icono de eliminar de ésta.
 *
 * El número de registro y ubicación no se actualizan ya que son inmutables.
 * Para actualizar estos datos, se debe eliminar el alojamiento y volver a crearlo.
 *
 * @param accomodationData
 */
export async function updateAccomodationData(accomodationData: any) {
  const accData = new FormData();

  const {
    registerNumber,
    description,
    numOfBeds,
    numOfBathRooms,
    numOfGuests,
    numOfBedRooms,
    pricePerNight,
    area,
  }: {
    registerNumber: string;
    description: string;
    numOfBeds: string;
    numOfBathRooms: string;
    numOfGuests: string;
    numOfBedRooms: string;
    pricePerNight: string;
    area: string;
  } = accomodationData;

  accData.append('description', description);
  accData.append('numOfBeds', numOfBeds);
  accData.append('numOfBathRooms', numOfBathRooms);
  accData.append('numOfBedRooms', numOfBedRooms);
  accData.append('numOfGuests', numOfGuests);
  accData.append('pricePerNight', pricePerNight);
  accData.append('area', area);

  await axios
    .patch(
      `${baseUri}${ACCOMODATIONS_BASE_PATH}/${registerNumber}`,
      {
        description,
        numOfBeds,
        numOfBathRooms,
        numOfBedRooms,
        numOfGuests,
        pricePerNight,
        area,
      },
      {
        headers: {
          Authorization: `Bearer ${apiJwtToken}`,
        },
      }
    )
    .catch((err) => console.log(err));
}

/**
 * Obtiene la dirección (Dirección, ciudad / localidad, código postal) en base a las coordinadas pasadas 
 * como parámetro.
 * 
 * @param coords 
 * 
 * @returns
 */
export async function getAccomodationLocationByCoords(coords: Coordinate) {
  const MAX_RESULTS = 2;
  interface LocationResponse {
    address: string,
    city: string,
    cp: number
  }

  let accomodationLocationToReturn: LocationResponse = {} as LocationResponse;

  const { data } = await axios.get(
    `${import.meta.env.VITE_POSITION_STACK_ENDPOINT}reverse?access_key=${import.meta.env.VITE_POSITION_STACK_API_TOKEN}&query=${coords.lat},${coords.lng}&limit=${MAX_RESULTS}`);

    console.log(data);
  // Se obtienen dos resultados, por si no se encuentra la dirección en las coordenadas especificadas
  let dataResponse = data.data[0] || data.data[1];

  accomodationLocationToReturn.address = dataResponse.name ?? dataResponse.street;
  accomodationLocationToReturn.city = dataResponse.locality;
  accomodationLocationToReturn.cp = dataResponse.postal_code ?? data.data[1].postal_code;

  return accomodationLocationToReturn;
}
