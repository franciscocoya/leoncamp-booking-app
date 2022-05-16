import { defineStore } from 'pinia';

import { getUserDataById } from '@/services/user/userService';

const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    name: '',
    surname: '',
    email: '',
    password: '',
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
  },
});

export { useAuthStore };
