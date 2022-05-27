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
    async resetPasswordLoggedUser(idToSearch?: number) {
      const userId =
        this?.userData?.id ??
        JSON.parse(sessionStorage.getItem('user') || '{}')?.id ??
        idToSearch;
      await resetPassword(
        userId,
        this.password,
        this.newPassword,
        this.repeatedPassword,
        (err: any) => {
          if (err.data.message) {
            this.errors.push(this.translateErrorMessages(err.data.message));
            //this.errors.push('components.forms.messages.current_password.invalid');
          }
        }
      );
    },

    /**
     * i18n errores del formulario -
     *
     * @param errMsg
     * @returns
     */
    translateErrorMessages(errMsg: any) {
      let translateMessage = '';
      const baseMessagePath = 'components.forms.messages';
      switch (errMsg) {
        case 'La contraseña actual es obligatoria':
          translateMessage = `${baseMessagePath}.current_password.required`;
          break;

        case 'La nueva contraseña es obligatoria':
          translateMessage = `${baseMessagePath}.new_password.required`;
          break;

        case 'Es obligatorio repetir la nueva contraseña':
          translateMessage = `${baseMessagePath}.password_confirmation.required`;
          break;

        case 'La contraseña actual es incorrecta':
          translateMessage = `${baseMessagePath}.current_password.invalid`;
          break;

        case 'Las contraseñas no coinciden':
          translateMessage = `${baseMessagePath}.password_confirmation_not_match`;
          break;

        default:
          translateMessage = 'components.forms.messages.default';
          break;
      }

      return translateMessage;
    },
    /**
     * Actualizar los datos del usuario
     * @returns
     */
    async updateUserProfile() {
      const updatedUserData: User = await updateUserData(
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
      if (this.userData.dni && this.userData.bio) {
        this.userData.dni = updatedUserData?.dni!;
        this.userData.bio = updatedUserData?.bio!;
      }
    },

    /**
     * Si el usuario es host, se actualizan los datos respectivos (Dni, biografía, dirección, etc).
     */
    async updateUserHost() {
      await updateUserHostData(
        this.userData?.id,
        this.userData?.dni ?? '',
        this.userData?.bio ?? '',
        this.userData?.direction,
        this.userData?.emailVerified,
        this.userData?.dniVerified,
        this.userData?.phoneVerified,
        this.userData?.verified,
        (err: any) => {
          return err;
        }
      );
    },

    /**
     * Cierre de sesión del
     */
    logout() {
      this.userData = {} as User;
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('data');
      window.location.href = '/';
    },
  },
});

export { useAuthStore };
