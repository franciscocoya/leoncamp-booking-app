import { defineStore } from 'pinia';

import { getUserDataById } from '@/services/user/userService';
import { resetPassword } from '@/services/auth/AuthService';

const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    name: '',
    surname: '',
    email: '',
    password: '',
    newPassword: '',
    repeatedPassword: '',
    errors: [],
    userData: {},
  }),

  actions: {
    async loadCurrentUserData() {
      const userId = JSON.parse(sessionStorage.getItem('user') || '{}')?.id;
      const userData = await getUserDataById(userId);
      this.userData = userData;
    },

    /**
     * Restablece la contraseña del usuario, si éste está en sesión.
     */
    async resetPasswordLoggedUser() {
      let successMsg = null;
      const userId = JSON.parse(sessionStorage.getItem('user') || '{}')?.id;
      await resetPassword(userId, this.password, this.newPassword, this.repeatedPassword, (err) => {

        console.log(err);
        this.errors.push(err.data.message);
        
        if (err.data.errors) {
          err.data.errors.forEach(errMsg => {
            this.errors.push(errMsg.defaultMessage);
          });
        }
      });
    },
  },
});

export { useAuthStore };
