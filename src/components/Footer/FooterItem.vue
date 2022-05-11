<script setup>
</script>

<template>
  <footer v-once>
    <p>&copy; 2022 Francisco Coya. Todos los Derechos Reservados.</p>
  </footer>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

footer {
  height: 100px;
  padding: 30px;
  text-align: center;
  background-color: $color-tertiary-light;
  color: $color-dark;
}
</style>