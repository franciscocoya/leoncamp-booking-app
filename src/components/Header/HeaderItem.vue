<script>
import { RouterLink, RouterView } from 'vue-router';

export default {
  name: "HeaderItem",
  components: {
      RouterLink,
      RouterView
  },
  setup(props) {},
};
</script>

<template>
  <header>
       <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/about">Otro</RouterLink>
      </nav>
  </header>
</template>

<style scoped>
</style>