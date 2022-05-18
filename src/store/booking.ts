import { defineStore } from 'pinia';

import type { Booking } from '@/models/booking/booking.model';

import type { Accomodation } from '@/models/accomodation/accomodation.model';

import type { Payment } from '@/models/payment/payment.model';

import type { User } from '@/models/user/user.model';

// Servicio
import { getBookingDataByBookingId } from '@/services/booking/BookingService';

const useBookingStore = defineStore({
  id: 'booking',
  state: (): Booking => ({
    id: 0,
    userHost: {} as User,
    accomodation: {} as Accomodation,
    checkInDate: new Date(),
    checkOutDate: new Date(),
    numOfGuests: 0,
    amount: 0,
    disccount: 0,
    serviceFee: 0,
    bookingStatus: '',
    totalPrice: 0,
    paymentId: {} as Payment,
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
