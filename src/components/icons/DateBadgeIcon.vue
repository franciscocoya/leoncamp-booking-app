<script setup>
// Icono calendario
import { ICON_MENU_CALENDAR_OUTLINE,  ICON_CALENDAR  } from "@/helpers/iconConstants";

defineProps({
  dateText: {
    type: String,
    default: "",
  },

  dateTitle: {
    type: String,
    default: "",
  }
});
</script>

<template>
  <div class="date-formatted-item" :title="dateTitle">
    <span>{{ dateText }}</span>
    <img :src=" ICON_CALENDAR" alt="" />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

.date-formatted-item {
  @include flex-row-center;
  gap: 8px;
  padding: 5px 10px;
  border: 1px solid $color-tertiary-dark;
  border-radius: $global-border-radius;

  // Estilos fecha
  & > span {
    font-size: 12px;
    font-weight: 400;
  }

  // Estilos icono de calendario
  & > img {
    width: 20px;
    height: 20px;
    padding: 3px;
    border-radius: 5px;
    background-color: #fff;
  }
}
</style>