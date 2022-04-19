<script>
import {onMounted} from "vue";

export default {
  name: "HomeView",
  setup(props) {
    // const accomodations = ref(Array);

    onMounted(async () => {
      await fetch(
        "http://localhost:8085/api/accomodations/all"
      ).then((res) => res.json())
      .then(data => console.log(data));
    });
  },
};
</script>

<template>
  <h1>Hello</h1>
</template>

<style scoped>
</style>