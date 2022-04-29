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

/**
 * Actualiza los datos del usuario con id <code>userId</code>
 * 
 * @param userId 
 * @returns 
 */
const updateUserData = async (userId: number, name: string, surname: string, email: string, phone: string) => {
    return await axios.put(`${API_USERS}/${userId}`, {
        data: {
            name,
            surname,
            email,
            phone
        },
        headers: {
            "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem('user') || '{}').token}`
        }

    });
}

/**
 * Actualiza la imagen de perfil del usuario con id <code>userId</code>.
 * 
 * @param userId 
 * @param newImage 
 * 
 * @returns 
 */
const uploadUserProfileImage = async (userId: number, newImage: File) => {
    const { data } = await axios(
        {
            url: `${API_USERS}/profileImage`,
            method: 'patch',
            headers: {
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem('user') || '{}').token}`
            },
            withCredentials: true,
            params: {
                user: userId,
            },
            data: {
                profileImage: newImage
            }
        });

    return data;
};


export {
    checkExistsUser,
    getUserDataById,
    updateUserData,
    uploadUserProfileImage
};