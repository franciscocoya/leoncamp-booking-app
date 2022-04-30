<script setup>
// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";

const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
  regNumber: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="accomodation-image-gallery">
    <div class="accomodation-image-gallery__wrapper">
      <!-- Galería con algunas de las imágenes del alojamiento -->
      <div class="accomodation-image-gallery__images">
        <img
          v-for="(img, index) in props.images"
          :key="index"
          :src="img"
          :id="`${props.regNumber}_image${index}`"
        />
      </div>
      <!-- Botón para mostrar todas las imágenes. Si hay más de 5 imágenes -->
      <div class="button-all-images-container">
        <BaseButton text="Ver todas" buttonStyle="baseButton-dark--filled" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";
.accomodation-image-gallery {
  display: block;
  width: 100%;
  border-radius: $global-border-radius;

  & > .accomodation-image-gallery__wrapper {
    height: 600px;
    position: relative;
    & > .accomodation-image-gallery__images {
      width: 80%;
      height: 100%;
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      grid-template-rows: repeat(4, 1fr);
      border-radius: $global-border-radius;
      margin: 0 auto;
      grid-gap: 10px;
      overflow: hidden;

      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        overflow: hidden;

        // Imagen 1
        &[id*="_image0"] {
          grid-column: 1 / 5;
          grid-row: 1 / 5;
        }

        // Imagen 2
        &[id*="_image1"] {
          grid-column: 5 / 7;
          grid-row: 1 / 3;
        }

        // Imagen 3
        &[id*="_image2"] {
          grid-column: 5 / 7;
          grid-row: 3 / 5;
        }

        // Imagen 4
        &[id*="_image3"] {
          grid-column: 7 / 9;
          grid-row: 1 / 3;
        }

        // Imagen 5
        &[id*="_image4"] {
          grid-column: 7 / 9;
          grid-row: 3 / 5;
        }
      } // fin img
    } // fin accomodation-image-gallery__images

    & > .button-all-images-container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      position: absolute;
      margin: 0 auto;
      bottom: 5%;
      right: 12%;
    }
  } // fin accomodation-image-gallery__wrapper
}
</style>