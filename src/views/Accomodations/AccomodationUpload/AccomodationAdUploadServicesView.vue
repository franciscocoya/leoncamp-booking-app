<script setup>
import { onMounted, ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";

// Componentes
import TextEditChip from "@/components/Chips/TextEditChip.vue";
import BaseFormInput from "@/components/Forms/BaseFormInput.vue";
import BaseButton from "@/components/Buttons/BaseButton.vue";

// i18n
import { translateAmenity } from "@/helpers/i18nTranslations";

// Store
import { useAccomodationStore } from "@/store/accomodation";
import { useFormErrorsStore } from "@/store/formErrors";

// Rutas permitidas
import { uploadAccomodationRoutes } from "@/helpers/appRoutes";

const accomodationStore = useAccomodationStore();
const formErrorsStore = useFormErrorsStore();

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
    : (accomodationStore.accomodationServices =
        accomodationStore.accomodationServices.filter(
          (serv) => serv.idAccomodationService.id !== serviceToAdd.id
        ));

  formErrorsStore.enableNextButton =
    accomodationStore.accomodationServices.length > 0;
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

onMounted(async () => {
  allAvaibleServices.value = await accomodationStore.getAllServices();
  originalServices.value = [...allAvaibleServices.value];

  formErrorsStore.enableNextButton =
    accomodationStore.accomodationServices.length > 0;
});

// onBeforeRouteLeave((from, to) => {
//   if (
//     formErrorsStore.enableNextButton == false &&
//     (uploadAccomodationRoutes.includes(from.name) ||
//       uploadAccomodationRoutes.includes(to.name))
//   ) {
//     return false;
//   }
// });
</script>

<template>
  <div class="accomodation-ad-upload-services-view">
    <h2 v-once v-t="'upload_accomodation_view.step3.title'"></h2>
    <p v-once v-t="'upload_accomodation_view.step3.subtitle'"></p>
    <BaseFormInput
      placeholder="Introduce el servicio a buscar"
      @handleInput="(value) => applyFilters(value)"
    />
    <div class="accomodation-ad-upload-services__wrapper">
      <TextEditChip
        v-for="service in allAvaibleServices"
        :key="`service-${service.id}`"
        :chipTitle="`Haz click para eliminar el servicio ${service.denomination}`"
        :chipText="
          $t(
            `accomodation_amenities[${translateAmenity(service.denomination)}]`
          )
        "
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