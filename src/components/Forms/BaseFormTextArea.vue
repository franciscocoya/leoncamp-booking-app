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
  inputTitle: {
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
  textAreaColums: {
    type: Number,
    default: 20,
  },
  textAreaRows: {
    type: Number,
    default: 5,
  },
});

const emit = defineEmits(["handleInput"]);

function updateInputValue(value: string) {
  emit("handleInput", value);
}
</script>

<template>
  <div class="base-textarea-item" :title="inputTitle">
    <label :for="inputLabel">{{ inputLabel }}</label>
    <textarea
      :id="inputLabel"
      :class="inputStyleClass"
      :value="textAreaContent"
      :placeholder="placeholder"
      :cols="textAreaColums"
      :rows="textAreaRows"
      autocomplete="on"
      @input="(e) => updateInputValue((e.target as HTMLOutputElement).value)"
    >
    </textarea>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.base-textarea-item {
  position: relative;

  & > label {
    font-size: 11px;
    color: gray;
    position: absolute;
    top: 5px;
    left: 10px;
  }

  & > textarea {
    @include flex-column;
    box-sizing: content-box;
    width: 100%;
    height: 100px;
    padding-top: 20px;
    outline: none;
  }
}

// -------------------------------------------------
// -- Responsive design
// -------------------------------------------------
@media screen and (max-width: $breakpoint-sm) {
  .base-textarea-item > textarea {
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>