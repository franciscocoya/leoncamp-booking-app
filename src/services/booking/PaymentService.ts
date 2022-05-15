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

export const addNewPayment = async (
  paymentType: number,
  paymentData: any,
  callback: CallableFunction
) => {
  // Crear pago
  let lastPaymentId = await axios.get(`${API_PAYMENTS}/lastPaymentId`, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(sessionStorage.getItem('user') || '{}').token
      }`,
    },
  });

  let newPayment = null;

  let newPaymentId = await lastPaymentId.data;

  try {
    newPayment = await axios.post(
      `${API_PAYMENTS}/new`,
      {
        idPayment: newPaymentId,
      },
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(sessionStorage.getItem('user') || '{}').token
          }`,
        },
      }
    );
  } catch (err: any) {
    if (err.response.status === 404) {
      await axios.delete(`${API_PAYMENTS}/${newPaymentId}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(sessionStorage.getItem('user') || '{}').token
          }`,
        },
      });
    }
  }

  let payment;

  if (newPayment) {
    try {
      if (paymentType === 1) {
        // Si el tipo es Credit Card
        payment = await axios({
          url: `${API_PAYMENTS}/credit-card/new`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${
              JSON.parse(sessionStorage.getItem('user') || '{}').token
            }`,
          },
          data: {
            idPayment: newPayment.data.idPayment,
            cardNumber: paymentData.cardNumber,
          },
        });
      } else if (paymentType === 2) {
        // Si el tipo es PayPal
        payment = await axios({
          url: `${API_PAYMENTS}/paypal/new`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${
              JSON.parse(sessionStorage.getItem('user') || '{}').token
            }`,
          },
          data: {
            idPayment: newPayment.data.idPayment,
            accountEmail: paymentData.accountEmail,
          },
        });
      }
    } catch (err: any) {
      callback(err.response);
    }
  }

  return payment.data;

  // En función del tipo de pago, se crea un registro en una subtabla u otra (PayPal, CreditCard)
};
