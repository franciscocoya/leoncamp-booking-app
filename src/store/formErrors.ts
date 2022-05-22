import { defineStore } from 'pinia';

const useFormErrorsStore = defineStore({
  id: 'form-errors',
  state: () => ({
    errors: [],
    enableNextButton: false,
    enablePreviousButton: true,
  }),
});

export { useFormErrorsStore };
