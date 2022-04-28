/**
 * Obtención del token de usuario
 */
const getUserToken = () => sessionStorage.getItem('user')?.token;

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

const convertArrayToDate = (dateArr: number[]): Date => {
  return new Date(dateArr[0], dateArr[1], dateArr[2]);
};

export { getUserToken, formatArrayAsDate, convertArrayToDate };
