/**
 * 
 * @author Francisco Coya
 * @version v1.0.0
 * @description Servicio que gestiona las llamadas a la API para obtener los alojamientos disponibles.
 * 
 */
import axios from "axios";

// Ruta alojamientos: /api/accomodations

const baseUri = import.meta.env.VITE_API_URI;
const apiToken = import.meta.env.VITE_API_TOKEN;
const accomodationsPath = "/accomodations";

/**
 * Lista todos los alojamientos disponibles.
 */
const getAllAccomodations = async () => {
    const { data } = await axios
        .get(`${baseUri}${accomodationsPath}/all/limit`, {
            params: {
                max: 3,
            },
            headers: {
                Authorization: `Bearer ${apiToken}`,
                ContentType: 'application/json'
            },
            timeout: 5000
        });

    return data[0];
};


export {
    getAllAccomodations
}