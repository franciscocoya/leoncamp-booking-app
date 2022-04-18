<script>
import { RouterLink, RouterView } from "vue-router";
import SearchBarItem from "./SearchBar/SearchBarItem.vue";

export default {
  name: "HeaderItem",
  components: {
    RouterLink,
    RouterView,
    SearchBarItem,
  },
  setup(props) {},
};
</script>

<template>
  <header>
    <img src="" alt="" class="app-logo" />
    <SearchBarItem />
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/saved">Saved</RouterLink>
      <RouterLink to="/upload">Upload</RouterLink>
      <RouterLink to="/account/:username">Account</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
</style>