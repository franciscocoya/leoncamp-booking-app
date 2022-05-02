import type { PromoCode } from '@/models/promoCode/promoCode.model';
import type { Coordinate } from '@/models/accomodation/coordinates.model';

export interface Accomodation {
  registerNumber: string;
  description: string;
  numOfBeds: number;
  numOfBathRooms: number;
  numOfBedRooms: number;
  pricePerNight: number;
  numOfGuests: number;
  area?: number;
  category?: string;
  accomodationLocation: {
    coords: Coordinate;
    direction: string;
    city: string;
    zip: string;
  };
  accomodationImages: string[];
  userHost: {
    id: number;
    name: string;
    surname: string;
    profileImage: string;
  };
  accomodationRules: string[];
  accomodationServices: string[];
  promoCodes?: PromoCode[];
  stars?: number;
  createdAt: Date;
}
