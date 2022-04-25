import { defineStore, acceptHMRUpdate } from 'pinia';


const useUserStore = defineStore({
  id: 'user',

  state: () => ({
    email: '',
    password: '',
  }),

  actions: {
  }
});

export{ useUserStore };