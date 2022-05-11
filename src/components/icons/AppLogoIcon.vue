<script lang="ts" setup>
import { useRouter } from "vue-router";

// Iconos
import { IMG_APP_LOGO } from "@/helpers/iconConstants";

const router = useRouter();

defineProps({
  iconWidth: {
    type: Number,
    default: 250,
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
  <div v-once>
    <img
      :src="iconUrl"
      alt="LeonCamp alquiler de alojamientos turísticos"
      :width="iconWidth"
      :height="iconHeight"
      @click.prevent="router.push('/')"
    />
  </div>
</template>

<style scoped>
img {
  object-fit: contain;
  cursor: pointer;
}
</style>