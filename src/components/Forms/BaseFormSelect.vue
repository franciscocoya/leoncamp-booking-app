<script lang="ts" setup>
import { onMounted, Ref, ref } from "vue";

const props = defineProps({
  inputType: {
    type: String,
    default: "text",
  },
  inputLabel: {
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

let disableField: boolean = ref(false).value;

const emit = defineEmits(["handleInput"]);

function updateInputValue(value: string) {
  disableField = false;
  emit("handleInput", value);
}

const disableInput = (disable: boolean) => {
  disableField = disable;
};

onMounted(() => {
  disableField = props.isReadonly;
});
</script>

<template>
  <div
    class="label-input-container"
    @click.prevent="disableInput(false)"
    
    @mouseout="disableInput(true)"
  >
    <label :for="inputLabel">{{ inputLabel }}</label>
    <input
      :id="inputLabel"
      :type="inputType"
      :placeholder="placeholder"
      class="base-input-no-border"
      :value="inputValue"
      :readonly="disableField"
      @input="(e) => updateInputValue((e.target as HTMLOutputElement)?.value)"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.label-input-container {
  position: relative;
  border: 2px solid $color-tertiary-light;
  border-radius: $global-border-radius;

  & > label {
    position: absolute;
    top: 2px;
    left: 8px;
    font-size: 11px;
    color: grey;
  }

  & > input {
    font-size: 14px;
    font-weight: 500;
  }

  & > input:read-only {
    color: gray;
  }
}
</style>