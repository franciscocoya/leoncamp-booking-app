<script>
import { RouterLink } from "vue-router";

export default {
  name: "MenuIcon",
  components: {
    RouterLink,
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  setup(props) {},
};
</script>

<template>
  <div>
    <RouterLink :to="path" class="menu-icon">
      <img :src="icon" :alt="text" :width="iconSize" />
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