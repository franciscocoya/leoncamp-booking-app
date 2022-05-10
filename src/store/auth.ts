import { defineStore } from 'pinia';

const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        errors: [],
    })
});

export { useAuthStore };