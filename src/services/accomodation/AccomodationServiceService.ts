/**
 *
 * @author Francisco Coya
 * @version v1.0.0
 * @description Servicio que gestiona las llamadas a la API para las funcionalidades de los servicios
 * de los alojamientos.
 *
 */
import axios from 'axios';
import { handleError } from '../errorHandler';

// Ruta alojamientos: /api/accomodations
import { API_ACCOMODATION_SERVICES } from '@/helpers/apiRoutes';

const apiJwtToken: string = JSON.parse(
  sessionStorage?.getItem('user') || '{}'
)?.token;

/**
 * Añaade un servicio al alojamiento con el número de registro pasado como parámetro.
 *
 * @param regNumber
 * @param serviceId
 */
export const addServiceToExistingAccomodation = async (
  regNumber: string,
  serviceId: number
) => {
  await axios({
    method: 'POST',
    url: `${API_ACCOMODATION_SERVICES}/${regNumber}/new`,
    headers: {
      Authorization: `Bearer ${apiJwtToken}`,
    },
    params: {
      service: serviceId,
    },
  }).catch((err) => console.log(err));

  //   return data;
};

/**
 * Elimina un servicio del alojamiento con el número de registro pasado como parámetro.
 *
 * @param regNumber
 * @param serviceId
 */
export const deleteServiceFromExistingAccomodation = async (
  regNumber: string,
  serviceId: number
) => {
  await axios
    .delete(`${API_ACCOMODATION_SERVICES}/${regNumber}/delete`, {
      headers: {
        Authorization: `Bearer ${apiJwtToken}`,
      },
      params: {
        service: serviceId,
      },
    })
    .catch((err) => console.log(err));
};
