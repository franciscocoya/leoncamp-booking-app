<script setup>
// i18n
import { translateAmenity } from "@/helpers/i18nTranslations";

defineProps({
  text: {
    type: String,
    required: true,
  },
  buttonStyle: {
    type: String,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  buttonWidth: {
    type: String,
  },
  buttonId: {
    type: String,
  },
  title: {
    type: String,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["input"]);

const handleInput = (fileValue) => {
  emit("input", fileValue);
};
</script>

<template>
  <form class="button-upload-image">
    <label for="">{{text}}</label>
    <input
      type="file"
      accept="image/jpeg, image/png, iamge/gif"
      :id="buttonId"
      :title="isDisabled == true ? 'Has llegado al límite de imágenes. Elimina alguna para poder subir una nueva imagen.' : title"
      :disabled="isDisabled == true"
      @input="(e) => handleInput(e.target.files[0])"
    />
  </form>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.button-upload-image {
  @include flex-row-center;

  position: relative;
  margin-top: 20px;

  &:hover > label {
    background-color: $color-dark;
    color: #fff;
  }

  & > label {
    @include flex-row-center;
    width: 50%;
    height: 45px;
    border: 2px solid $color-dark;
    border-radius: $global-border-radius;
    text-align: center;
    transition: background-color 0.2s ease;
  }

  // El input se oculta.
  & > input {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;

    &:disabled{
      cursor: not-allowed;
    }
  }
}
</style>