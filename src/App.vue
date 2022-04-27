<script lang="ts" setup>
import { useRouter } from "vue-router";

import HeaderItem from "./components/Header/HeaderItem.vue";

// Rutas públicas
import { authRoutes } from "@/helpers/appRoutes";

// Obtener la ruta actual
const router = useRouter();
const currentRoute = () => router.currentRoute.value.path;

// Comprobar si la ruta actual pertenece a una ruta pública
const isCurrentRoutePublic = () => {
  return !authRoutes.includes(currentRoute());
};
</script>

<template>
  <HeaderItem v-if="isCurrentRoutePublic()" />
  <RouterView />
</template>
  
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
