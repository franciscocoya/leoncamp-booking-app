import type { User } from '../user/user.model';
import type { Accomodation } from '../accomodation/accomodation.model';

export interface Booking {
  id: number;
  userHost: {
    id: number;
    name: string;
    surname: string;
    profileImage: string;
  };
  accomodation: Accomodation;
  checkInDate: Date;
  checkOutDate: Date;
  numOfGuests: number;
  amount: number;
  disccount?: number;
  serviceFee: number;
  totalPrice: number;
  paymentId: number;
  bookingStatus: string;
  createdAt: Date;
}
