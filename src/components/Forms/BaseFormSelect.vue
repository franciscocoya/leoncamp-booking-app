<script lang="ts" setup>
import { useAccomodationStore } from "@/store/accomodation";

const accomodationStore = useAccomodationStore();

const props = defineProps({
  inputLabel: {
    type: String,
    default: "",
  },
  options: {
    type: String,
    default: () => {
      [];
    },
  },
  selectId: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["handleChange"]);

function updateInputValue(value: string) {
  const selectedOption = props.options
    .filter((opt) => opt.accomodationCategory === value)
    .shift();
  emit("handleChange", selectedOption);
}
</script>

<template>
  <div class="label-select-container">
    <label :for="inputLabel">{{ inputLabel }}</label>
    <select
      name="accomodation-edit-category"
      :id="selectId"
      @change="(e) => updateInputValue((e.target as HTMLOutputElement)?.value)"
    >
      <option
        v-for="opt in options"
        :key="opt.id"
        :selected="
          opt.accomodationCategory ===
          accomodationStore.category.accomodationCategory
        "
        :value="opt.accomodationCategory"
      >
        {{ opt.accomodationCategory }}
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
    color: grey;
  }

  & > select {
    min-width: max-content;
    width: 100%;
    max-width: 100%;
    height: 45px;
    font-size: 14px;
    font-weight: 500;
    padding: 5px 0 0 5px;
    border: 2px solid $color-tertiary-light;
    border-radius: $global-border-radius;
    color: $color-dark;
    outline: none;
    cursor: pointer;

    & > option {
      padding: 10px 0;
    }
  }
}

// -------------------------------------------------
// -- Responsive design
// -------------------------------------------------
@media screen and (max-width: $breakpoint-sm) {
  .label-select-container {
    & > select {
      width: 100%;
    }
  }
}
</style>