/**
 *
 * @author Francisco Coya
 * @version v1.0.0
 * @description Servicio que gestiona las llamadas a la API para las funcionalidades de las normas
 * de los alojamientos.
 *
 */
import axios from 'axios';
import { handleError } from '../errorHandler';

// Ruta alojamientos: /api/accomodations
import { API_ACCOMODATION_RULES } from '@/helpers/apiRoutes';

const apiJwtToken: string = JSON.parse(
  sessionStorage?.getItem('user') || '{}'
)?.token;

/**
 * Añade una nueva norma a un alojamiento indicado por su número de registro.
 *
 * @param regNumber
 * @param rule
 * @returns
 */
export const addRuleToExistingAccomodation = async (
  regNumber: string,
  rule: number
) => {
  const { data } = (await axios({
    url: `${API_ACCOMODATION_RULES}/${regNumber}`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiJwtToken}`,
    },
    params: {
      rule,
    },
  }).catch((err) => console.log(err))) as any;

  return data;
};

/**
 * Elimina una norma de un alojamiento indicado por su número de registro.
 *
 * @param regNumber
 * @param accomodationRuleId
 */
export const deleteRuleFromAccomodation = async (
  regNumber: string,
  accomodationRuleId: number
) => {
  await axios
    .delete(`${API_ACCOMODATION_RULES}/${regNumber}/${accomodationRuleId}`, {
      headers: {
        Authorization: `Bearer ${apiJwtToken}`,
      },
    })
    .catch((err) => console.log(err));
};
