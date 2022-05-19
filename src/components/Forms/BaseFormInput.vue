<script setup>
defineProps({
  inputType: {
    type: String,
    default: "text",
  },
  inputId: {
    type: String,
    default: "",
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

/**
 * Manejador del evento input para actualizar el contenido de este.
 */
function updateInputValue(value) {
  emit("handleInput", value);
}
</script>

<template>
  <div class="input-container">
    <input
      :type="inputType"
      :id="inputId"
      :class="inputStyleClass"
      :value="inputValue"
      :readonly="isReadonly"
      autocomplete="on"
      aria-autocomplete="on"
      :aria-label="inputValue"
      @input="(e) => updateInputValue(e.target.value)"
    />
  </div>
</template>

<style lang="scss" scoped>
.input-container {
  width: 100%;
  & > input {
    width: 100%;
  }
}
</style>