// const stripe = require('stripe')(import.meta.env.VITE_STRIPE_SECRET);
import axios from 'axios';

import { API_PAYMENTS } from '@/helpers/apiRoutes';

const baseUri = import.meta.env.VITE_BASE_URL;

// const makePayment = async (regNumber: string, price: number) => {
//     await axios.stripe.checkout.session.create({
//         line_items: [
//             {

//                 price,
//                 quantity: 1,
//             },
//         ],
//         mode: 'payment',
//         success_url: `${YOUR_DOMAIN}/success.html`,
//         cancel_url: `${YOUR_DOMAIN}/cancel.html`,
//     });
// };

export const addNewPayment = async (paymentType: number, paymentData: any) => {

    // Crear pago
    const newPayment = await axios.post(`${API_PAYMENTS}/new`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('user') || '{}').token}`
        }
    });

    let payment;

    if (paymentType === 1) {
        // Si el tipo es Credit Card
        payment = await axios.post(`${API_PAYMENTS}/credit-card/new`, {
            idPayment: newPayment.data.idPayment,
            cardNumber: paymentData.cardNumber,
        }, {
            headers: {
                Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('user') || '{}').token}`
            }
        });

    } else if (paymentType === 2) {
        // Si el tipo es PayPal
        payment = await axios.post(`${API_PAYMENTS}/paypal/new`, {
            idPayment: newPayment.data.idPayment,
            accountEmail: paymentData.accountEmail,
        }, {
            headers: {
                Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('user') || '{}').token}`
            }
        });
    }

    return payment.data;

    // En función del tipo de pago, se crea un registro en una subtabla u otra (PayPal, CreditCard)
};