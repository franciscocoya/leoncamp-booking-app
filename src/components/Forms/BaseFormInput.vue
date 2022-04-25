<script setup>
defineProps({
  inputType: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  inputValue: {
    type: String,
    default: "",
  },
  inputStyleClass: {
    type: String,
    default: "base-input",
  },
});
</script>

<template>
  <div>
    <input
      :type="inputType"
      :placeholder="placeholder"
      :class="inputStyleClass"
      :value="inputValue"
    />
  </div>
</template>

<style lang="scss" scoped>
</style>