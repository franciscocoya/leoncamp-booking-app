<script setup>

import {IMG_PROFILE_PLACEHOLDER} from "@/helpers/iconConstants";


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
  personalProfilePath: {
    type: String,
    default: "/",
  },
});
</script>

<template>
  <img :src="profileImage || IMG_PROFILE_PLACEHOLDER" :alt="username" :width="width" :height="height"/>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

img {
  @include flex-column-center;
  border-radius: 100px;
}
</style>