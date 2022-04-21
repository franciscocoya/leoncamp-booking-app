

<script lang="ts">
import HeaderItem from "./components/Header/HeaderItem.vue";

export default {
  name: "App",
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
@import "./assets/scss/main.scss";
</style>
