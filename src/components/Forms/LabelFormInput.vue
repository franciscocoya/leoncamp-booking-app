<script lang="ts" setup>

defineProps({
  inputType: {
    type: String,
    default: "text",
  },
  inputLabel: {
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
  <div class="label-input-container">
    <label :for="inputLabel">{{ inputLabel }}</label>
    <input
      :id="inputLabel"
      :type="inputType"
      :placeholder="placeholder"
      class="base-input-no-border"
      :value="inputValue"
      :readonly="isReadonly"
      @input="(e) => updateInputValue((e.target as HTMLOutputElement)?.value)"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.label-input-container{
    position: relative;
    border: 2px solid $color-tertiary-light;
    border-radius: $global-border-radius;

    & > label{
        position: absolute;
        top: 2px;
        left: 8px;
        font-size: 11px;
        color: grey;
    }

    & > input{
        font-size: 14px;
        font-weight: 500;
    }
}

</style>