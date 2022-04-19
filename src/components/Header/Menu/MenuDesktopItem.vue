<script>
import { RouterLink } from "vue-router";
import MenuIcon from "./MenuIcon.vue";

export default {
  name: "MenuDesktopItem",
  components: {
    RouterLink,
    MenuIcon,
  },
  setup() {},
};
</script>

<template>
  <nav>
    <!-- Icono de alojamientos guardados -->
    <MenuIcon
      icon="src/assets/img/icons/bookmark-icon.png"
      text="Guardados"
      path="/saved"
    />
    <!-- Icono de reservas realizadas -->
    <MenuIcon
      icon="src/assets/img/icons/calendar-icon.png"
      text="Reservas"
      path="/bookings"
    />
  </nav>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

nav{
  @include flex-row-center;
  gap: 20px;
}
</style>