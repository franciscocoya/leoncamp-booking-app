<script setup>
import { getAccomodationServiceImageById } from "@/helpers/utils";

const props = defineProps({
  chipText: {
    type: String,
    default: "",
  },
  regNumber: {
    type: Number,
    required: true,
  },
  chipTitle: {
    type: String,
    default: "Haz click aquí para eliminar",
  },
  showIcon : {
    type: Boolean,
    default: false,
  },
  serviceId: {
    type: Number,
    default: null,
  },
  isActiveService: {
    type: Boolean,
    default: false,
  }
});
</script>

<template>
  <div class="text-chip-edit" :title="chipTitle">
    <div class="text-chip-edit__denomination">
      <img v-if="showIcon == true" :src="`${getAccomodationServiceImageById(props.serviceId)}`" alt="" />
      <p>{{props.chipText}}</p>
    </div>
    <input type="checkbox" :checked="isActiveService" />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

// Estilos chip imagen de un alojamiento
.text-chip-edit {
  //   width: fit-content;
  @include flex-row;
  gap: 20px;
  align-items: center;
  width: max-content;
  height: 20px;
  padding: 10px;
  border: 1px solid $color-dark;
  border-radius: $global-border-radius;

  & > .text-chip-edit__denomination {
    @include flex-row;
    gap: 10px;
    width: fit-content;

    & > img {
      width: 24px;
      height: 24px;
      align-self: center;
    }
  }

  // Estilos icono eliminar el alojamiento
  & > input[type="checkbox"] {
    width: 18px;
    height: 18px;
    border: 1px solid $color-dark;
    color: $color-dark;
  }
}
</style>