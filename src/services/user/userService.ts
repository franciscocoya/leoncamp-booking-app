import axios from "axios";

import { API_USERS } from "@/helpers/apiRoutes";


/**
 * Comprueba si existe el usuario con el email pasado como parámetro.
 * 
 * @param emailToCheck 
 * @returns 
 */
const checkExistsUser = async (emailToCheck: string) => {
    return await axios.get(`${API_USERS}/load/${emailToCheck}`, {
        headers: {
            "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem('user') || '{}').token}`
        }
    })
        .then((res) => res.data)
        .then((data) => {
            console.log(data);
        }).catch((err) => {
            return err;
        });
};


/**
 * Datos de un usuario con el email pasado como parámetro.
 * 
 * @param email 
 * 
 * @returns 
 */
const getUserDataById = async (id: number) => {
    return await axios.get(`${API_USERS}/${id}`, {
        headers: {
            "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem('user') || '{}').token}`
        }
    })
        .then((res) => res.data)
        .then((data) => {
            return data;
        }).catch((err) => {
            return err;
        });
};

export {
    checkExistsUser,
    getUserDataById
};