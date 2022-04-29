import { defineStore } from 'pinia';

import type { Booking } from '@/models/booking/booking.model';

// Servicio
import {getBookingDataByBookingId} from '@/services/booking/BookingService';

const useBookingStore = defineStore({
  id: 'booking',
  state: (): Booking => ({
    id: 0,
    userHost: {
      id: 0,
      name: '',
      surname: '',
      profileImage: '',
    },
    accomodation: {
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
    },
    checkInDate: new Date(),
    checkOutDate: new Date(),
    numOfGuests: 0,
    amount: 0,
    disccount: 0,
    serviceFee: 0,
    totalPrice: 0,
    createdAt: new Date(),
  }),

  actions : {

    /**
     * Carga los datos de una reserva.
     * @param bookingId 
     */
    async loadBookingDataById(bookingId: string){
      const bookingData = await getBookingDataByBookingId(bookingId);
      const {id, name, surname, profileImage} = bookingData.idUser;
      this.userHost = {
        id,
        name,
        surname,
        profileImage,
      };
    }
  }
});

export { useBookingStore };
