<script lang="ts" setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  inputType: {
    type: String,
    default: "text",
  },
  inputLabel: {
    type: String,
    default: "",
  },
  inputPlaceholder: {
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
  },
  inputTitle: {
    type: String,
    default: "",
  },
  inputMinCharacters: {
    type: Number,
    default: 1,
  },
  inputMaxCharacters: {
    type: Number,
    default: 20,
  },
  inputNumberMax: {
    type: Number,
    default: 3,
  },
  // Si se selecciona esta opción, el input convertirá el texto a mayúsculas
  // mientras el usuario teclea.
  convertInputToUpper: {
    type: Boolean,
    default: false,
  },
  isPasteAvailable: {
    type: Boolean,
    default: false,
  },
});

let disableField: boolean = ref(false).value;

const emit = defineEmits(["handleInput", "handleBlur"]);

function updateInputValue(value: string) {
  disableField = false;
  emit("handleInput", value);
}

const updateInputValueOnBlur = (value) => {
  disableField = false;
  emit("handleBlur", value);
};

const disableInput = (disable: boolean) => {
  disableField = disable;
};

/**
 * Manejador del evento keydown. Si la propiedad convertInputToUpper es true,
 * se convertirá el texto a mayúsculas mientras el usuario teclea.
 */
const handleKeyDown = (e: { target: { value: string } }) => {
  if (props.convertInputToUpper) {
    e.target.value = e.target.value.toUpperCase();
  }
};

onMounted(() => {
  disableField = props.isReadonly;
  if (props.isPasteAvailable) {
    document
      .getElementById(props.inputLabel)
      ?.addEventListener("paste", (e) => e.preventDefault());
  }
  document
    .getElementById(props.inputLabel)
    ?.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "-") {
        e.preventDefault();
      }
    });
});
</script>

<template>
  <div
    class="label-input-container"
    @click.prevent="disableInput(false)"
    @mouseout="disableInput(true)"
    :title="inputTitle"
  >
    <label :for="inputLabel">{{ inputLabel }}</label>
    <input
      v-if="inputType !== 'number'"
      :id="inputLabel"
      :type="inputType"
      :placeholder="inputPlaceholder"
      class="base-input-no-border"
      :value="inputValue || ''"
      :maxlength="inputMaxCharacters"
      :size="inputMaxCharacters"
      :readonly="isReadonly"
      @input="(e) => updateInputValue((e.target as HTMLOutputElement)?.value)"
      @keyup="(e) => handleKeyDown(e)"
      @blur="(e) => updateInputValueOnBlur((e.target as HTMLOutputElement)?.value)"
    />

    <input
      v-else-if="inputType === 'number'"
      :id="inputLabel"
      :type="inputType"
      :placeholder="1"
      class="base-input-no-border"
      :value="inputValue"
      :readonly="isReadonly"
      :min="1"
      :max="inputNumberMax"
      :step="1"
      @input="(e) => updateInputValue((e.target as HTMLOutputElement)?.value)"
      @blur="(e) => updateInputValueOnBlur((e.target as HTMLOutputElement)?.value)"
    />

    <input
      v-else
      :id="inputLabel"
      type="date"
      class="base-input-no-border"
      :value="inputValue || new Date().getDate()"
      :readonly="disableField"
      :min="new Date().getDate()"
      @blur="(e) => updateInputValueOnBlur((e.target as HTMLOutputElement)?.value)"
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

  & > input:read-only ~ .currency-input-symbol {
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
    width: 100%;
    font-size: 14px;
    font-weight: 500;

    &::placeholder {
      color: gray;
    }
  }

  & > input:read-only {
    color: gray;
    border-color: $color-tertiary-light;
  }

  & > .currency-input-symbol {
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