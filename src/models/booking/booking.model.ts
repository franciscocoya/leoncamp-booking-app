import type { Accomodation } from '../accomodation/accomodation.model';

import type { Payment } from '@/models/payment/payment.model';

import type { User } from '@/models/user/user.model';

export interface Booking {
  id: number;
  userHost: User;
  accomodation: Accomodation;
  checkInDate: Date;
  checkOutDate: Date;
  numOfGuests: number;
  amount: number;
  disccount?: number;
  serviceFee: number;
  totalPrice: number;
  paymentId: Payment;
  bookingStatus: string;
  createdAt: Date;
}
