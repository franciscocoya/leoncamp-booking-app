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

  isPriceInput: {
    type: Boolean,
    default: false,
  }
});

let disableField: boolean = ref(false).value;

const emit = defineEmits(["handleInput"]);

function updateInputValue(value: string) {
  disableField = false;
  // if (
  //   (props.inputType == "number" && Number(value) < 0) ||
  //   isNaN(Number(value)) ||
  //   value.includes("-")
  // ) {
  //   value = "";
  //   props.inputValue = "";
  // } else {
  //   }
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
      v-if="inputType !== 'number'"
      :id="inputLabel"
      :type="inputType"
      :placeholder="placeholder"
      class="base-input-no-border"
      :value="inputValue"
      :readonly="disableField"
      @input="(e) => updateInputValue((e.target as HTMLOutputElement)?.value)"
    />

    <input
      v-else
      :id="inputLabel"
      :type="inputType"
      :placeholder="placeholder"
      class="base-input-no-border"
      :value="inputValue"
      :readonly="disableField"
      :min="`${inputType == 'number' && 1}`"
      :step="`${inputType == 'number' && 1}`"
      @input="(e) => updateInputValue((e.target as HTMLOutputElement)?.value)"
    />

    <span v-if="isPriceInput" class="currency-input-symbol">€</span>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.label-input-container {
  position: relative;
  border: 2px solid $color-tertiary-light;
  border-radius: $global-border-radius;

  & > input:read-only ~ .currency-input-symbol{
    color: gray;
  }

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
    border-color: $color-tertiary-light;
  }

  & > .currency-input-symbol{
    height: 100%;
    color: $color-dark;
    font-size: 1.5rem;
    position: absolute;
    margin: 0;
    padding: 0;
    right: 10px;
    top: 0;
    transform: translateY(15%);
  }
}
</style>