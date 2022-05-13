import { Payment } from '@/models/payment/payment.model';

export interface PayPal extends Payment {
    accountEmail: string;
}