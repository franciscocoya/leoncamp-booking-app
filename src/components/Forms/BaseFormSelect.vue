<script setup>
// i18n
import { translateCategory } from "@/helpers/i18nTranslations";

const props = defineProps({
  inputLabel: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    default: () => [],
  },
  selectId: {
    type: String,
    default: "",
  },
  selectedOption: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["handleChange", "handleBlur"]);

/**
 * Envia al emit la opción de categoría seleccionada.
 */
const updateInputValue = (value) => {
  const selectedOption = props.options
    .filter((opt) => opt.accomodationCategory === value)
    .shift();
  emit("handleChange", selectedOption);
};

const handleBlur = () => {
  emit("handleBlur");
};
</script>

<template>
  <div class="label-select-container">
    <label :for="inputLabel">{{ inputLabel }}</label>
    <select
      name="accomodation-edit-category"
      :id="selectId"
      @change="(e) => updateInputValue(e.target.value)"
      @blur="handleBlur"
    >
      <option value="-" selected v-if="selectedOption != ''">
        {{ $t("components.forms.select.default_option") }}
      </option>
      <option
        v-for="opt in options"
        :key="opt.id"
        :selected="opt.id === selectedOption"
        :value="$t(`accomodation_categories[${opt.id - 1}]`)"
      >
        {{ $t(`accomodation_categories[${opt.id - 1}]`) }}
      </option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.label-select-container {
  position: relative;

  & > label {
    position: absolute;
    top: 2px;
    left: 8px;
    font-size: 11px;
    color: $color-dark;
  }
}

// -------------------------------------------------
// -- Responsive design
// -------------------------------------------------
@media screen and (max-width: $breakpoint-sm) {
  .label-select-container {
    & > select {
      width: 100%;

      &:focus{
      outline: 2px solid $color-dark;
    }
    }
  }
}
</style>