import { defineStore } from 'pinia';

const useFormErrorsStore = defineStore({
    id: 'form-errors',
    state: () => ({
        errors: [],
        enableNextButton: false,
    }),
});

export { useFormErrorsStore }