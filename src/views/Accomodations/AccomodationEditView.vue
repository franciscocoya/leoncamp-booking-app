<script setup>
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";
import EditForm from "@/components/Forms/EditForm.vue";

// Store
import { useAccomodationStore } from "@/store/accomodation";
const accomodationStore = useAccomodationStore();

const router = useRouter();

onBeforeMount(() => {
  const registerNumberAccToEdit =
    router.currentRoute.value.params.registerNumber;
  accomodationStore.getAccomodationByRegisterNumber(registerNumberAccToEdit);
});
</script>

<template>
  <div class="accomodation-edit-view">
    <h1>
      Editar el alojamiento
      <span
        class="form-edit-main-features_properties__regNumber"
        title="Número de registro del alojamiento a editar"
        >{{ accomodationStore.registerNumber }}</span
      >
    </h1>
    <div class="accomodation-edit__wrapper">
      <EditForm />
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
</style>