<script lang="ts">
import HeaderItem from "./components/Header/HeaderItem.vue";

export default {
  name: "AccountIcon",
  components: {
    HeaderItem,
  },
  setup() {},
};
</script>

<template>
  <HeaderItem />
  <RouterView />
</template>
  
<style lang="scss">
@import "./assets/scss/_variables.scss";
  p{
    color: $color;
  }
</style>
