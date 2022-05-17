import axios from 'axios';
import { LOGIN_URL, SIGNUP_URL, RESET_PASSWORD_LOGGED_USER } from '@/helpers/apiRoutes';

// Servicio usuarios
import { getUserDataById } from '@/services/user/userService';

let apiJwtToken: string = JSON.parse(sessionStorage.getItem('user') || '{}')?.token;

/**
 * Login de la aplicación mediante JWT.
 *
 * El token generado por la API se guarda en el sessionStorage para
 * las siguientes llamadas.
 *
 * @param email
 * @param password
 */
const login = async (
  email: string,
  password: string,
  callback: CallableFunction
) => {
  try {
    await axios
      .post(LOGIN_URL, {
        email,
        password,
      })
      .then((res) => {
        return res.data;
      })
      .then(async (data) => {
        const {
          token,
          email,
          id,
        }: { token: string; email: string; id: number } = data;

        sessionStorage.setItem(
          'user',
          JSON.stringify(
            {
              token,
              email,
              id,
            } || {}
          )
        );
        window.location.href = '/';
      });
  } catch (err: any) {
    if (err.response) {
      callback(err?.response);
    }
  }

  if (JSON.parse(sessionStorage.getItem('user') as string)?.id) {
    // Obtener datos de usuario
    const {
      name,
      surname,
    }: { name: Promise<string>; surname: Promise<string> } =
      await getUserDataById(
        JSON.parse(sessionStorage.getItem('user') || '{}')?.id
      );

    // Redireccionar a su cuenta personal.
    window.location.href = `/account/${name}-${surname}/profile`;
  }
};

/**
 * Registro de un usuario en la aplicación.
 *
 * @param name
 * @param surname
 * @param email
 * @param password
 * @param repeatedPassword
 * @param callback
 *
 */
const signUp = async (
  name: string,
  surname: string,
  email: string,
  password: string,
  repeatedPassword: string,
  callback?: CallableFunction
) => {
  let res = null;
  try {
    const { data } = await axios({
      url: SIGNUP_URL,
      method: 'POST',
      data: {
        name,
        surname,
        email,
        password,
        repeatedPassword,
      },
    });

    res = data;
  } catch (err: any) {
    if (err) {
      callback(err.response);
    }
  }

  return res;
};

/**
 * Restablecimiento de contraseña.
 *
 * @param email
 * @param password
 * @param newPassword
 * @param repeatedPassword
 */
const resetPassword = async (
  userId: number,
  password: string,
  newPassword: string,
  repeatedPassword: string,
  callback?: CallableFunction
) => {
  await axios({
    url: `${RESET_PASSWORD_LOGGED_USER}/${userId}/password/reset`,
    method: 'PUT',
    data: {
      oldPassword: password,
      newPassword,
      newPasswordRepeated: repeatedPassword,
    },
    headers: {
      Authorization: `Bearer ${apiJwtToken}`,
    }
  }).catch(err => {
    if (err.response) {
      callback(err.response);
    }
  });
};

/**
 * Realiza el logout de la aplicación.
 */
const logout = () => {
  sessionStorage.removeItem('user');
};

export { login, signUp, resetPassword, logout };
