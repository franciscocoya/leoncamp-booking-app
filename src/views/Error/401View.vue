<script setup>
// Componentes
import BaseError from "@/views/Error/BaseError.vue";
</script>


<template>
  <div class="error-401" v-once>
    <BaseError id="error-401__base_error">
      <h1>401</h1>
      <h2>Acceso no autorizado</h2>
      <p>La página o recurso está restringido únicamente a usuarios autorizados.</p>
    </BaseError>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.error-401 > #error-401__base_error {
  & > h1,
  & > h2,
  & > p {
    color: $color-dark;
  }

  & > h1 {
    font-size: 5rem;
    margin: 0;
    color: #FFF;
    background-color: $color-danger;
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