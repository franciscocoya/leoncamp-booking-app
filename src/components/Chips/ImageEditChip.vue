<script setup>
import { IMG_NOT_FOUND_PLACEHOLDER } from "@/helpers/iconConstants";

import { deleteImageFromAccomodation } from "@/services/accomodation/AccomodationService";

const props = defineProps({
  imageData: {
    type: String,
    default: IMG_NOT_FOUND_PLACEHOLDER,
  },
  regNumber: {
    type: Number,
    required: true,
  },
  chipTitle: {
    type: String,
    default: "Haz click aquí para eliminar",
  },
});

/**
 * Manejador de click del icono de borrar imagen.
 */
const handleDeleteCurrentImage = async () => {
  const confirmDelete = window.confirm(
    "¿Estás seguro de que quieres eliminar esta imagen del alojamiento?"
  );

  // Si cancelar el borrado de la imagen, salir de la operación.
  if (!confirmDelete) {
    return;
  }

  // Eliminar la imagen
  await deleteImageFromAccomodation(props.regNumber, props.imageData.id);
  window.location.reload();
};
</script>

<template>
  <div class="image-chip-edit" title="Haz click aquí para eliminar la imagen">
    <img :src="props.imageData.imageUrl" />
    <span class="close-chip" @click.prevent="handleDeleteCurrentImage">
      x
    </span>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

// Estilos chip imagen de un alojamiento
.image-chip-edit {
  width: 100%;
  aspect-ratio: 1;
  border-radius: $global-border-radius;
  position: relative;

  &:hover > img {
    filter: grayscale(75%);
  }

  // Estilos imagen del chip
  & > img {
    width: 100%;
    height: 100%;
    border-radius: $global-border-radius;
    object-fit: cover;
    transition: all 0.2s ease-in;
  }

  // Estilos icono eliminar el alojamiento
  & > .close-chip {
    @include flex-row-center;
    width: 30px;
    height: 30px;
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: $color-danger;
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    border-radius: 30px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.2s ease-in;

    &:hover {
      background-color: $color-secondary;
      color: #fff;
    }
  }
}

// -------------------------------------------------
// -- Responsive design
// -------------------------------------------------
@media screen and (max-width: $breakpoint-sm) {
  .image-chip-edit {
    width: 100%;
    height: auto;
  }
}
</style>