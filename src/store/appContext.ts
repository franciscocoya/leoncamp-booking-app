import { defineStore } from 'pinia';

import { SCREEN_BREAKPOINTS } from '@/helpers/utils';

const useAppContextStore = defineStore({
  id: 'app',
  state: () => ({
    isMobile: false,
    isTablet: false,
  }),

  actions: {
    getIsMobile() {
      const isCurrentWidthMobile =
        document.body.clientWidth < SCREEN_BREAKPOINTS.sm;
      return isCurrentWidthMobile;
    },

    getIsTabletOrSmaller() {
      const isCurrentWidthTablet =
        document.body.clientWidth < SCREEN_BREAKPOINTS.md;
      return isCurrentWidthTablet;
    },
  },
});

export { useAppContextStore };
