

/**
 * Obtención del token de usuario
 */
const getUserToken = () => sessionStorage.getItem('user')?.token;

export {
    getUserToken
}