// import axios from "axios";

// import { API_USERS } from "@/helpers/apiRoutes";

import { getAllCities } from "@/services/accomodation/AccomodationService";

/**
 * Listado de todas las ciudades que coinciden con el término de búsqueda.
 * 
 * @param searchWord 
 * @returns 
 */
const getCitiesMatchWithSearchWord = async (searchWord: string) => {

    if(!searchWord || searchWord.length === 0) {
        return null;
    }

    const cities = await getAllCities();

    return cities ? cities.filter((city) => {
        return city.toLowerCase().includes(searchWord.toLowerCase());
    }) : null;
};


export { getCitiesMatchWithSearchWord };