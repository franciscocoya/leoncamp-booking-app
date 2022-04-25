/**
 * 
 * @author Francisco Coya
 * @version v1.0.0
 * @description Servicio que gestiona las llamadas a la API para obtener los alojamientos disponibles.
 * 
 */
import axios from "axios";

// Rutas alojamientos API: /api/accomodations
import { ALL_ACCOMODATIONS, ACCOMODATIONS_BASE_PATH } from "./AccomodationsRoutesEnum";

// Ruta alojamientos: /api/accomodations

const baseUri: string = import.meta.env.VITE_API_URI;

const apiJwtToken: string | null = sessionStorage.getItem('token');

/**
 * Lista todos los alojamientos disponibles.
 */
export const getAllAccomodations = async(): Promise<any> => {
    const { data } = await axios
        .get(`${baseUri}${ALL_ACCOMODATIONS}`, {
            params: {
                page: 0,
                size: 2
            },
            headers: {
                Authorization: `Bearer ${apiJwtToken}`,
            }
        });

    return data;
};

/**
 * Obtener un alojamiento por su número de registro.
 * 
 * @param regNumber 
 */
export async function getAccomodationById (regNumber: string): Promise<any>{
    const { data } = await axios
        .get(`${baseUri}${ACCOMODATIONS_BASE_PATH}/${regNumber}`, {
            headers: {
                Authorization: `Bearer ${apiJwtToken}`,
            }
        });
    return data;
};