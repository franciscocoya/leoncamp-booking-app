import { jsPDF } from 'jspdf';

import {
  formatArrayAsDate,
  getDateDiffOnDays,
  convertArrayToDate,
} from '@/helpers/utils';

// Default export is a4 paper, portrait, using millimeters for units
const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'px',
});

// Iconos
import { IMG_APP_LOGO_XL, IMG_APP_LOGO } from '@/helpers/iconConstants';

export function generateReceipt(
  bookingData?: any,
  userData?: any,
  currentUserData?: any
) {
  // Encabezado
  // Logo LeonCamp
  doc.addImage(IMG_APP_LOGO, 'PNG', 300, 10, 120, 75);

  // -- Columna 1s
  // Título: Ciudad
  doc.text(bookingData?.idAccomodation?.idAccomodationLocation.city, 50, 100);

  // Número de registro del alojamiento
  doc.text(bookingData?.idAccomodation?.registerNumber, 50, 120);

  // Dirección
  const fullAddress =
    bookingData?.idAccomodation?.idAccomodationLocation?.direction +
    ' ' +
    bookingData?.idAccomodation?.idAccomodationLocation?.city +
    ' ' +
    bookingData?.idAccomodation?.idAccomodationLocation?.zip;

  doc.text(fullAddress, 50, 140);

  // Número noches
  // const nights = getDateDiffOnDays(
  //   convertArrayToDate(bookingData?.checkIn),
  //   convertArrayToDate(bookingData?.checkOut)
  // );
  // doc.text(nights, 50, 140);

  // Fechas reserva

  // Nombre y apellidos del anfitrión
  doc.text(userData?.name + ' ' + userData?.surname, 50, 160);

  // Email del anfitrión
  doc.text(userData?.email, 50, 180);

  // -- Columna 2
  // Nombre y apellidos del huésped que realiza la reserva
  doc.text(currentUserData?.name + ' ' + currentUserData?.surname, 50, 200);

  // Titulo: Desglose del precio
  doc.text('Desglose del precio', 50, 220);

  // -- Coste Precio / noche x (n noches)
  // TODO: Obtener número noches
  const amountByNights: string = bookingData?.amount + '€ x ' + 2 + ' noches';
  doc.text(amountByNights, 50, 240);

  // -- Comisión servicio
  doc.text('Comisión de servicio', 50, 260);
  doc.text(bookingData?.serviceFee + ' €', 50, 280);

  // -- Total (EUR)
  doc.text('Total (EUR)', 50, 300);
  doc.text(bookingData?.total + ' €', 50, 320);

  // Tipo de pago empleado
  doc.text('Tipo de pago empleado', 50, 340);
  const paymentType: string = bookingData?.idPayment?.cardNumber
    ? 'Tarjeta de crédito'
    : 'Paypal';
  doc.text(paymentType, 50, 360);

  // Estado de la reserva
  doc.text('Estado de la reserva', 50, 380);
  const bookingStatus: string = bookingData?.bookingStatus;
  doc.text(bookingStatus, 50, 400);

  // Abrir PDF en una nueva pestaña
  doc.output('dataurlnewwindow');
}
