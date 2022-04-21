<script setup>
import { RouterLink } from "vue-router";
import MenuIcon from "./MenuIcon.vue";
</script>

<template>
  <nav>
    <!-- Icono de alojamientos guardados -->
    <MenuIcon
      icon="src/assets/img/icons/bookmark-icon.svg"
      text="Guardados"
      path="/saved"
    />

    <CalendarIcon />

    <!-- Icono de reservas realizadas -->
    <MenuIcon
      icon="src/assets/img/icons/calendar-icon.svg"
      text="Reservas"
      path="/bookings"
    />
  </nav>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

nav {
  @include flex-row-center;
  gap: 20px;
}
</style>