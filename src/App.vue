<script setup>
import { ref, onMounted, defineAsyncComponent } from "vue";
import { useRouter } from "vue-router";
import { authRoutes } from "@/helpers/appRoutes";

import { SCREEN_BREAKPOINTS } from "@/helpers/utils";
import { ICON_RETURN } from "@/helpers/iconConstants";

import { useAppContextStore } from "@/store/appContext";

// Componentes
import MenuMobile from "./components/Header/Menu/MenuMobile.vue";
import FooterItem from "./components/Footer/FooterItem.vue";
import IconButton from "@/components/Buttons/IconButton.vue";

const HeaderItem = defineAsyncComponent(() =>
  import("@/components/Header/HeaderItem.vue")
);

const HeaderMobileItem = defineAsyncComponent(() =>
  import("@/components/Header/HeaderMobileItem.vue")
);

// Diálogos modales
const SearchResultsItem = defineAsyncComponent(() =>
  import("@/components/Header/SearchBar/SearchResultsItem.vue")
);

const appContextStore = useAppContextStore();

// Obtener la ruta actual
const router = useRouter();
const currentRoute = () => router.currentRoute.value.path;

// Comprobar si la ruta actual pertenece a una ruta pública
const isCurrentRoutePublic = () => {
  return !authRoutes.includes(currentRoute());
};

const showSearchResults = ref(false);
const showMenuMobile = ref(false);

let enableHeaderMobile = ref(false);

// Mostrar header mobile
window.addEventListener("resize", () => {
  enableHeaderMobile.value = document.body.clientWidth < SCREEN_BREAKPOINTS.sm;
});

onMounted(() => {
  enableHeaderMobile.value = document.body.clientWidth < SCREEN_BREAKPOINTS.sm;

  appContextStore.isMobile = appContextStore.getIsMobile();
});
</script>

<template class="app-root">
  <HeaderMobileItem
    v-if="enableHeaderMobile == true"
    @showMenuMobile="showMenuMobile = !showMenuMobile"
  />
  <IconButton
    v-if="appContextStore.isMobile == true && currentRoute() !== '/'"
    :buttonIcon="ICON_RETURN"
    buttonStyle="iconButton-return"
    @click="router.go(-1)"
  />
  <HeaderItem
    v-if="isCurrentRoutePublic() && enableHeaderMobile == false"
    @show-search-results="showSearchResults = true"
    @hide-search-results="showSearchResults = false"
  />
  <Transition>
    <MenuMobile v-if="showMenuMobile == true" />
  </Transition>

  <Transition>
    <SearchResultsItem
      v-if="showSearchResults"
      @hide-search-results="showSearchResults = false"
    />
  </Transition>

  <RouterView />

  <FooterItem />
</template>
  
<style lang="scss">
@import "./assets/scss/main.scss";
.app-root {
  position: relative;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
