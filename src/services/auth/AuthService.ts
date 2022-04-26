import axios from "axios";
import { useRouter } from "vue-router";
import { LOGIN_URL, SIGNUP_URL, RESET_PASSWORD_URL } from "@/helpers/apiRoutes";

const router: any = useRouter();

/**
 * Login de la aplicación mediante JWT. 
 * 
 * El token generado por la API se guarda en el sessionStorage para 
 * las siguientes llamadas.
 * 
 * @param email 
 * @param password 
 */
const login = async (email: string, password: string, callback?: Function) => {
    await axios.post(LOGIN_URL, {
        email,
        password
    }
    ).then((res) => res.data)
        .then(data => {
            const { token, email } = data;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('email', email);
            window.location.href = `/`;
        }).catch(err => {
            callback(err);
        });
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
const signUp = async (name: string, surname: string,
    email: string, password: string, repeatedPassword: string,
    callback: Function) => {
    await axios.post(SIGNUP_URL, {
        name,
        surname,
        email,
        password,
        repeatedPassword
    }).then((res) => res.data)
        .then(data => {
            const { name, surname, email } = data;
            // sessionStorage.setItem('token', token);
            window.location.href = `/signin`;
        }).catch(err => {
            let errorMsg: string = "Error al iniciar sesión";
            if (err.response) {
                switch (err.response.status) {
                    case 400:
                        window.location.href = "/signin";
                        break;
                    case 500:
                        errorMsg = "Error en el servidor";
                        break;
                    default:
                        break;
                }
            }
            callback(errorMsg);
        });
};

/**
 * Restablecimiento de contraseña.
 * 
 * @param email 
 * @param password
 * @param newPassword
 * @param repeatedPassword
 */
const resetPassword = async (email: string,
    password: string, newPassword: string,
    repeatedPassword: string, callback: Function) => {
    await axios.post(RESET_PASSWORD_URL, {
        email,
        password,
        newPassword,
        repeatedPassword
    }).then((res) => res.data)
        .then(data => {
            console.log(data);
        }).catch(err => {
            let errorMsg: string = "Error al restablecer la contraseña";
            callback(errorMsg);
        });
};

/**
 * Realiza el logout de la aplicación.
 */
const logout = () => {
    sessionStorage.removeItem('token');
};

export {
    login,
    signUp,
    resetPassword,
    logout
};