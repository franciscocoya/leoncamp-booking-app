<script setup>
// Componentes
import BaseError from "@/views/Error/BaseError.vue";
</script>


<template>
  <div class="error-404" v-once>
    <BaseError id="error-404__base_error">
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p>La página que estás buscando no existe.</p>
    </BaseError>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.error-404 > #error-404__base_error {
  & > h1,
  & > h2,
  & > p {
    color: $color-dark;
  }

  & > h1 {
    font-size: 5rem;
    margin: 0;
    background-color: $color-tertiary-light;
    padding: 10px;
  }

  & > h2 {
    font-size: 2rem;
    font-weight: 600;
  }

  & > p {
    font-size: 1rem;
  }
}
</style>