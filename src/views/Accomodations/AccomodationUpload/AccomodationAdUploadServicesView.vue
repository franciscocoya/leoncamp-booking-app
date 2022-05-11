<script setup>
import { onMounted, ref } from "vue";

// Componentes
import TextEditChip from "@/components/Chips/TextEditChip.vue";

// Store
import { useAccomodationStore } from "@/store/accomodation";

const accomodationStore = useAccomodationStore();

/**
 * Manejador del evento change de los checkbox de los servicios.
 */
const handleServiceChipChange = (e, serviceToAdd) => {
  let accomodationAccServiceId = {
    idAccomodation: accomodationStore.registerNumber,
    idAccomodationService: {
      id: serviceToAdd.id,
      denomination: serviceToAdd.denomination,
    },
  };

  e.target.checked
    ? accomodationStore.accomodationServices.push(accomodationAccServiceId)
    : accomodationStore.accomodationServices.shift(accomodationAccServiceId);
};

const allAvaibleServices = ref([]);

onMounted(async () => {
  allAvaibleServices.value = await accomodationStore.getAllServices();
});
</script>

<template>
  <div class="accomodation-ad-upload-services-view">
    <h2 v-once>Servicios</h2>
    <p>Marca la casilla de los servicios de los que dispone el alojamiento.</p>
    <div class="accomodation-ad-upload-services__wrapper">
      <TextEditChip
        v-for="service in allAvaibleServices"
        :key="`service-${service.id}`"
        :chipTitle="`Haz click para eliminar el servicio ${service.denomination}`"
        :chipText="service.denomination"
        :serviceData="service"
        :showIcon="true"
        :isServiceEnabled="
          accomodationStore.accomodationServices.some(
            (serv) => serv.idAccomodationService.id === service.id
          )
        "
        @handleCheckBoxChange="(e) => handleServiceChipChange(e, service)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.accomodation-ad-upload-services-view {
  & > .accomodation-ad-upload-services__wrapper {
    @include flex-row;
    gap: 10px;
    flex-wrap: wrap;
  }
}
</style>