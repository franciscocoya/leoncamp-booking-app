<script lang="ts" setup>
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

defineEmits(["handleInput"]);
</script>

<template>
  <div>
    <input
      :type="inputType"
      :placeholder="placeholder"
      :class="inputStyleClass"
      :value="inputValue"
      @input="(e) => (inputValue = e.target.value)"
    />
  </div>
</template>

<style lang="scss" scoped>
</style>