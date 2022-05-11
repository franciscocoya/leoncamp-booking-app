<script setup>
import { onMounted, ref } from "vue";

// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";
import LabelFormInput from "@/components/Forms/LabelFormInput.vue";
import BaseFormTextArea from "@/components/Forms/BaseFormTextArea.vue";
import BaseFormSelect from "@/components/Forms/BaseFormSelect.vue";

// Store
import { getAllAccomodationCategories } from "@/services/accomodation/AccomodationCategoryService";

import { useAccomodationStore } from "@/store/accomodation";
// Imágenes
import {
  IMG_UPLOAD_ACCOMODATION_STEP_1_A,
  IMG_UPLOAD_ACCOMODATION_STEP_1_B,
} from "@/helpers/iconConstants";

const accomodationStore = useAccomodationStore();

const allAvailableAccomodationCategories = ref([]);

onMounted(async () => {
  allAvailableAccomodationCategories.value =
    await getAllAccomodationCategories();
});
</script>

<template>
  <div class="accomodation-upload-basic-data-view">
    <h2 v-once>Datos básicos</h2>
    <div class="accomodation-upload-basic-data__wrapper">
      <div>
        <!-- Número de registro -->
        <LabelFormInput
          inputLabel="Número de registro"
          inputType="text"
          :inputValue="accomodationStore.registerNumber"
          @handleInput="(value) => (accomodationStore.registerNumber = value)"
        />

        <!-- Descripción -->
        <BaseFormTextArea
          inputLabel="Descripción"
          inputTitle="Realiza una descripción lo más detallada posible para atraer a nuevos huéspedes y crecer en la comunidad. Puedes explicar más características y servicios que ofreces, que no se encuentran disponibles en la plataforma."
          :textAreaContent="accomodationStore.description"
          @handleInput="(value) => (accomodationStore.description = value)"
        />

        <div class="accomodation-upload-basic-data_wrapper__row3">
          <!-- Categoría -->
          <BaseFormSelect
            inputLabel="Categoría"
            inputTitle="Selecciona una de las opciones disponibles"
            :inputValue="accomodationStore.category"
            :options="allAvailableAccomodationCategories"
            @handleChange="(value) => (accomodationStore.category = value)"
          />

          <!-- Superficie -->
          <LabelFormInput
            inputLabel="Superficie"
            inputType="number"
            inputTitle="Superficie habitable del alojamiento (En metros cuadrados)"
            :inputValue="accomodationStore.area"
            @handleInput="(value) => (accomodationStore.area = value)"
          />
        </div>

        <div class="accomodation-upload-basic-data_wrapper__row4">
          <!-- Habitaciones -->
          <LabelFormInput
            inputLabel="Camas"
            inputType="number"
            :inputValue="accomodationStore.numOfBeds"
            @handleInput="(value) => (accomodationStore.numOfBeds = value)"
          />

          <!-- Baños -->
          <LabelFormInput
            inputLabel="Habitaciones"
            inputType="number"
            :inputValue="accomodationStore.numOfBedRooms"
            @handleInput="(value) => (accomodationStore.numOfBedRooms = value)"
          />

          <!-- Baños -->
          <LabelFormInput
            inputLabel="Baños"
            inputType="number"
            :inputValue="accomodationStore.numOfBathRooms"
            @handleInput="(value) => (accomodationStore.numOfBathRooms = value)"
          />
        </div>

        <div class="accomodation-upload-basic-data_wrapper__row5">
          <!-- Huéspedes -->
          <LabelFormInput
            inputLabel="Huéspedes"
            inputType="number"
            inputTitle="Aforo máximo de huéspedes en el alojamiento."
            :inputValue="accomodationStore.numOfGuests"
            @handleInput="(value) => (accomodationStore.numOfGuests = value)"
          />

          <!-- Precio -->
          <LabelFormInput
            inputLabel="Precio"
            isPriceInput="true"
            inputTitle="Precio por noche del alojamiento"
            :inputValue="accomodationStore.pricePerNight"
            @handleInput="(value) => (accomodationStore.pricePerNight = value)"
          />
        </div>
      </div>
      <div>
        <img :src="IMG_UPLOAD_ACCOMODATION_STEP_1_A" alt="" />
        <img :src="IMG_UPLOAD_ACCOMODATION_STEP_1_B" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

.accomodation-upload-basic-data-view {
  @include flex-column;

  & > .accomodation-upload-basic-data__wrapper {
    @include flex-row;
    flex-wrap: wrap;
    gap: 30px;

    // Estilos columna izquierda - formulario
    & > div:first-child {
      @include flex-column;
      gap: 40px;
      flex: 1;

      // Estilos fila categoria, superficie
      & > .accomodation-upload-basic-data_wrapper__row3 {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 10px;
      }
      // Estilso ficha camas, habitaciones, baños
      & > .accomodation-upload-basic-data_wrapper__row4 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px;
      }

      & > .accomodation-upload-basic-data_wrapper__row5 {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 10px;
      }
    } // Fin estilos columna izquierda - formulario

    // Estilos columna derecha - imagen decorativa
    & > div:last-child {
      @include flex-row;
      flex-wrap: wrap;
      position: relative;
      flex: 0 40%;
      & > img {
        width: 350px;
        border-radius: $global-border-radius;

        &:first-child {
          z-index: $z-index-2;
        }
        &:last-child {
          position: absolute;
          left: 175px;
          top: 75px;
          box-shadow: $global-box-shadow;
          z-index: $z-index-1;
        }
      }
    }
  }
}

// ------------------------------------------------------------
// -- Responsive design
// ------------------------------------------------------------
@media (max-width: $breakpoint-md) {
  .accomodation-upload-basic-data-view {
    & > .accomodation-upload-basic-data__wrapper {
      & > div:last-child {
        display: none;
      }
    }
  }
}
</style>