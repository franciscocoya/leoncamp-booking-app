<script setup>
// Componentes
import BaseError from "@/views/Error/BaseError.vue";
</script>


<template>
  <div class="error-503" v-once>
    <BaseError id="error-503__base_error">
      <h1>503</h1>
      <h2>Servicio no disponible</h2>
      <p>
        En estos momentos, el servidor está sobrecargado. Inténtelo de nuevo más tarde.
      </p>
    </BaseError>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.error-503 > #error-503__base_error {
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