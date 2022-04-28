import { defineStore } from 'pinia';

// Modelos
import type { Accomodation } from '@/models/accomodation/accomodation.model';

// Token de usuario
const currentUserId: number = JSON.parse(sessionStorage.getItem('user') || '{}')?.id;

// Servicios
import {
  getAllUserAccomodations,
  getAccomodationByRegNumber,
  getUserBookingsByUserId,
  getUserSavedAccomodationsByUserId,
  getAccomodationStarAverage,
  deleteAccomodationBySavedAccomodationId
} from '@/services/accomodation/AccomodationService';

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
      coords: {
        lat: 0,
        lng: 0
      },
      direction: '',
      city: '',
      zip: '',
    },
    accomodationImages: [],
    accomodationRules: [],
    accomodationServices: [],
    promoCodes: [],
    userHost: {
      id: 0,
      name: '',
      surname: '',
      profileImage: ''
    },
    stars: 0,
    createdAt: new Date(),
  }),

  actions: {
    /**
     * Obtener un alojamiento por su número de registro.
     *
     * @param registerNumber
     * @returns
     */
    getAccomodationByRegisterNumber(registerNumber: string) {
      const accomodationToReturn = getAccomodationByRegNumber(registerNumber);
      return accomodationToReturn;
    },

    /**
     * Listado de los alojamientos del usuario en sesión.
     * @returns
     */
    getAllUserAccomodations() {
      return getAllUserAccomodations(currentUserId);
    },

    /**
     * Listado de las reservas realizadas por el usuario en sesión.
     */
    getAllUserBookings() {
      return getUserBookingsByUserId(currentUserId);
    },

    /**
     * Listado de los alojamientos guardados por el usuario en sesión.
     * @returns 
     */
    getAllUserSavedAccomodations() {
      return getUserSavedAccomodationsByUserId(currentUserId);
    },

    /**
     * Valoración media (En estrellas) de un alojamiento.
     */
    getStarAverage(regNumber: string): Promise<number> {
      return getAccomodationStarAverage(regNumber);
    },

    /**
     * Eliminar un alojamiento por su número de registro.
     * 
     * @param regNumber 
     */
    deleteAccomodationBySavedAccId(savedAccId: number): void {
      deleteAccomodationBySavedAccomodationId(savedAccId);
    }
  },
});

export { useAccomodationStore };
