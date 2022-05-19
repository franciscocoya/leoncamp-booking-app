import { defineStore } from 'pinia';

import { getUserDataById } from '@/services/user/userService';
import { resetPassword } from '@/services/auth/AuthService';

import type { User } from '@/models/user/user.model';

import {
  updateUserData,
  updateUserHostData,
} from '@/services/user/userService';

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
    async loadCurrentUserData(newId: number) {
      const userId =
        newId ||
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
    /**
     * Actualizar los datos del usuario
     * @returns
     */
    async updateUserProfile() {
      const updatedUserData = await updateUserData(
        this?.userData?.id,
        this?.userData?.name,
        this?.userData?.surname,
        this?.userData?.email,
        this?.userData?.phone,
        this?.userData?.dni,
        this?.userData?.bio,
        (err: any) => {
          return err;
        }
      );

      this.userData.name = updatedUserData?.name;
      this.userData.surname = updatedUserData?.surname;
      this.userData.email = updatedUserData?.email;
      this.userData.phone = updatedUserData?.phone;

      // Si el usuario es host, se actualizan los siguientes datos.
      if (this.userData.dni) {
        this.userData.dni = updatedUserData.dni;
        this.userData.bio = updatedUserData.bio;
      }
    },

    /**
     * Si el usuario es host, se actualizan los datos respectivos (Dni, biografía, dirección, etc).
     */
    async updateUserHost() {
      await updateUserHostData(
        this.userData.id,
        this.userData.dni,
        this.userData.bio,
        this.userData.direction,
        this.userData.emailVerified,
        this.userData.dniVerified,
        this.userData.phoneVerified,
        this.userData.verified,
        (err: any) => {
          return err;
        }
      );
    },

    /**
     * Cierre de sesión del
     */
    logout() {
      this.userData = {};
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('data');
      window.location.href = '/';
    },
  },
});

export { useAuthStore };
