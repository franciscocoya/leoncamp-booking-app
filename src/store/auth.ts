import { defineStore } from 'pinia';

import { getUserDataById } from '@/services/user/userService';
import { resetPassword } from '@/services/auth/AuthService';

import type { User } from '@/models/user/user.model';

const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    name: '',
    surname: '',
    email: '',
    password: '',
    newPassword: '',
    repeatedPassword: '',
    errors: [] as string[],
    userData: {} as User,
  }),

  actions: {
    async loadCurrentUserData() {
      const userId =
        this.userData?.id ||
        JSON.parse(sessionStorage.getItem('user') || '{}')?.id;
      const userDataResult = await getUserDataById(userId);
      this.userData = userDataResult;
    },

    /**
     * Restablece la contraseña del usuario, si éste está en sesión.
     */
    async resetPasswordLoggedUser() {
      const userId = JSON.parse(sessionStorage.getItem('user') || '{}')?.id;
      await resetPassword(
        userId,
        this.password,
        this.newPassword,
        this.repeatedPassword,
        (err: any) => {
          if (err.data.message) {
            this.errors.push(err.data.message as string);

            if (err.data.errors) {
              err.data.errors.forEach((errMsg: any) => {
                this.errors.push(errMsg?.defaultMessage);
              });
            }
          }
        }
      );
    },
  },
});

export { useAuthStore };
