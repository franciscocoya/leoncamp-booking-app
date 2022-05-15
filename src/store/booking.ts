import { defineStore } from 'pinia';

import type { Booking } from '@/models/booking/booking.model';

import type { Accomodation } from '@/models/accomodation/accomodation.model';

import type { Payment } from '@/models/payments/payment.model';

import type { User } from '@/models/user/user.model';

// Servicio
import { getBookingDataByBookingId } from '@/services/booking/BookingService';

const useBookingStore = defineStore({
  id: 'booking',
  state: (): Booking => ({
    id: 0,
    userHost: {} as User,
    accomodation: {} as Accomodation,
    checkIn: new Date(),
    checkOut: new Date(),
    numOfGuests: 0,
    amount: 0,
    disccount: 0,
    serviceFee: 0,
    bookingStatus: '',
    total: 0,
    idPayment: {} as Payment,
    createdAt: new Date(),
  }),

  actions: {
    /**
     * Carga los datos de una reserva.
     * @param bookingId
     */
    async getBookingDataById(bookingId: string) {
      const bookingData = await getBookingDataByBookingId(bookingId);
      return bookingData;
    },
  },
});

export { useBookingStore };
