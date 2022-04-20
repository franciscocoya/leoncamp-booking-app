<script setup>
import { defineComponent, onMounted } from "vue";
import { RouterLink } from "vue-router";

defineProps({
  icon: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  iconStyle: {
    type: String,
    required: false,
  },
  path: {
    type: String,
    required: true,
  },
});

onMounted(() => {
  console.log("MenuIcon mounted");
});

defineComponent({
  RouterLink,
});
</script>

<template>
  <div>
    <RouterLink :to="path" class="menu-icon">
      <img :src="icon" :alt="text" :width="iconSize" class="icon-color" />
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