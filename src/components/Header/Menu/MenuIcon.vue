<script setup>
import { RouterLink } from "vue-router";

defineProps({
  icon: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    default: "",
  },
  iconStyle: {
    type: String,
    required: false,
  },
  path: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },

  iconSize: {
    type: Number,
    default: 24,
  },
});
</script>

<template>
  <div :title="title" v-once>
    <RouterLink :to="path" class="menu-icon">
      <img
        :src="icon"
        :alt="text"
        :style="`width: ${iconSize}px;`"
        class="icon-color"
      />
      <span>{{ text }}</span>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.menu-icon {
  @include flex-column-center;
}

img {
  width: 24px;
}
</style>