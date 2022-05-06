<script setup>
import { onMounted, ref } from "vue";
import { getAccomodationServiceImageById } from "@/helpers/utils";

import { useAccomodationStore } from "@/store/accomodation";
const accomodationStore = useAccomodationStore();

const props = defineProps({
  chipText: {
    type: String,
    default: "",
  },
  regNumber: {
    type: String,
    default: ""
  },
  chipTitle: {
    type: String,
    default: "Haz click aquí para eliminar",
  },
  showIcon: {
    type: Boolean,
    default: false,
  },
  serviceId: {
    type: Number,
    default: null,
  },
  accServices: {
    type: Array,
    default: () => [],
  },
});

const isServiceEnabled = ref(false);

/**
 * Manejador del evento de cambio de estado del checkbox del servicio.
 * Si el servicio está seleccionado, se añade a la lista de servicios de la store del alojamiento actual.
 * Si no lo está, se elimina de la lista.
 */
const handleCheckBoxChange = (e) => {
  console.log(e.target.checked);
  isServiceEnabled.value = e.target.checked;
  // Si se selecciona, añadir a la lista de servicios existentes
  if (e.target.checked) {
    accomodationStore.accomodationServices.push({
      accomodationAccServiceId: {
        idAccomodation: accomodationStore.registerNumber,
        idAccomodationService: {
          denomination: props.chipText,
          id: props.serviceId,
        },
      },
    });
  }else{
    // Si no, eliminar de la lista
    accomodationStore.accomodationServices.filter((service) => {
      return service.accomodationAccServiceId.idAccomodationService.id !== props.serviceId;
    });
  }
};

onMounted(() => {
  props.accServices.forEach((accService) => {
    if (
      accService.accomodationAccServiceId.idAccomodationService.id ===
      props.serviceId
    ) {
      isServiceEnabled.value = true;
    }
  });
});
</script>

<template>
  <div class="text-chip-edit" :title="chipTitle">
    <div class="text-chip-edit__denomination">
      <img
        v-if="showIcon == true"
        :src="`${getAccomodationServiceImageById(props.serviceId)}`"
        alt=""
      />
      <p v-once>{{ props.chipText }}</p>
    </div>
    <input
      type="checkbox"
      :checked="isServiceEnabled"
      @change.prevent="(e) => handleCheckBoxChange(e)"
    />
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