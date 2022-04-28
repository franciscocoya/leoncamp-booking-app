<script lang="ts" setup>

// Iconos
import {IMG_APP_LOGO} from "@/helpers/iconConstants";

defineProps({
  iconWidth: {
    type: Number,
    default: 200,
  },
  iconHeight: {
    type: Number,
    default: 120,
  },
  iconUrl: {
    type: String,
    default: IMG_APP_LOGO,
  },
});
</script>

<template>
  <div>
    <img
      :src="iconUrl"
      alt="LeonCamp alquiler de alojamientos turísticos"
      :width="iconWidth"
      :height="iconHeight"
    />
  </div>
</template>

<style scoped>
img {
  object-fit: contain;
}
</style>