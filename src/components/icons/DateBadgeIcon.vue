<script setup>
// Icono calendario
import { ICON_CALENDAR_FILLED } from "@/helpers/iconConstants";

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
    <img :src="ICON_CALENDAR_FILLED" alt="" />
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
    width: 13px;
    height: 13px;
    filter: invert(1);
    padding: 3px;
    border-radius: 5px;
    background-color: #fff;
  }
}
</style>