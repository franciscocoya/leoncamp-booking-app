import axios from 'axios';

import { API_USERS, API_USER_CONFIG, API_CONFIG } from '@/helpers/apiRoutes';

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
  if (isNaN(id)) {
    return null;
  }

  const { data }: any = await axios
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

/**
 * Obtiene los datos de un usuario host por su id.
 * @param userId
 * @param callback
 */
// const getUserHostDataById = async (
//   userId: number,
//   callback?: CallableFunction
// ) => {
//   const { data }: any = await axios
//     .get(`${API_USERS}/host/${userId}`, {
//       headers: {
//         Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('user') || '{}').token
//           }`,
//       },
//     })
//     .catch((err) => {
//       if (err.response && callback) {
//         callback(err.response);
//       }
//     });
// };

/**
 * Idioma del usuario con el id pasado como parámetro.
 */
const getUserConfigurationByUserId = async (userId: number) => {
  return await axios
    .get(`${API_USER_CONFIG}/${userId}`, {
      headers: {
        Authorization: `Bearer ${apiJwtToken}`,
      },
    })
    .then((res) => res.data)
    .then((data) => {
      return data;
    })
    .catch((err: Error) => handleError(err));
};

/**
 * Actualiza la configuración del usuario.
 *
 * @param userId
 * @param configData
 */
const updateUserConfiguration = async (
  userId: number,
  configData: any,
  callback?: CallableFunction
) => {
  const { data }: any = await axios({
    url: `${API_CONFIG}/${userId}`,
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${apiJwtToken}`,
    },
    data: configData,
  }).catch((err) => {
    if (err.response && callback) {
      callback(err.response);
    }
  });

  return data;
};

/**
 * Actualización de un usuario base a un usuario host.
 *
 * @param userId
 * @param dni
 * @param direction
 */
export const upgradeBaseUserToHost = async (
  userId: number,
  dni: string,
  direction: string,
  callback?: CallableFunction
) => {
  const { data }: any = await axios({
    url: `${API_USERS}/hosts/${userId}/upgrade`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiJwtToken}`,
    },
    params: {
      dni,
      direction,
    },
  }).catch((err) => {
    if (err.response && callback) {
      callback(err.response);
    }
  });

  return data;
};

/**
 * Restablece la cuenta de host a una cuenta base. En el proceso, se perderán todos los alojamientos realizados por el usuario.
 *
 * @param userId
 * @param callback
 * @returns
 */
export const downgradeUserHostToBaseUser = async (
  userId: number,
  callback?: CallableFunction
) => {
  const { data }: any = await axios({
    url: `${API_USERS}/hosts/${userId}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${apiJwtToken}`,
    },
  }).catch((err) => {
    if (err.response && callback) {
      callback(err.response);
    }
  });

  return data;
};

/**
 * Listado de todos los idiomas disponibles en la aplicación.
 *
 * @returns
 */
const getAllAvailableCurrencies = async (callback?: CallableFunction) => {
  const { data }: any = await axios
    .get(`${API_CONFIG}/currencies/all`, {
      headers: {
        Authorization: `Bearer ${apiJwtToken}`,
      },
    })
    .catch((err: any) => {
      if (err.response && callback) {
        callback(err.response);
      }
    });

  return data;
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
  const { data }: any = await axios({
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
    if (err.response && callback) {
      callback(err.response);
    }
  });

  return data;
};

/**
 * Borrado del usuario con id <code>userId</code>.
 *
 * @param userId
 * @param callback
 */
export const removeUserById = async (
  userId: number,
  callback?: CallableFunction
) => {
  await axios
    .delete(`${API_USERS}/${userId}`, {
      headers: {
        Authorization: `Bearer ${apiJwtToken}`,
      },
    })
    .catch((err: any) => {
      if (err.response && callback) {
        callback(err.response);
      }
    });
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
  const { data }: any = await axios({
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
    if (err.response && callback) {
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
const uploadUserProfileImage = async (userId: number, newImage: string) => {
  const { data }: any = await axios({
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
  const { data }: any = await axios
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

/**
 * Listado de todos los usuarios de la aplicación.
 */
const getAllUsers = async () => {
  const { data }: any = await axios
    .get(`${API_USERS}/all`, {
      headers: {
        Authorization: `Bearer ${apiJwtToken}`,
      },
    })
    .catch((err: Error) => {
      return err;
    });
  return data;
};

/**
 * Crea una configuración para el usuario con id <code>userId</code>.
 *
 * @param userId
 * @param configData
 */
const addUserConfigurationToUser = async (userId: number, configData: any) => {
  let newConfig = await axios({
    url: `${API_CONFIG}/new`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiJwtToken}`,
    },
    data: configData,
  });

  let newConfigId = await newConfig.data.id;

  let newUserConfig = await axios({
    url: `${API_USER_CONFIG}/${userId}`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiJwtToken}`,
    },
    data: configData,
  });
};

export {
  checkExistsUser,
  getUserDataById,
  getUserConfigurationByUserId,
  updateUserConfiguration,
  uploadUserProfileImage,
  getUserReviewsById,
  getAllAvailableCurrencies,
  getAllUsers,
  addUserConfigurationToUser,
};
