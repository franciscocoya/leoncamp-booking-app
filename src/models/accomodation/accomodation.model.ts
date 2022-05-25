import type { PromoCode } from '@/models/promoCode/promoCode.model';
import type { Coordinate } from '@/models/accomodation/coordinates.model';
import type { AccomodationReview } from '@/models/accomodation/accomodationReview.model';
import type { AccomodationImage } from '@/models/accomodation/accomodation-image.model';

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
    latitude: Number,
    longitude: Number,
    direction: string;
    city: string;
    zip: string;
  };
  accomodationImages: AccomodationImage[];
  userHost: {
    id: number;
    name: string;
    surname: string;
    profileImage: string;
    createdAt: number[];
  };
  accomodationRules: string[];
  accomodationServices: string[];
  accomodationReviews: AccomodationReview[];
  promoCodes?: PromoCode[];
  stars?: number;
  createdAt: Date;
}
