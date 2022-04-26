<script setup>

defineProps({
  text: {
    type: String,
    required: true,
  },
  buttonStyle: {
    type: String,
    required: true,
  }
});

</script>

<template>
  <div>
      <button :class="buttonStyle" @click="$emit('click')">{{ text }}</button>
  </div>
</template>

<style lang="scss" scoped>
</style>