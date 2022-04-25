<script lang="ts" setup>
import { useRoute } from 'vue-router'

import HeaderItem from "./components/Header/HeaderItem.vue";

// TODO: condición para saber ruta y establecer header si es Home.
const isLogging = sessionStorage.getItem('token') ;

const router = useRoute();
console.log(router.path);
</script>

<template>
  <HeaderItem v-if="isLogging"/>
  <RouterView />
</template>
  
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
