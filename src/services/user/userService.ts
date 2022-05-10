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
  return await axios
    .get(`${API_USERS}/${id}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(sessionStorage.getItem('user') || '{}').token
        }`,
      },
      timeout: 5000,
    })
    .then((res) => res.data)
    .then((data) => {
      return data;
    })
    .catch((err: Error) => handleError(err));
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
const updateUserData = async (
  userId: number,
  name: string,
  surname: string,
  email: string,
  phone: string
) => {
  return await axios({
    url: `${API_USERS}/${userId}`,
    method: 'put',
    data: {
      name,
      surname,
      email,
      phone,
    },
    headers: {
      Authorization: `Bearer ${apiJwtToken}`,
    },
  })
    .then((res) => res.data)
    .then((data) => {
      return data;
    })
    .catch((err: Error) => {
      return err;
    });
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
    withCredentials: true,
    params: {
      user: userId,
    },
    data: {
      profileImage: newImage,
    },
  });

  return data;
};

const getUserReviewsById = async (userId: number) => {
  const { data } = await axios
    .get(`${API_USERS}/reviews/${userId}`, {
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
    .catch((err: Error) => {
      return err;
    });
  return data;
};

export {
  checkExistsUser,
  getUserDataById,
  updateUserData,
  getUserConfigurationByUserId,
  uploadUserProfileImage,
  getUserReviewsById,
};
