<script setup>

// Componentes
import BaseError from "@/views/Error/BaseError.vue";

</script>


<template>
  <div class="error-500" v-once>
    <BaseError id="error-500__base_error">
      <h1>500</h1>
      <h2>Error en el servidor</h2>
      <p>
        Estamos teniendo problemas para procesar su petición. Inténtelo de nuevo
        más tarde.
      </p>
    </BaseError>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.error-500 > #error-500__base_error {
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