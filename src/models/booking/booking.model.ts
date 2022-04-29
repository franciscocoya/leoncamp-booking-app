import type { User } from '../user/user.model';
import type { Accomodation } from '../accomodation/accomodation.model';

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
  createdAt: Date;
}
