<script setup>
import { onBeforeMount, ref } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";

// Componentes
import EditForm from "@/components/Forms/EditForm.vue";

// Store
import { useAccomodationStore } from "@/store/accomodation";
const accomodationStore = useAccomodationStore();

const router = useRouter();

const allAvailableServices = ref([]);
const allAvailableRules = ref([]);

onBeforeMount(async () => {
  const registerNumberAccToEdit =
    router.currentRoute.value.params.registerNumber;
  await accomodationStore.getAccomodationByRegisterNumber(
    registerNumberAccToEdit
  );

  allAvailableServices.value = await accomodationStore.getAllServices();

  allAvailableRules.value = await accomodationStore.getAllRules();
});

onBeforeRouteLeave(() => {
  const confirmExitWindow = window.confirm(
    "¿Estás seguro de que quieres salir?"
  );

  if (!confirmExitWindow) {
    return false;
  }
});
</script>

<template>
  <div class="accomodation-edit-view">
    <h1>
      {{ $tc("edit_accommodation_view.title") }}
      <span
        class="form-edit-main-features_properties__regNumber"
        title="Número de registro del alojamiento a editar"
        >{{ accomodationStore.registerNumber }}</span
      >
    </h1>
    <div class="accomodation-edit__wrapper">
      <EditForm
        :allServices="allAvailableServices"
        :allRules="allAvailableRules"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

.accomodation-edit-view {
  @include flex-column-center;
  margin: 30px 50px;

  & > h1 {
    // Estilos número de registro
    @include flex-row-center;
    flex-wrap: wrap;
    gap: 20px;

    & > .form-edit-main-features_properties__regNumber {
      width: fit-content;
      background-color: $color-primary;
      color: #fff;
      font-size: 1.1rem;
      font-weight: 400;
      padding: 5px 10px;
      border-radius: $global-border-radius;
    } // Fin .form-edit-main-features_properties__regNumber
  }

  & > .accomodation-edit__wrapper {
    @include flex-column;
    width: 100%;
  }
}

// -------------------------------------------------
// -- Responsive design
// -------------------------------------------------
@media screen and (max-width: $breakpoint-sm) {
  .accomodation-edit-view {
    margin: 30px;
  }
}
</style>