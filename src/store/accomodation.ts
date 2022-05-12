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
  getAllAccomodationReviewsByRegisterNumber,
  getAllAvaibleServices,
  deleteImageFromAccomodation,
  addNewImageToAccomodation,
  updateAccomodationData,
  getAllAvailableRules,
} from '@/services/accomodation/AccomodationService';

import {
  addServiceToExistingAccomodation,
  deleteServiceFromExistingAccomodation,
} from '@/services/accomodation/AccomodationServiceService';

import {
  addRuleToExistingAccomodation,
  deleteRuleFromAccomodation,
} from '@/services/accomodation/AccomodationRuleService';

import { updateAccomodationCategory } from '@/services/accomodation/AccomodationCategoryService';

const useAccomodationStore = defineStore({
  id: 'accomodation',
  state: (): Accomodation => ({
    registerNumber: '',
    description: '',
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
    accomodationReviews: [],
    userHost: {
      id: 0,
      name: '',
      surname: '',
      profileImage: '',
    },
    stars: 0,
    createdAt: [],
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

      if (accomodationToReturn) {
        this.registerNumber = accomodationToReturn.registerNumber;
        this.description = accomodationToReturn.description;
        this.numOfBeds = accomodationToReturn.numOfBeds;
        this.numOfBathRooms = accomodationToReturn.numOfBathRooms;
        this.numOfBedRooms = accomodationToReturn.numOfBedRooms;
        this.pricePerNight = accomodationToReturn.pricePerNight;
        this.numOfGuests = accomodationToReturn.numOfGuests;
        this.area = accomodationToReturn.area;
        this.category = accomodationToReturn.idAccomodationCategory;
        this.accomodationLocation = accomodationToReturn.idAccomodationLocation;
        this.accomodationImages = accomodationToReturn.accomodationImages;
        this.accomodationImages = accomodationToReturn.accomodationImages;
        this.accomodationRules = accomodationToReturn.accomodationRules;
        this.accomodationServices = accomodationToReturn.accomodationServices;
        this.promoCodes = accomodationToReturn.promoCodes;
        this.userHost = accomodationToReturn.idUserHost;

        // Valoracion media
        this.stars = await this.getStarAverage(
          accomodationToReturn.registerNumber
        );
        // Valoraciones del alojamiento
        this.accomodationReviews =
          await getAllAccomodationReviewsByRegisterNumber(
            accomodationToReturn.registerNumber
          );
      }

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
    async deleteAccomodationBySavedAccId(savedAccId: number): Promise<void> {
      await deleteAccomodationBySavedAccomodationId(savedAccId);
    },

    /**
     * Añadir una una imagen a un alojamiento.
     */
    async addNewAccomodationImage(regNumber: string, imageUrl: string) {
      await addNewImageToAccomodation(regNumber, imageUrl);
    },

    /**
     * Listado de todos los servicios disponibles.
     *
     * @returns
     */
    async getAllServices(): Promise<string[]> {
      return await getAllAvaibleServices();
    },

    /**
     * Listado de todos los normas disponibles.
     *
     * @returns
     */
    async getAllRules(): Promise<string[]> {
      return await getAllAvailableRules();
    },

    /**
     * Borrado de una imagen del alojamiento.
     *
     * @param regNumber
     * @param imageId
     */
    async deleteAccomodationImage(
      regNumber: string,
      imageId: number
    ): Promise<void> {
      await deleteImageFromAccomodation(regNumber, imageId);
    },

    /**
     * Actualización de los datos de un alojamiento
     */
    async updateAccomodation() {
      await updateAccomodationData(this);
      // window.location.reload();
    },

    /**
     * Actualización de la categoría de un alojamiento.
     */
    async updateAccomodationCategory() {
      await updateAccomodationCategory(this.registerNumber, this.category);
    },

    /**
     * Añade un servicio al alojamiento.
     */
    async addNewService(newService: any) {
      await addServiceToExistingAccomodation(this.registerNumber, newService);
    },

    /**
     * Elimina un servicio del alojamiento.
     */
    async deleteService(serviceId: number): Promise<void> {
      await deleteServiceFromExistingAccomodation(
        this.registerNumber,
        serviceId
      );
    },

    /**
     * Añade una nueva regla al alojamiento.
     * @param newRule
     */
    async addNewRule(accomodationRuleId: number) {
      await addRuleToExistingAccomodation(
        this.registerNumber,
        accomodationRuleId
      );
    },

    /**
     * Elimina una norma de un alojamiento
     */
    async deleteAccomodationRule(accomodationRuleId: number): Promise<void> {
      await deleteRuleFromAccomodation(this.registerNumber, accomodationRuleId);
    },
  },
});

export { useAccomodationStore };
