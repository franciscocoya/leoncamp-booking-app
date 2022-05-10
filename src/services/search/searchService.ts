// import axios from "axios";

// import { API_USERS } from "@/helpers/apiRoutes";

import { getAllCities } from '@/services/accomodation/AccomodationService';

/**
 * Listado de todas las ciudades que coinciden con el término de búsqueda.
 *
 * @param searchWord
 * @returns
 */
const getCitiesMatchWithSearchWord = async (
  searchWord: string
): Promise<string[]> => {
  if (!searchWord || searchWord.length === 0) {
    return [];
  }

  const cities = await getAllCities();

  return cities.filter((city: string) => {
    return city.toLowerCase().includes(searchWord.toLowerCase());
  });
};

export { getCitiesMatchWithSearchWord };
