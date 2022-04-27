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
  isReadonly: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["handleInput"]);

function updateInputValue(value: string) {
  emit("handleInput", value);
}
</script>

<template>
  <div>
    <input
      :type="inputType"
      :placeholder="placeholder"
      :class="inputStyleClass"
      :value="inputValue"
      :readonly="isReadonly"
      @input="(e) => updateInputValue(e.target.value)"
    />
  </div>
</template>

<style lang="scss" scoped>
</style>