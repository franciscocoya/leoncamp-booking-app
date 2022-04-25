import axios, { type AxiosResponse } from "axios";

const LOGIN_URL = import.meta.env.VITE_API_LOGIN_URL;

/**
 * Login de la aplicación mediante JWT. 
 * 
 * El token generado por la API se guarda en el sessionStorage para 
 * las siguientes llamadas.
 * 
 * @param email 
 * @param password 
 */
const login = async (email: string, password: string) => {
    await axios.post(LOGIN_URL, {
        email,
        password
    }
    ).then((res) => res.data)
        .then(data => {
            const { token } = data;
            sessionStorage.setItem('token', token);
        })
        .catch(err => console.log(`Error en el login: ${err}`));
};

const logout = () => {
    sessionStorage.removeItem('token');
};

export {
    login,
    logout
};