import axios from 'axios';

import { API_USERS, API_USER_CONFIG } from '@/helpers/apiRoutes';

import { handleError } from '../errorHandler';

const apiJwtToken: string = JSON.parse(
  sessionStorage?.getItem('user') || '{}'
)?.token;

/**
 * Comprueba si existe el usuario con el email pasado como parámetro.
 *
 * @param emailToCheck
 * @returns
 */
const checkExistsUser = async (emailToCheck: string) => {
  return await axios
    .get(`${API_USERS}/load/${emailToCheck}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(sessionStorage.getItem('user') || '{}').token
        }`,
      },
    })
    .then((res) => res.data)
    .then((data) => {
      return data;
    })
    .catch((err) => handleError(err));
};

/**
 * Datos de un usuario con el email pasado como parámetro.
 *
 * @param email
 *
 * @returns
 */
const getUserDataById = async (id: number) => {
  const { data } = await axios
    .get(`${API_USERS}/${id}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(sessionStorage.getItem('user') || '{}').token
        }`,
      },
      timeout: 5000,
    })
    .catch((err: Error) => handleError(err));

  return data;
};

const getUserHostDataById = async (
  userId: number,
  callback?: CallableFunction
) => {
  const { data } = await axios
    .get(`${API_USERS}/host/${userId}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(sessionStorage.getItem('user') || '{}').token
        }`,
      },
    })
    .catch((err) => {
      if (err.response) {
        callback(err.response);
      }
    });
};

/**
 * Idioma del usuario con el id pasado como parámetro.
 */
const getUserConfigurationByUserId = async (userId: number) => {
  return await axios
    .get(`${API_USER_CONFIG}/${userId}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(sessionStorage.getItem('user') || '{}').token
        }`,
      },
    })
    .then((res) => res.data)
    .then((data) => {
      return data;
    })
    .catch((err: Error) => handleError(err));
};

/**
 * Actualiza los datos del usuario con id <code>userId</code>
 *
 * @param userId
 * @returns
 */
export const updateUserData = async (
  userId: number,
  name: string,
  surname: string,
  email: string,
  phone: string,
  dni?: string,
  bio?: string,
  callback?: CallableFunction
) => {
  const { data } = await axios({
    url: `${API_USERS}/${userId}`,
    method: 'PUT',
    data: {
      name,
      surname,
      email,
      phone,
    },
    headers: {
      Authorization: `Bearer ${apiJwtToken}`,
    },
  }).catch((err: any) => {
    if (err.response) {
      callback(err.response);
    }
  });

  return data;
};

/**
 * Actualiza los datos de un usuario host con el id <code>userId</code> pasado como parámetro.
 *
 * @param userId
 * @param dni
 * @param bio
 * @param direction
 * @param emailVerified
 * @param dniVerified
 * @param phoneVerified
 * @param verified
 * @param callback
 * @returns
 */
export const updateUserHostData = async (
  userId: number,
  dni: string,
  bio: string,
  direction?: string,
  emailVerified?: boolean,
  dniVerified?: boolean,
  phoneVerified?: boolean,
  verified?: boolean,
  callback?: CallableFunction
) => {
  const { data } = await axios({
    url: `${API_USERS}/hosts/${userId}`,
    method: 'PATCH',
    data: {
      dni,
      bio,
      direction,
      emailVerified,
      dniVerified,
      phoneVerified,
      verified,
    },
    headers: {
      Authorization: `Bearer ${apiJwtToken}`,
    },
  }).catch((err: any) => {
    if (err.response) {
      callback(err.response);
    }
  });

  return data;
};

/**
 * Actualiza la imagen de perfil del usuario con id <code>userId</code>.
 *
 * @param userId
 * @param newImage
 *
 * @returns
 */
const uploadUserProfileImage = async (userId: number, newImage: File) => {
  const { data } = await axios({
    url: `${API_USERS}/profileImage`,
    method: 'patch',
    headers: {
      Authorization: `Bearer ${apiJwtToken}`,
    },
    data: {
      profileImage: newImage,
    },
    params: {
      user: userId,
    },
  });

  return data;
};

/**
 * Listado de valoraciones realizadas por un usuario.
 *
 * @param userId
 * @returns
 */
const getUserReviewsById = async (userId: number) => {
  const { data } = await axios
    .get(`${API_USERS}/reviews/${userId}`, {
      headers: {
        Authorization: `Bearer ${apiJwtToken}`,
      },
    })
    .catch((err: Error) => {
      return err;
    });
  return data;
};

export {
  checkExistsUser,
  getUserDataById,
  getUserConfigurationByUserId,
  uploadUserProfileImage,
  getUserReviewsById,
};
