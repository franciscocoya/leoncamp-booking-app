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

//import BasePreloader from "@/components/Preloader/BasePreloader.vue";

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

const showMenuMobile = ref(false);

let enableHeaderMobile = ref(false);

// Mostrar header mobile
window.addEventListener("resize", () => {
  enableHeaderMobile.value = document.body.clientWidth < SCREEN_BREAKPOINTS.sm;
});

let prevScrollpos = window.pageYOffset;

const handleShowMenuMobile = (e) => {
  if (appContextStore.isMobile === true) {
    const header = document.querySelector("#header-mobile-item");
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      header.style.top = "87vh";
    } else {
      header.style.top = "100%";
    }
    prevScrollpos = currentScrollPos;
  }
};

onMounted(() => {
  enableHeaderMobile.value = document.body.clientWidth < SCREEN_BREAKPOINTS.sm;

  appContextStore.isMobile = appContextStore.getIsMobile();
  appContextStore.isTablet = appContextStore.getIsTabletOrSmaller();

  window.addEventListener("scroll", handleShowMenuMobile);
});
</script>

<template class="app-root">
  <HeaderMobileItem
    v-if="enableHeaderMobile == true"
    id="header-mobile-item"
    @showMenuMobile="showMenuMobile = !showMenuMobile"
  />
  <IconButton
    v-if="appContextStore.isMobile == true && currentRoute() !== '/'"
    :buttonIcon="ICON_RETURN"
    buttonStyle="iconButton-return"
    @click="router.go(-1)"
  />
  <HeaderItem v-if="isCurrentRoutePublic() && enableHeaderMobile == false" />
  <Transition name="slide-fade">
    <MenuMobile
      v-if="showMenuMobile == true"
      @hideMenu="() => (showMenuMobile = !showMenuMobile)"
    />
  </Transition>

  <Transition name="fade">
    <SearchResultsItem
      v-if="appContextStore.showSearchResults == true"
      @hide-search-results="appContextStore.showSearchResults = false"
    />
  </Transition>

  <RouterView />

  <FooterItem />
</template>
  
<style lang="scss">
@import "./assets/scss/main.scss";
.app-root {
  @include flex-column;
  position: relative;
}
</style>
