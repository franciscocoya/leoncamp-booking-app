import { defineStore } from 'pinia';

import { SCREEN_BREAKPOINTS } from '@/helpers/utils';

import { getAllAvailableCurrencies, getUserConfigurationByUserId } from '@/services/user/userService';

const useAppContextStore = defineStore({
  id: 'app',
  state: () => ({
    isMobile: false,
    isTablet: false,
    appCurrencies: [],
    userConfiguration: {},
    showSearchResults: false,
    isGeolocationSupported: false
  }),

  actions: {
    /**
     * Comprueba si el dispositivo es móvil o no.
     * @returns 
     */
    getIsMobile() {
      const isCurrentWidthMobile =
        document.body.clientWidth < SCREEN_BREAKPOINTS.sm;
      return isCurrentWidthMobile;
    },

    /**
     * Comprueba si la dimensión de pantalla del dispositivo es igual o inferior a una tablet.
     * @returns 
     */
    getIsTabletOrSmaller() {
      const isCurrentWidthTablet =
        document.body.clientWidth < SCREEN_BREAKPOINTS.md;
      return isCurrentWidthTablet;
    },

    /**
     * Carga todas las divisas disponibles.
     */
    async loadAllAvailableCurrencies() {
      this.appCurrencies = await getAllAvailableCurrencies();
    },

    /**
     * Si está disponible, carga la configuración del usuario en sesión.
     */
    async loadUserConfiguration(){
      const config = await getUserConfigurationByUserId(JSON.parse(
        sessionStorage?.getItem('user') || '{}'
      )?.id);

      if(config){
        this.userConfiguration = config;
      }
    }
  },
});

export { useAppContextStore };
