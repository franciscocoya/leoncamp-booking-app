<script setup>
import { onMounted, ref } from "vue";

// Componentes
import TextEditChip from "@/components/Chips/TextEditChip.vue";
import BaseFormInput from "@/components/Forms/BaseFormInput.vue";
import BaseButton from "@/components/Buttons/BaseButton.vue";

// Store
import { useAccomodationStore } from "@/store/accomodation";

const accomodationStore = useAccomodationStore();

let allAvaibleServices = ref([]);
let originalServices = ref([]);

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


const applyFilters = (serviceSearchTerm) => {
  const regex = new RegExp(serviceSearchTerm, "gi");

  if (serviceSearchTerm == "") {
    allAvaibleServices.value = originalServices.value;
  } else {
    allAvaibleServices.value = allAvaibleServices.value.filter((service) =>
      regex.test(service.denomination)
    );
  }
};

const showAllServiceChips = () => {
  allAvaibleServices.value = originalServices.value;
};

onMounted(async () => {
  allAvaibleServices.value = await accomodationStore.getAllServices();
  originalServices.value = [...allAvaibleServices.value];
});
</script>

<template>
  <div class="accomodation-ad-upload-services-view">
    <h2 v-once>Servicios</h2>
    <p>Marca la casilla de los servicios de los que dispone el alojamiento.</p>
    <BaseFormInput
      placeholder="Introduce el servicio a buscar"
      @handleInput="(value) => applyFilters(value)"
    />
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
@import "@/assets/scss/_variables.scss";

.accomodation-ad-upload-services-view {
  
  & > .accomodation-ad-upload-services__wrapper {
    @include flex-row;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 20px;
  }
}

// ---------------------------------------------------------------
// -- Responsive design
// ---------------------------------------------------------------
@media (max-width: $breakpoint-sm) {
  .accomodation-ad-upload-services-view {
    margin-bottom: 50px;
    & > .accomodation-ad-upload-services__wrapper {
      margin: 20px 0;
    }
  }
}
</style>