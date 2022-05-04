<script setup>
import { useRouter } from "vue-router";

// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";
import BaseFormInput from "@/components/Forms/BaseFormInput.vue";
import BaseFormTextArea from "@/components/Forms/BaseFormTextArea.vue";

// Store
import { useAccomodationStore } from "@/store/accomodation";
const accomodationStore = useAccomodationStore();

const router = useRouter();
</script>

<template>
  <div class="edit-form">
    <form id="form-edit-container">
      <!-- Descripción -->
      <label for="accomodation-description">Descripción:</label>
      <BaseFormTextArea
        inputType="text"
        inputId="accomodation-description"
        placeholder="Introduce la descripción"
        :inputValue="accomodationStore.description"
        @handleInput="(value) => (accomodationStore.name = value)"
      />

      <!-- Precio -->
      <label for="accomodation-price">Precio / noche:</label>
      <BaseFormInput
        inputType="text"
        inputId="accomodation-price"
        placeholder="Introduce el precio"
        :inputValue="accomodationStore.pricePerNight"
        @handleInput="(value) => (accomodationStore.pricePerNight = value)"
      />

      <!-- Número de camas -->
      <label for="accomodation-beds">Número de camas:</label>
      <BaseFormInput
        inputType="number"
        inputId="accomodation-beds"
        placeholder="Introduce el número de camas"
        :inputValue="accomodationStore.beds"
        @handleInput="(value) => (accomodationStore.beds = value)"
      />

      <!-- Número de habitaciones -->
      <label for="accomodation-bedrooms">Número de habitaciones:</label>
      <BaseFormInput
        inputType="number"
        inputId="accomodation-bedrooms"
        placeholder="Introduce el número de habitaciones"
        :inputValue="accomodationStore.numOfBedRooms"
        @handleInput="(value) => (accomodationStore.numOfBedRooms = value)"
      />

      <!-- Número de baños -->
      <label for="accomodation-bathrooms">Número de baños:</label>
      <BaseFormInput
        inputType="number"
        inputId="accomodation-bathrooms"
        placeholder="Introduce el número de baños"
        :inputValue="accomodationStore.numOfBathrooms"
        @handleInput="(value) => (accomodationStore.numOfBathrooms = value)"
      />

      <!-- Número de huéspedes -->
      <label for="accomodation-guests">Número de huéspedes:</label>
      <BaseFormInput
        inputType="number"
        inputId="accomodation-guests"
        placeholder="Introduce el número de huéspedes"
        :inputValue="accomodationStore.numOfGuests"
        @handleInput="(value) => (accomodationStore.numOfGuests = value)"
      />

      <!-- Categoría -->
      <label for="accomodation-guests">Categoría:</label>
      <BaseFormInput
        inputType="number"
        inputId="accomodation-guests"
        placeholder="Introduce el número de huéspedes"
        :inputValue="accomodationStore.numOfGuests"
        @handleInput="(value) => (accomodationStore.numOfGuests = value)"
      />

      <!-- Superficie -->
            <label for="accomodation-area">Superficie:</label>
      <BaseFormInput
        inputType="number"
        inputId="accomodation-area"
        placeholder="Introduce la superficie"
        :inputValue="accomodationStore.area"
        @handleInput="(value) => (accomodationStore.area = value)"
      />

      <!-- Imágenes -->
      <div>
          <h3>Imágenes del alojamiento</h3>
          <div></div>
      </div>

      <!-- Servicios -->
        <div>
            <h3>Servicios</h3>
        </div>

      <!-- Normas -->
      <BaseButton text="Editar" buttonStyle="baseButton-primary--filled" />
    </form>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

.edit-form {
  @include flex-column-center;
}
</style>