import { defineStore } from 'pinia';

// Modelo
import type { User } from '@/models/user/user.model';

// Servicio de autenticación
import { login, signUp } from '@/services/auth/AuthService';

// Servicio de usuarios
import { getUserDataById } from '@/services/user/UserService';

// Servicio de alojamientos 
import { getAllUserAccomodations} from '@/services/accomodation/AccomodationService';


const useUserStore = defineStore({
  id: 'user',
  state: (): User => ({
    id: 0,
    name: '',
    surname: '',
    email: '',
    password: '',
    newPassword: '',
    repeatedPassword: '',
    userConfiguration: {
      language: 'es',
      currency: {
        alphanumericCode: 'EUR',
        name: 'Euro',
        code: 'EUR',
      },
    },
    profileImage: '',
    datosHost: {
      dni: '',
      bio: '',
      direction: '',
      emailVerified: false,
      dniVerified: false,
      phoneVerified: false,
      verified: false,
    },
    createdAt: new Date(),
  }),

  getters: {
    /**
         * Comprueba que las contraseñas coincidan.
         */
    isPasswordsMatch(state): boolean {
      return state.password === state.repeatedPassword;
    }
  },

  actions: {
    /**
     * Realiza el login de la aplicación con los datos de email y password.
     */
    login() {
      login(this.email, this.password, (err: Error) => {
        console.clear();
        console.log(`Se produjo un error al iniciar sesión: ${err}`);
      });
    },

    /**
     * Realiza el registro de la aplicación con los datos del formulario.
     */
    signUp() {
      signUp(this.name, this.surname, this.email, this.password, this.repeatedPassword || '', (err: Error) => {
        console.error(err);
      });
    },

    logout(){
      // Eliminar token y datos del usuario.
      sessionStorage.removeItem('user'); 
      sessionStorage.removeItem('data');
      window.location.href = "/";
    },

    /**
     * Restablece la contraseña de un usuario.
     */
    // resetPass(){
    //   resetPassword(this.email, this.password, this.newPassword, this.repeatedPassword, (err: string) => {
    //     console.error(err);
    //   });
    // }

    /**
     * Obtención de los datos del usuario en sesión
     * 
     * @param email 
     */
    async loadUserData() {
      // Nombre y apellidos previamente obtenidos en el login.
      this.id = JSON.parse(sessionStorage.getItem('user') || '{}').id;
      this.name = JSON.parse(sessionStorage.getItem('data') || '{}').name;
      this.surname = JSON.parse(sessionStorage.getItem('data') || '{}').surname;
      this.email = JSON.parse(sessionStorage.getItem('user') || '{}').email;

      const userData = await getUserDataById(JSON.parse(sessionStorage.getItem('user') || '{}').id);
      this.profileImage = userData.profileImage;

      // Si el usuario es host, se mostrarán los siguientes datos.
      const { dni, bio, direction, emailVerified, dniVerified, phoneVerified, verified } = userData;

      this.datosHost = {
        dni,
        bio,
        direction,
        emailVerified,
        dniVerified,
        phoneVerified,
        verified
      }
    },

    /**
     * Listado de todos los alojamientos de un usuario.
     */
    async loadUserAccomodations(){
      return await getAllUserAccomodations(this.id);
    }
  }
});

export { useUserStore };