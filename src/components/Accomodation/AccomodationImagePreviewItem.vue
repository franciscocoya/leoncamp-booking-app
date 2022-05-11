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
    <div
      id="accomodation-preview__close"
      title="Haz click en la X para excluir la imagen en la subida"
    >
      <svg
        @click.prevent="handleExcludeImage"
        fill="red"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
      >
        <path
          d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"
        />
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

// Estilos previsualización de imagen
.accomodation-preview-item {
  position: relative;
  height: max-content;
  & > #accomodation-preview__img {
    width: 400px;
    height: auto;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: $global-border-radius;
    position: relative;
    overflow: hidden;
  }

  &:hover > #accomodation-preview__close {
    @include flex-row-center;
  }

  & > #accomodation-preview__close {
    display: none;
    width: 100%;
    height: 100%;
    padding: 8px;
    background: #fff;
    position: absolute;
    border-radius: $global-border-radius;
    background-color: $color-danger-light;
    border: 2px solid $color-danger;
    top: 0;
    right: 0;
    z-index: $z-index-2;
    opacity: 0.75;

    & > svg {
      width: 50%;
      fill: $color-danger;
      height: auto;
      padding: 8px;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);

      &:hover {
        transform: scale(1.1);
        fill: red;
      }
    }
  }
}
</style>