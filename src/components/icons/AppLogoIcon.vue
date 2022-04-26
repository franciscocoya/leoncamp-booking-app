<script lang="ts" setup>

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
    default: "@/assets/img/logo.png",
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