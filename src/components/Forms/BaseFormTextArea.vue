<script lang="ts" setup>

defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  inputLabel: {
    type: String,
    default: "",
  },
  textAreaContent: {
    type: String,
    default: "",
  },
  inputStyleClass: {
    type: String,
    default: "base-textarea",
  },
  isReadonly: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div>
    <label :for="inputLabel">{{ inputLabel }}</label>
    <textarea
      :id="inputLabel"
      :class="inputStyleClass"
      :value="textAreaContent"
      :placeholder="placeholder"
      @input="$emit('handleInput', $event.target.value)"
    >
    </textarea>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

label {
  font-size: 11px;
  color: gray;
}

textarea {
  @include flex-column;
}
</style>