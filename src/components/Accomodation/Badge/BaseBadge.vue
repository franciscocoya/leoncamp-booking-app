<script setup>
defineProps({
  text: {
    type: String,
    default: "",
  },
  backgroundColor: {
    type: String,
    default: "#F0F0F0",
  },
  color: {
    type: String,
    default: "#000",
  },
});
</script>

<template>
  <span
    :style="`background: ${backgroundColor}; color: ${color};`"
    class="base-badge"
  >
    {{ text }}
  </span>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.base-badge {
  padding: 2px 8px;
  border-radius: $global-border-radius;
}
</style>