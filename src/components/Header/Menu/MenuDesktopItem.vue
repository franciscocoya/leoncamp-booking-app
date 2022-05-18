<script setup>
import { useRouter } from "vue-router";

// Iconos
import MenuIcon from "./MenuIcon.vue";
import {
  ICON_MENU_CALENDAR_OUTLINE,
  ICON_BOOKMARK,
} from "@/helpers/iconConstants";

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
    <MenuIcon
      :icon="ICON_BOOKMARK"
      :text="$t('header.menu.saved')"
      :iconSize="20"
      path="/saved"
    />

    <CalendarIcon />

    <!-- Icono de reservas realizadas -->
    <MenuIcon
      :icon="ICON_MENU_CALENDAR_OUTLINE"
      :text="$t('header.menu.bookings')"
      path="/bookings"
      :iconSize="29"
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