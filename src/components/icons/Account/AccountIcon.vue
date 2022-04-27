<script setup>
defineProps({
  profileImage: {
    type: String,
    default: null,
  },
  username: {
    type: String,
    default: "",
  },
  width: {
    type: Number,
    default: 24,
  },
  height: {
    type: Number,
    default: 24,
  },
});
</script>

<template>
  <img v-if="!profileImage" src="@/assets/img/icons/profile-image-empty.png" alt="" :width="width" :height="height">
  <img v-else :src="profileImage" :alt="username" :width="width" :height="height"/>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

img {
  @include flex-column-center;
  border-radius: 100px;
}
</style>