import { Payment } from '@/models/payment/payment.model';

export interface CreditCard extends Payment {
    cardNumber: number;
}