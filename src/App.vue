<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import HeaderItem from "./components/Header/HeaderItem.vue";
import FooterItem from "./components/Footer/FooterItem.vue";

import SearchResultsItem from "./components/Header/SearchBar/SearchResultsItem.vue";

// Rutas públicas
import { authRoutes } from "@/helpers/appRoutes";

// Obtener la ruta actual
const router = useRouter();
const currentRoute = () => router.currentRoute.value.path;

// Comprobar si la ruta actual pertenece a una ruta pública
const isCurrentRoutePublic = () => {
  return !authRoutes.includes(currentRoute());
};

const showSearchResults = ref(false);
</script>

<template class="app-root">
  <HeaderItem
    v-if="isCurrentRoutePublic()"
    @show-search-results="showSearchResults = true"
    @hide-search-results="showSearchResults = false"
  />
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

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
