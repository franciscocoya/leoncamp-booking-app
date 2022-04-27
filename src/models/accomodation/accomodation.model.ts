import type { PromoCode } from './promoCode.model';

export interface Accomodation {
  registerNumber: string;
  numOfBeds: number;
  numOfBathRooms: number;
  numOfBedRooms: number;
  pricePerNight: number;
  numOfGuests: number;
  area?: number;
  category?: string;
  accomodationLocation: {
    lat: number;
    lng: number;
    direction: string;
    city: string;
    zip: string;
  };
  accomodationImages: string[];
  accomodationRules: string[];
  accomodationServices: string[];
  promoCodes?: PromoCode[];
  createdAt: Date;
}
