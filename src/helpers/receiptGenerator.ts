import { jsPDF } from 'jspdf';

import "/public/fonts/inter-normal.js";

// Tamaños de caracter
const DEFAULT_FONT_SIZE: number = 12;
const HEADING_FONT_SIZE: number = 14;

// Colores de caracter
const HEADING_TEXT_COLOR: string = "#034c5f";
const PARAGRAPH_TEXT_COLOR: string = "#222222";

// Márgenes
const MARGIN_LEFT_COL1: number = 50;
const MARGIN_LEFT_COL2: number = 300;
const MARGIN_TOP: number = 30;

const LINE_HEIGHT: number = 20;
const LINE_WIDTH: number = 210;

// Posición eje Y para los datos de la primera columna
const POSITION_Y_FIRST_ROW: number = 130;


import {
  convertArrayToDate,
  showCreditCardNumberPartial
} from '@/helpers/utils';

import { IMG_APP_LOGO } from '@/helpers/iconConstants';

// Default export is a4 paper, portrait, using millimeters for units
const doc = new jsPDF({
  orientation: 'p',
  unit: 'pt'
});

// Alto y ancho de la página
const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

// Estilo Tipografía
doc.setFont('inter', 'normal');
doc.setFontSize(DEFAULT_FONT_SIZE);

// Estilo líneas
doc.setLineWidth(1.0);
doc.setDrawColor(221, 221, 221);

// Iconos

export function generateReceipt(
  bookingData?: any,
  userData?: any,
  currentUserData?: any,
  numOfNights?: number,
) {

  doc.setDocumentProperties({
    title: `reserva_${bookingData?.idAccomodation?.registerNumber}`,
    subject: 'Factura',
    author: 'LeonCamp',
    keywords: 'factura, reserva',
    creator: 'LeonCamp',
  });

  // Encabezado
  // Logo LeonCamp
  doc.addImage(IMG_APP_LOGO, 'PNG', 410, MARGIN_TOP, 120, 75);

  // Título factura
  doc.setFontSize(25);
  doc.setTextColor(34, 34, 34);
  doc.text("Factura Reserva", MARGIN_LEFT_COL1, 40);

  // Número de registro del alojamiento
  doc.setFontSize(HEADING_FONT_SIZE);
  doc.setTextColor(HEADING_TEXT_COLOR);
  const registerNumber = 'Nº. registro: ' + bookingData?.idAccomodation?.registerNumber;
  doc.text(registerNumber, MARGIN_LEFT_COL1, 75);

  // Fecha de creación de la reserva
  doc.setFontSize(DEFAULT_FONT_SIZE);
  doc.setTextColor("gray");
  const bookingCreatedAt: string = 'Efectuada el ' + convertArrayToDate(bookingData?.createdAt).toLocaleString();
  doc.text(bookingCreatedAt, MARGIN_LEFT_COL1, 90);

  // -- Columna 1
  // Título: Ciudad
  doc.setFontSize(HEADING_FONT_SIZE);
  doc.setTextColor(HEADING_TEXT_COLOR);
  doc.text(bookingData?.idAccomodation?.idAccomodationLocation.city, MARGIN_LEFT_COL1, POSITION_Y_FIRST_ROW);

  // Incrementar en 20 el eje Y para la siguiente línea
  let positionY = POSITION_Y_FIRST_ROW;

  // Dirección
  const fullAddress =
    bookingData?.idAccomodation?.idAccomodationLocation?.direction +
    ' ' +
    bookingData?.idAccomodation?.idAccomodationLocation?.city +
    ' ' +
    bookingData?.idAccomodation?.idAccomodationLocation?.zip;

  doc.setFontSize(DEFAULT_FONT_SIZE);
  doc.setTextColor(PARAGRAPH_TEXT_COLOR);
  doc.text(fullAddress, MARGIN_LEFT_COL1, positionY += LINE_HEIGHT * 2);

  // Fechas reserva

  // -- Fecha entrada (Check-in)
  const checkIn: string = "Fecha entrada (Check-in): " + convertArrayToDate(bookingData?.checkIn).toLocaleDateString();
  doc.text(checkIn, MARGIN_LEFT_COL1, positionY += LINE_HEIGHT);

  // -- Fecha salida (Check-out)
  const checkOut: string = "Fecha salida (Check-out): " + convertArrayToDate(bookingData?.checkOut).toLocaleDateString();
  doc.text(checkOut, MARGIN_LEFT_COL1, positionY += LINE_HEIGHT);

  // Número noches
  const nights: string = numOfNights + " noches"
  doc.text(nights, MARGIN_LEFT_COL1, positionY += LINE_HEIGHT);

  positionY += LINE_HEIGHT;

  createLineSeparator(MARGIN_LEFT_COL1, positionY);

  doc.setFontSize(HEADING_FONT_SIZE);
  doc.setTextColor(HEADING_TEXT_COLOR);
  doc.text("DATOS DEL ANFITRIÓN", MARGIN_LEFT_COL1, positionY += LINE_HEIGHT * 2);

  // Nombre y apellidos del anfitrión
  doc.setFontSize(DEFAULT_FONT_SIZE);
  doc.setTextColor(PARAGRAPH_TEXT_COLOR);
  doc.text(userData?.name + ' ' + userData?.surname, MARGIN_LEFT_COL1, positionY += LINE_HEIGHT * 2);

  // Email del anfitrión
  doc.text(userData?.email, MARGIN_LEFT_COL1, positionY += LINE_HEIGHT);

  positionY += LINE_HEIGHT;

  createLineSeparator(MARGIN_LEFT_COL1, positionY);

  // Datos del huésped
  doc.setFontSize(HEADING_FONT_SIZE);
  doc.setTextColor(HEADING_TEXT_COLOR);
  doc.text("DATOS DEL HUÉSPED", MARGIN_LEFT_COL1, positionY += LINE_HEIGHT * 2);


  // Nombre y apellidos del huésped que realiza la reserva
  doc.setFontSize(DEFAULT_FONT_SIZE);
  doc.setTextColor(PARAGRAPH_TEXT_COLOR);
  doc.text(currentUserData?.name + ' ' + currentUserData?.surname, MARGIN_LEFT_COL1, positionY += LINE_HEIGHT * 2);
  doc.text(currentUserData?.email, MARGIN_LEFT_COL1, positionY += LINE_HEIGHT);
  // -- Columna 2
  positionY = POSITION_Y_FIRST_ROW;

  // Titulo: Desglose del precio
  doc.setFontSize(HEADING_FONT_SIZE);
  doc.setTextColor(HEADING_TEXT_COLOR);
  doc.text('DESGLOSE DEL PRECIO', MARGIN_LEFT_COL2, positionY);

  // -- Coste Precio / noche x (n noches)
  doc.setFontSize(DEFAULT_FONT_SIZE);
  doc.setTextColor(PARAGRAPH_TEXT_COLOR);

  const pricePerNight: string = bookingData?.idAccomodation?.pricePerNight + '€ x ' + 2 + ' noches';
  doc.text(pricePerNight, MARGIN_LEFT_COL2, positionY += LINE_HEIGHT * 2);

  const amountByNights: string = replaceNullValues(bookingData?.amount) + '€';
  doc.text(amountByNights, MARGIN_LEFT_COL2 + 175, positionY);

  // -- Comisión servicio
  doc.text('Comisión de servicio', MARGIN_LEFT_COL2, positionY += LINE_HEIGHT);
  const serficeFee: string = replaceNullValues(bookingData?.serviceFee) + '€';
  doc.text(serficeFee, MARGIN_LEFT_COL2 + 175, positionY);

  // -- Total (EUR)
  doc.text('Total (EUR)', MARGIN_LEFT_COL2, positionY += LINE_HEIGHT);
  const total: string = replaceNullValues(bookingData?.total) + '€';
  doc.text(total, MARGIN_LEFT_COL2 + 175, positionY);

  positionY += LINE_HEIGHT
  createLineSeparator(MARGIN_LEFT_COL2, positionY);

  // Método de pago empleado
  doc.setFontSize(HEADING_FONT_SIZE);
  doc.setTextColor(HEADING_TEXT_COLOR);
  doc.text('MÉTODO DE PAGO EMPLEADO', MARGIN_LEFT_COL2, positionY += LINE_HEIGHT * 2);

  // True si es tarjeta de crédito o false si es PayPal
  const getPaymentMethod: boolean = bookingData?.idPayment?.cardNumber;

  const paymentType: string = getPaymentMethod ? 'Tarjeta de crédito' : 'PayPal';

  doc.setFontSize(DEFAULT_FONT_SIZE);
  doc.setTextColor(PARAGRAPH_TEXT_COLOR);
  doc.text(paymentType, MARGIN_LEFT_COL2, positionY += LINE_HEIGHT * 2);

  // Número de la tarjeta
  const paymentDetail: string = getPaymentMethod
    ? showCreditCardNumberPartial(bookingData?.idPayment?.cardNumber)
    : bookingData?.idPayment?.accountEmail;

  doc.text(paymentDetail, MARGIN_LEFT_COL2, positionY += LINE_HEIGHT);

  positionY += LINE_HEIGHT
  createLineSeparator(MARGIN_LEFT_COL2, positionY);

  // Estado de la reserva
  doc.setFontSize(HEADING_FONT_SIZE);
  doc.setTextColor(HEADING_TEXT_COLOR);
  doc.text('ESTADO DE LA RESERVA', MARGIN_LEFT_COL2, positionY += LINE_HEIGHT * 2);

  doc.setFontSize(DEFAULT_FONT_SIZE);
  doc.setTextColor(PARAGRAPH_TEXT_COLOR);

  positionY += LINE_HEIGHT * 2;

  // Color de relleno del rectángulo del estado de la reserva.
  showBookingStatusStyle(bookingData?.bookingStatus);
  doc.rect(MARGIN_LEFT_COL2, positionY, 100, LINE_HEIGHT, 'F');

  const bookingStatus: string = bookingData?.bookingStatus;
  doc.text(bookingStatus, MARGIN_LEFT_COL2 + 15, positionY + 15);


  // Fecha generación de factura - con hora
  doc.setTextColor('gray');
  const generatedRecieptDate: string = "Fecha creación: " + new Date().toLocaleString();
  doc.text(generatedRecieptDate, pageWidth / 2, pageHeight - 30, { align: 'center' });

  // Copyright
  doc.setFontSize(10);
  doc.text('Copyright © ' + new Date().getFullYear() + ' · LeonCamp. Todos los Derechos Reservados.', pageWidth - 10, pageHeight / 1.5, null, 90);

  // Guardar PDF
  doc.save(`reserva_${bookingData?.idAccomodation?.registerNumber}__${new Date().getTime()}.pdf`);
};

/**
 * Establece el color de relleno del rectángulo del estado de la reserva.
 * 
 * @param bookingStatus 
 */
const showBookingStatusStyle = (bookingStatus: string): void => {

  let statusColor: string = '';

  switch (bookingStatus) {
    case 'PENDIENTE':
      statusColor = 'orange';
      break;

    case 'CONFIRMADA':
      statusColor = 'green';

      break;
    case 'CANCELADA':
      statusColor = 'red';

      break;
    case 'COMPLETADA':
      statusColor = 'blue';

      break;
    default:
      statusColor = 'orange';
  }

  doc.setFillColor(statusColor);
}

/**
 * Crea una línea recta separadora en la posición indicada con un ancho de <code>LINE_WIDTH</code>
 * 
 * @param x1 
 * @param y1 
 */
const createLineSeparator = (x1: number, y1: number) => {
  let x2: number = x1 + LINE_WIDTH;
  doc.line(x1, y1, x2, y1);
};

const replaceNullValues = (value: string): string => {
  return value ? value : ' - ';
}
