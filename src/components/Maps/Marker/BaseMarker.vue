<script setup>
defineProps({
  text: {
    type: String,
    default: "Hello",
  },
});
</script>

<template>
  <div class="base-marker">
    <h1>{{ text }}</h1>
  </div>
</template>

<style lang="scss" scoped>
</style>