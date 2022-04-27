<script setup>
defineProps({
  profileImage: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <img :src="profileImage" :alt="username" @click.prevent="" />
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

img {
  @include flex-column-center;
  border-radius: 25px;
}
</style>