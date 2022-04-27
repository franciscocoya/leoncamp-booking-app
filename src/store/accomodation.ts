import { defineStore } from 'pinia';

// Modelos
import type { Accomodation } from '@/models/accomodation/accomodation.model';

// Servicios
import { getAllUserAccomodations } from '@/services/accomodation/AccomodationService';

const useAccomodationStore = defineStore({
  id: 'accomodation',
  state: (): Accomodation => ({
    registerNumber: '',
    numOfBeds: 0,
    numOfBathRooms: 0,
    numOfBedRooms: 0,
    pricePerNight: 0,
    numOfGuests: 0,
    area: 0,
    category: '',
    accomodationLocation: {
      lat: 0,
      lng: 0,
      direction: '',
      city: '',
      zip: '',
    },
    accomodationImages: [],
    accomodationRules: [],
    accomodationServices: [],
    promoCodes: [],
    createdAt: null,
  }),

  actions: {
    /**
     * Obtener un alojamiento por su número de registro.
     *
     * @param registerNumber
     * @returns
     */
    getAccomodationByRegisterNumber(registerNumber: string) {
      const accomodation = getAccomodationByRegNumber(registerNumber);
    },

    /**
     * Listado de los alojamientos del usuario.
     * @returns
     */
    getAllUserAccomodations() {
      const idUser = JSON.parse(sessionStorage.getItem('user') || '{}').id;
      return getAllUserAccomodations(idUser);
    },
  },
});

export { useAccomodationStore };
