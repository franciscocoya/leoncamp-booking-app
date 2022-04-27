<script setup>
import MenuIcon from "./MenuIcon.vue";

// Iconos 
import {ICON_CALENDAR, ICON_BOOKMARK} from '@/helpers/iconConstants';

</script>

<template>
  <nav>
    <!-- Icono de alojamientos guardados -->
    <MenuIcon
      :icon="ICON_BOOKMARK"
      text="Guardados"
      path="/saved"
    />

    <CalendarIcon />

    <!-- Icono de reservas realizadas -->
    <MenuIcon
      :icon="ICON_CALENDAR"
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