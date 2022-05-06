<script setup>
// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";
import LabelFormInput from "@/components/Forms/LabelFormInput.vue";
import BaseFormTextArea from "@/components/Forms/BaseFormTextArea.vue";

// Chips
import ImageEditChip from "@/components/Chips/ImageEditChip.vue";
import TextEditChip from "@/components/Chips/TextEditChip.vue";

// Store
import { useAccomodationStore } from "@/store/accomodation";
const accomodationStore = useAccomodationStore();

defineProps({
  allServices: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="edit-form">
    <form id="form-edit-container">
      <!-- Características principales del alojamiento -->
      <div class="form-edit-main-features">
        <!-- Sección imágenes -->
        <section class="form-edit-main-features__images">
          <h2 v-once>Imágenes</h2>
          <p>{{ accomodationStore.accomodationImages.length }} imágenes</p>
          <div class="form-edit-main-features-images__container">
            <div>
              <ImageEditChip
                v-for="(accImg, index) in accomodationStore.accomodationImages"
                :regNumber="accomodationStore.registerNumber"
                :imageData="accImg.accomodationAccImageId.idAccomodationImage"
                :chipTitle="`Imagen ${accImage.accomodationAccImageId.idAccomodationImage.id}`"
                :key="index"
              />
            </div>
            <BaseButton
              :isDisabled="accomodationStore.accomodationImages.length > 10"
              text="Añadir"
              title="Haz click aquí para añadir una nueva imagen, hasta un máximo de 10 imágenes."
              buttonStyle="baseButton-dark--outlined"
            />
          </div>
        </section>

        <!-- Sección características -->
        <section class="form-edit-main-features__properties">
          <h2 v-once>Características</h2>
          <!-- Descripción -->
          <fieldset class="form-edit-main-features_properties__description">
            <BaseFormTextArea
              inputType="text"
              inputLabel="Descripción"
              inputId="accomodation-description"
              placeholder="Introduce la descripción"
              :textAreaContent="accomodationStore.description"
              :textAreaColums="47"
              :textAreaRows="7"
              @handleInput="(value) => (accomodationStore.description = value)"
            />
          </fieldset>

          <fieldset class="form-edit-main-features_properties__rooms">
            <!-- Número de camas -->
            <LabelFormInput
              inputType="number"
              inputLabel="Camas"
              inputId="accomodation-beds"
              placeholder="Introduce el número de camas"
              :inputValue="accomodationStore.numOfBeds"
              @handleInput="(value) => (accomodationStore.numOfBeds = value)"
            />

            <!-- Número de habitaciones -->
            <LabelFormInput
              inputType="number"
              inputLabel="Habitaciones"
              inputId="accomodation-bedrooms"
              placeholder="Introduce el número de habitaciones"
              :inputValue="accomodationStore.numOfBedRooms"
              @handleInput="
                (value) => (accomodationStore.numOfBedRooms = value)
              "
            />

            <!-- Número de baños -->
            <LabelFormInput
              inputType="number"
              inputLabel="Baños"
              inputId="accomodation-bathrooms"
              placeholder="Introduce el número de baños"
              :inputValue="accomodationStore.numOfBathRooms"
              @handleInput="
                (value) => (accomodationStore.numOfBathRooms = value)
              "
            />
          </fieldset>

          <fieldset class="form-edit-main-features_properties__guest-category">
            <!-- Número de huéspedes -->
            <LabelFormInput
              inputType="number"
              inputLabel="Huéspedes"
              inputId="accomodation-guests"
              placeholder="Introduce el número de huéspedes"
              :inputValue="accomodationStore.numOfGuests"
              @handleInput="(value) => (accomodationStore.numOfGuests = value)"
            />

            <!-- Categoría -->
            <LabelFormInput
              inputType="select"
              inputLabel="Categoría"
              inputId="accomodation-guests"
              placeholder="Introduce el número de huéspedes"
              :inputValue="accomodationStore.category.accomodationCategory"
              @handleInput="
                (value) =>
                  (accomodationStore.category.accomodationCategory = value)
              "
            />
          </fieldset>

          <fieldset class="form-edit-main-features_properties__area-price">
            <!-- Superficie -->
            <LabelFormInput
              inputType="number"
              inputLabel="Superficie"
              inputId="accomodation-area"
              placeholder="Introduce la superficie"
              :inputValue="accomodationStore.area"
              @handleInput="(value) => (accomodationStore.area = value)"
            />

            <!-- Precio -->
            <LabelFormInput
              inputType="text"
              inputLabel="Precio / noche"
              inputId="accomodation-price"
              placeholder="Introduce el precio"
              :inputValue="accomodationStore.pricePerNight"
              @handleInput="
                (value) => (accomodationStore.pricePerNight = value)
              "
            />
          </fieldset>
        </section>
      </div>

      <!-- Servicios -->
      <div class="form-edit-services">
        <h3 v-once>Servicios</h3>
        <p>
          El alojamiento dispone de
          {{ accomodationStore.accomodationServices.length }} servicios
        </p>
        <div class="form-edit-services__container">
          <TextEditChip
            v-for="(service, index) in allServices"
            :key="index"
            :chipTitle="`Haz click apra eliminar el servicio ${service.denomination}`"
            :chipText="service.denomination"
            :serviceId="service.id"
            :showIcon="true"
            :accServices="accomodationStore.accomodationServices"
          />
        </div>
      </div>

      <!-- Normas -->
      <div class="form-edit-rules">
        <h3 v-once>Normas</h3>
        <p v-once>
          El alojamiento tiene
          {{ accomodationStore.accomodationRules.length }} normas
        </p>
        <div class="form-edit-rules__container">
          <TextEditChip
            v-for="(rule, index) in accomodationStore.accomodationRules"
            :key="index"
            :chipTitle="`Haz click apra eliminar el servicio ${rule.accomodationAccRuleId.idAccomodationRule.rule}`"
            :chipText="rule.accomodationAccRuleId.idAccomodationRule.rule"
            :isActiveService="true"
          />
        </div>
      </div>

      <!-- Botón editar alojamiento -->
      <BaseButton
        v-once
        text="Editar"
        buttonStyle="baseButton-primary--filled"
      />
    </form>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

.edit-form {
  @include flex-column;

  // Estilos h2 de las secciones
  & section > h2 {
    color: $color-dark;
    font-weight: 400;
  }

  // Estilos formulario edición
  & > #form-edit-container {
    @include flex-column;
    gap: 30px;

    // -- Estilos sección características principales. En dos columnas, la primera contiene las imágenes
    // y la segunda las características.
    & > .form-edit-main-features {
      display: grid;
      grid-template-columns: 40% auto;
      grid-gap: 20px;
      justify-content: center;

      & > section {
        @include flex-column;
        gap: 10px;
      }

      & > .form-edit-main-features__images {
        @include flex-column;

        & > .form-edit-main-features-images__container {
          @include flex-column;
          gap: 20px;
          align-self: center;

          & > div {
            @include flex-row;
            gap: 10px;
            flex-wrap: wrap;
          }
        } // Fin .form-edit-main-features-images__container
      } // Fin .form-edit-main-features__images

      // -- Estilos sección campos de entrada para editar los datos del alojamiento.
      & > .form-edit-main-features__properties {
        @include flex-column;

        & fieldset {
          border: none;
        }
        // Estilos campos de entrada
        & > .form-edit-main-features_properties__rooms,
        & > .form-edit-main-features_properties__guest-category,
        & > .form-edit-main-features_properties__area-price {
          @include flex-row;
          gap: 10px;
          flex-wrap: wrap;
        }

        & > .form-edit-main-features_properties__rooms {
          & .base-input {
            width: 50px !important;
          }
        } // Fin .form-edit-main-features_properties__rooms

        & > .form-edit-main-features_properties__guest-category {
          @include flex-row;
        }
      } // Fin .form-edit-main-features__properties
    } // Fin form-edit-main-features

    // Estilos compartidos secciones servicios y normas
    & > .form-edit-services,
    & > .form-edit-rules {
      @include flex-column;
      gap: 10px;

      & > div {
        @include flex-row;
        gap: 10px;
        flex-wrap: wrap;
      }
    }
  } // Fin form-edit-container
}
</style>