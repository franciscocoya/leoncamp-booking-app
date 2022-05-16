<script setup>
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
  <div class="accomodation-image-gallery" v-if="images.length > 0">
    <div class="accomodation-image-gallery__wrapper">
      <!-- Galería con algunas de las imágenes del alojamiento -->
      <div class="accomodation-image-gallery__images">
        <img
          v-for="(img, index) in props.images.slice(0, 5)"
          :key="index"
          :src="img.imageUrl"
          :id="`${props.regNumber}_image${index}`"
        />
      </div>
    </div>
    <!-- Botón para mostrar todas las imágenes. Si hay más de 5 imágenes -->
    <BaseButton
      text="Ver todas"
      buttonStyle="baseButton-dark--filled"
      id="bt-show-all-accomodation-images"
    />
  </div>
  <div v-else>No hay imágenes</div>
</template>


<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";
.accomodation-image-gallery {
  position: relative;
  border-radius: $global-border-radius;

  & > .accomodation-image-gallery__wrapper {
    height: 500px;
    & > .accomodation-image-gallery__images {
      height: 100%;
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      grid-template-rows: repeat(4, 1fr);
      border-radius: $global-border-radius;
      margin: 0 auto;
      grid-gap: 10px;
      overflow: hidden;

      // Posicionamiento imágenes grid galería
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
  } // fin accomodation-image-gallery__wrapper

  & > #bt-show-all-accomodation-images {
    position: absolute;
    top: 5%;
    right: 12%;
    z-index: $z-index-3;
  }
}

// ---------------------------------------------------------------
// -- Responsive design
// ---------------------------------------------------------------
@media (max-width: $breakpoint-sm) {
  .accomodation-image-gallery {
    & > .accomodation-image-gallery__wrapper {
      height: 300px;
    }
  }
}
</style>