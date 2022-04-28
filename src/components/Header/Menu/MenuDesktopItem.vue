<script setup>
import { useRouter } from "vue-router";

// Iconos
import MenuIcon from "./MenuIcon.vue";
import { ICON_CALENDAR, ICON_BOOKMARK } from "@/helpers/iconConstants";

// Store
import { useUserStore } from "@/store/user";
const userStore = useUserStore();

const router = useRouter();

const redirectToUserBookings = () => {
  router.push({
    name: "user-bookings",
    params: {
      username: `${userStore.name}-${userStore.surname}`,
    },
  });
};
</script>

<template>
  <nav>
    <!-- Icono de alojamientos guardados -->
    <MenuIcon :icon="ICON_BOOKMARK" text="Guardados" path="/saved" />

    <CalendarIcon />

    <!-- Icono de reservas realizadas -->
    <MenuIcon
      :icon="ICON_CALENDAR"
      text="Reservas"
      path="/bookings"
      @click="redirectToUserBookings()"
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