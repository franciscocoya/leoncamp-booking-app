import { accomodationServices } from '@/helpers/accomodationServicesIcons';

/**
 * Obtención del token de usuario
 */
const getUserToken = () =>
  JSON.parse(sessionStorage.getItem('user') || '{}')?.token;

const months = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

const MAX_IMAGES_UPLOAD = 8;

const SCREEN_BREAKPOINTS = {
  xs: 480,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1440,
};

/**
 *
 * Lee una imagen en formato base64 y devuelve una imagen en URL.
 */
const convertImageToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Formatea un fecha de un array a una cadena de texto en formato dd/mm/yy
 * Añade cero por la izquierda si el día o el mes son menores que 10.
 *
 * @param dateArr
 * @returns
 */
const formatArrayAsDate = (dateArr: number[]): string => {
  if (!dateArr || dateArr.length == 0) {
    return '';
  }
  const day = dateArr[2] < 10 ? `0${dateArr[2]}` : dateArr[2];
  const month = dateArr[1] < 10 ? `0${dateArr[1]}` : dateArr[1];
  const year = dateArr[0].toString().substring(2); //2022 -> 22
  return `${day}/${month}/${year}`;
};

/**
 * Convierte una fecha en formato array [yyyy, mm, dd] a una fecha en formato Date [dd/mm/yyyy]
 *
 * @param dateArr
 * @returns
 */
const convertArrayToDate = (dateArr: number[]): Date => {
  return new Date(dateArr[0], dateArr[1], dateArr[2]);
};

/*
 * Devuelve el mes en formato texto.
 * @param month
 * @returns
 */
const getMonthNameByNumber = (month: number): string => {
  return months[month];
};

/**
 * Recibe una fecha en formato array [yyyy, mm, dd] y devuelve una cadena de texto con
el formato dd de MMMM . Por ejemplo, octubre de 2020
 * @param date
 * @returns
 */
const formatArrayAsSimpleStringDate = (date: number[]): string | null => {
  return date ? getMonthNameByNumber(date[1]) + ' de ' + date[0] : null;
};

/**
 * Devuelve el número de días de diferencia entre dos fechas.
 *
 * @param dateStart
 * @param dateEnd
 * @returns
 */
const getDateDiffOnDays = (dateStart: Date, dateEnd: Date): number => {
  return (
    Math.abs(dateEnd.getTime() - dateStart.getTime()) / 1000 / 60 / 60 / 24
  );
};

/**
 * Formatea una fecha en formato Date [dd/mm/yyyy] a una cadena de texto en formato dd/mm/yyyy
 * @param date
 * @returns
 */
const formatDateType1 = (date: Date): string | null => {
  if (date == null) {
    return null;
  }
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month =
    date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  return `${day}/${month}/${date.getFullYear()}`;
};

/**
 * Obtiene el icono asociado al servicio de alojamiento pasado como parámetro.

 * @param id
 * @returns
 */
const getAccomodationServiceImageById = (id: number): string => {
  return accomodationServices.find((service) => (service.id as number) === id)
    ?.icon as string;
};

/**
 * Recibe un texto y devuelve el texto con el número de palabras pasado como parámetro.
 *
 * @param text
 * @param wordCount
 * @returns
 */
const cropTextByWordCount = (text: string, wordCount: number): string => {
  const words = text.split(' ');
  if (words.length > wordCount) {
    return words.slice(0, wordCount).join(' ') + '...';
  }
  return text;
};

/**
 * Devuelve un estilo CSS según el estado de reserva pasado como parámetro.

 * @param bookingStatus
 * @returns
 */
const getStyleBookingStatusBadge = (bookingStatus: string) => {
  let style = {
    backgroundColor: '',
    color: '',
  };
  switch (bookingStatus) {
    case 'PENDIENTE':
      style = {
        backgroundColor: 'orange',
        color: '#FFF',
      };
      break;
    case 'CONFIRMADA':
      style = {
        backgroundColor: 'green',
        color: '#FFF',
      };
      break;
    case 'CANCELADA':
      style = {
        backgroundColor: 'red',
        color: '#FFF',
      };
      break;
    default:
      style = {
        backgroundColor: 'orange',
        color: '#FFF',
      };
  }
  return style;
};

/**
 * Muestra el número de tarjeta <code>cardNumber</code>, pasado como parámetro, de forma parcial.
 * Por ejemplo, si la tarjeta es 1234 5678 9012 3456, se mostrará 1234 XXXX XXXX 3456.
 */
const showCreditCardNumberPartial = (cardNumber: string): string => {
  return (
    cardNumber.substring(0, 4) +
    ' ' +
    cardNumber.substring(4, 8).replace(cardNumber.substring(4, 8), 'XXXX') +
    ' ' +
    cardNumber.substring(8, 12).replace(cardNumber.substring(8, 12), 'XXXX') +
    ' ' +
    cardNumber.substring(12, 16)
  );
};

export {
  getUserToken,
  formatArrayAsDate,
  convertArrayToDate,
  convertImageToBase64,
  getAccomodationServiceImageById,
  formatArrayAsSimpleStringDate,
  getDateDiffOnDays,
  formatDateType1,
  cropTextByWordCount,
  MAX_IMAGES_UPLOAD,
  SCREEN_BREAKPOINTS,
  getStyleBookingStatusBadge,
  showCreditCardNumberPartial,
};
