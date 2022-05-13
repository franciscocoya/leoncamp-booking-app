import { defineStore } from 'pinia';

import {SCREEN_BREAKPOINTS} from "@/helpers/utils";

const useAppContextStore = defineStore({
    id: 'app',
    state: () => ({
        isMobile: false,
    }),

    actions: {
        getIsMobile(){
            const isCurrentWidthMobile = document.body.clientWidth < SCREEN_BREAKPOINTS.sm;
            return isCurrentWidthMobile;
        },
    }
});

export { useAppContextStore };