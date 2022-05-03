import { accomodationServices } from '@/helpers/accomodationServicesIcons';

/**
 * Obtención del token de usuario
 */
const getUserToken = () => sessionStorage.getItem('user')?.token;

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

/**
 * Formatea un fecha de un array a una cadena de texto en formato dd/mm/yy
 * Añade cero por la izquierda si el día o el mes son menores que 10.
 *
 * @param dateArr
 * @returns
 */
const formatArrayAsDate = (dateArr: Number[]): string => {
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

/**
 *
 * Lee una imagen en formato base64 y devuelve una imagen en URL.
 */
 const convertImageToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

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
const formatArrayAsSimpleStringDate = (date: number[]): string => {
  return getMonthNameByNumber(date[1]) + ' de ' + date[0];
};

/**
 * Obtiene el icono asociado al servicio de alojamiento pasado como parámetro.

 * @param id
 * @returns
 */
const getAccomodationServiceImageById = (id: number): string => {
  return accomodationServices.find((service) => service.id === id)?.icon;
};

export {
  getUserToken,
  formatArrayAsDate,
  convertArrayToDate,
  getAccomodationServiceImageById,
  formatArrayAsSimpleStringDate,
};
