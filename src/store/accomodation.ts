import { defineStore } from 'pinia';

// Modelos
import type { Accomodation } from '@/models/accomodation/accomodation.model';

// Token de usuario
const currentUserId: number = JSON.parse(
  sessionStorage.getItem('user') || '{}'
)?.id;

// Servicios
import {
  getAllUserAccomodations,
  getAccomodationByRegNumber,
  getUserBookingsByUserId,
  getUserSavedAccomodationsByUserId,
  getAccomodationStarAverage,
  deleteAccomodationBySavedAccomodationId,
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
        lng: 0,
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
      profileImage: '',
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
    async getAccomodationByRegisterNumber(registerNumber: string) {
      const accomodationToReturn = await getAccomodationByRegNumber(
        registerNumber
      );

      this.registerNumber = accomodationToReturn.registerNumber;
      this.numOfBeds = accomodationToReturn.numOfBeds;
      this.numOfBathRooms = accomodationToReturn.numOfBathRooms;
      this.numOfBedRooms = accomodationToReturn.numOfBedRooms;
      this.pricePerNight = accomodationToReturn.pricePerNight;
      this.numOfGuests = accomodationToReturn.numOfGuests;
      this.area = accomodationToReturn.area;
      this.category = accomodationToReturn.idAccomodationCategory;
      this.accomodationLocation = accomodationToReturn.idAccomodationLocation;
      this.accomodationImages = accomodationToReturn.accomodationImages.map(
        (img) => img.accomodationAccImageId.idAccomodationImage.imageUrl
      );
      this.accomodationRules = accomodationToReturn.accomodationRules;
      this.accomodationServices = accomodationToReturn.accomodationServices;
      this.promoCodes = accomodationToReturn.promoCodes;
      this.userHost = accomodationToReturn.idUserHost;
      this.stars = await this.getStarAverage(
        accomodationToReturn.registerNumber
      );
      this.createdAt = accomodationToReturn.createdAt;

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
    async getStarAverage(regNumber: string): Promise<number> {
      return await getAccomodationStarAverage(regNumber);
    },

    /**
     * Eliminar un alojamiento por su número de registro.
     *
     * @param regNumber
     */
    deleteAccomodationBySavedAccId(savedAccId: number): void {
      deleteAccomodationBySavedAccomodationId(savedAccId);
    },
  },
});

export { useAccomodationStore };
