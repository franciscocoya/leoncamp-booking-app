import { defineStore, acceptHMRUpdate } from 'pinia';

// Servicio de autenticación
import { login, signUp, resetPassword } from '@/services/auth/AuthService';


const useUserStore = defineStore({
  id: 'user',

  state: () => ({
    name: '',
    surname: '',
    email: '',
    password: '',
    newPassword: '',
    repeatedPassword: '',
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
      login(this.email, this.password, (err: any) => {
        console.clear();
        console.log(`Se produjo un error al iniciar sesión: ${err}`);
      });
    },

    /**
     * Realiza el registro de la aplicación con los datos del formulario.
     */
    signUp() {
      signUp(this.name, this.surname, this.email, this.password, this.repeatedPassword, (err: string) => {
        console.error(err);
      });
    },

    resetPass(){
      resetPassword(this.email, this.password, this.newPassword, this.repeatedPassword, (err: string) => {
        console.error(err);
      });
    }
  }
});

export { useUserStore };