<script setup>
import { IMG_NOT_FOUND_PLACEHOLDER, ICON_CLOSE } from "@/helpers/iconConstants";

defineProps({
  imageUrl: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["removeImage"]);

const handleExcludeImage = () => {
  emit("removeImage");
};
</script>

<template>
  <div class="accomodation-preview-item">
    <img
      :src="imageUrl"
      alt="Previsualización de la imagen del alojamiento."
      id="accomodation-preview__img"
    />
    <img
      :src="ICON_CLOSE"
      id="accomodation-preview__close"
      @click.prevent="handleExcludeImage"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

// Estilos previsualización de imagen
.accomodation-preview-item {
  position: relative;
  height: max-content;
  & > #accomodation-preview__img {
    width: 250px;
    height: 180px;
    object-fit: cover;
    border-radius: $global-border-radius;
    position: relative;
  }

  &:hover > #accomodation-preview__close{
      display: block;
  }

  & > #accomodation-preview__close {
    display: none;
    width: 16px;
    height: auto;
    padding: 8px;
    border-radius: 50px;
    background: #fff;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: $z-index-2;

    &:hover {
      background-color: $color-tertiary-light;
    }

    & > img {
      width: 20px;
      height: auto;
      padding: 8px;
      border-radius: 50px;
      background: #fff;
      cursor: pointer;
      position: absolute;
    }
  }
}
</style>