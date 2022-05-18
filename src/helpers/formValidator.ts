/**
 * @author Francisco Coya
 * @version v1.0.0
 * @description Validaciones genéricas para los formularios de la aplicación.
 *
 * */

// Expresión regular para validar un email.
const DEFAULT_EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Expresión regular para validar una código postal de españa.
const spanishZipCodeRegex = /^(?:0?[1-9]|[1-4]\d|5[0-2])\d{3}$/;

// Expresión regular para validar un DNI de España.
const DNI_REGEX = /^(\d{8})([A-Z])$/;

// Expresión regular que especifica los tipos de imagen válidos.
const FILE_MIME_TYPES_VALID_REGEX = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/jpg',
  'image/webp',
];

// Tamaño máximo de una imagen.
const MAX_FILE_SIZE = 1024 * 1024 * 1; // 1MB

// ---------------------------------------------------------------------------------------------------------------------
// -- Validaciones campos de texto
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Comprueba que el valor introducido esté definido y no esté vacío.
 *
 * @param value
 * @returns
 */
const checkFieldNotBlank = (value: string): boolean =>
  value !== undefined && value !== null && value !== '';

const checkNumberPositive = (value: number): boolean =>
  !isNaN(value) && value > 0;

/**
 * Comprueba que el valor introducido cumpla con el formato de un email definido.
 *
 * @param value
 * @returns
 */
const checkValidEmail = (value: string): boolean =>
  DEFAULT_EMAIL_REGEX.test(value);

/**
 * Comprueba que el valor pasado como parámetro es un DNI válido.
 * 
 * @param value 
 * @returns 
 */
const checkValidDNI = (dniToCheck: string): boolean => {
  return DNI_REGEX.test(dniToCheck) && _checkValidSpanishDni(dniToCheck.toUpperCase().replace(/\s/, ''));
};

const _checkValidSpanishDni = (dniToCheck: string): boolean => {
  var dni_letters = "TRWAGMYFPDXBNJZSQVHLCKE";
  var letter = dni_letters.charAt( parseInt( dniToCheck, 10 ) % 23 );
  
  return letter == dniToCheck.charAt(8);
}

/**
 * Comprueba que el valor introducido cumpla con el formato de un código postal de españa.
 * @param value
 * @returns
 */
const checkValidSpanishZipCode = (value: string): boolean =>
  spanishZipCodeRegex.test(value);

/**
 * Comprueba que dos contraseñas pasadas como parámetros coincidan.
 *
 * @param password
 * @param repeatedPassword
 * @returns
 */
const checkPasswordMatch = (
  password: string,
  repeatedPassword: string
): boolean => password === repeatedPassword;

/**
 * Comprueba que el valor introducido no contenga caracteres especiales.
 *
 * @param value
 * @returns
 */
const checkFieldNotContainSpecialCharacters = (value: string): boolean =>
  /^[a-zA-Z0-9]+$/.test(value);

// ---------------------------------------------------------------------------------------------------------------------
// -- Validaciones archivos
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Comprueba que el archivo pasado como parámetro no sea mayor que el tamaño máximo.
 *
 * @param fileSize
 * @returns
 */
const checkFileSize = (fileToCheck: File): boolean =>
  fileToCheck.size < MAX_FILE_SIZE;

/**
 * Valida que el formato de imagen pasado como parámtro.
 *
 * @param fileType Extensión del archivo a validar (Por ejemplo, .jpeg)
 * @returns
 */
const checkImageMimeType = (fileToCheck: File): boolean =>
  FILE_MIME_TYPES_VALID_REGEX.includes(fileToCheck.type);

// ---------------------------------------------------------------------------------------------------------------------
// -- Validaciones formularios
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Validación genérrica para los campos de texto.
 *
 * @param value
 * @param minLength
 * @param maxLength
 * @returns
 */
const checkInputStringFieldIsValid = (
  value: string,
  minLength: number,
  maxLength: number,
  containSpecialCharacters?: boolean
): boolean => {
  const cond1 = containSpecialCharacters == true
    ? checkFieldNotContainSpecialCharacters(value)
    : true;
  return (
    checkFieldNotBlank(value) &&
    value.length >= minLength &&
    value.length <= maxLength &&
    cond1
  );
};

/**
 * Validación genérica para los campos numéricos.
 *
 * @param value
 * @param min
 * @param max
 * @returns
 */
const checkInputNumberFieldIsValid = (
  value: number,
  min: number,
  max: number
): boolean => {
  return value && checkNumberPositive(value) && value >= min && value <= max;
};

export {
  checkFieldNotBlank,
  checkValidSpanishZipCode,
  checkValidEmail,
  checkValidDNI,
  checkPasswordMatch,
  checkNumberPositive,
  checkFieldNotContainSpecialCharacters,
  checkFileSize,
  checkImageMimeType,
  checkInputStringFieldIsValid,
  checkInputNumberFieldIsValid,
};
