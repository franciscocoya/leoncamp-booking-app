<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";
import LabelFormInput from "@/components/Forms/LabelFormInput.vue";
import BaseFormTextArea from "@/components/Forms/BaseFormTextArea.vue";
import BaseFormSelect from "@/components/Forms/BaseFormSelect.vue";
import UploadImageInputButton from "@/components/Buttons/UploadImageInputButton.vue";

// Chips
import ImageEditChip from "@/components/Chips/ImageEditChip.vue";
import TextEditChip from "@/components/Chips/TextEditChip.vue";

// Store
import { useAccomodationStore } from "@/store/accomodation";

// Utils
import { convertImageToBase64 } from "@/helpers/utils";

// Servicios
import {
  getAllAccomodationCategories,
  updateAccomodationCategory,
} from "@/services/accomodation/AccomodationCategoryService";

const router = useRouter();

const accomodationStore = useAccomodationStore();

const MAX_ACCOMODATION_IMAGES = 8;

defineProps({
  allServices: {
    type: Array,
    default: () => [],
  },
  allRules: {
    type: Array,
    default: () => [],
  },
});

const categories = ref([]);

/**
 * Manejador de click de botón añadir imagen.
 */
const handleAddImage = async (val) => {
  //await addNewAccomodationImage();
  const newImageEncoded = await convertImageToBase64(val);
  await accomodationStore.addNewAccomodationImage(
    accomodationStore.registerNumber,
    newImageEncoded
  );
  window.location.reload();
};

/**
 * Manejador de click para editar las características principales del alojamiento.
 */
const handleApplyAccomodationChanges = async () => {
  await updateAccomodationCategory(
    accomodationStore.registerNumber,
    accomodationStore.category
  );
};

/**
 * Manejador de click para editar la categoría del alojamiento.
 */
const handleEditAccomodationCategory = async () => {
  await accomodationStore.updateAccomodationCategory();
};

/**
 * Manejador de cambio de estado de los checkbox de los textchip de los servicios.
 * Utilizado para añadir o eliminar un servicio del alojamiento a editar.
 */
const handleServiceChipChange = async (e, serviceId) => {
  // Si se selecciona, añadir a la lista de servicios existentes
  const existsService = accomodationStore.accomodationServices.some(
    (serv) =>
      serv.accomodationAccServiceId.idAccomodationService.id === serviceId
  );

  // Si se selecciona el servicio, añadir a la lista de servicios existentes
  if (e.target.checked && !existsService) {
    await accomodationStore.addNewService(serviceId);
  } else {
    // Si no se selcciona el servicio, eliminar de la lista
    await accomodationStore.deleteService(serviceId);
  }
};

/**
 * Manejador de cambio de estado de los checkbox de los textchip de las normas.
 * Utilizado para añadir o eliminar una norma del alojamiento a editar.
 */
const handleRuleChipChange = async (e, ruleId) => {
  // Si se selecciona, añadir a la lista de servicios existentes
  const existsService = accomodationStore.accomodationServices.some(
    (serv) => serv.accomodationAccServiceId.idAccomodationService.id === ruleId
  );

  // Si se selecciona el servicio, añadir a la lista de servicios existentes
  if (e.target.checked && !existsService) {
    await accomodationStore.addNewRule(ruleId);
  } else {
    // Si no se selcciona el servicio, eliminar de la lista
    await accomodationStore.deleteAccomodationRule(ruleId);
  }
};

onMounted(async () => {
  categories.value = await getAllAccomodationCategories();
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
                v-for="(
                  accImg, index
                ) in accomodationStore.accomodationImages.map(
                  (img) => img.accomodationAccImageId.idAccomodationImage
                )"
                :regNumber="accomodationStore.registerNumber"
                :imageData="accImg"
                :chipTitle="`Imagen ${accImg.id}`"
                :key="index"
              />
            </div>
            <!-- Botón subir nueva imagen al alojamiento -->
            <UploadImageInputButton
              :isDisabled="
                accomodationStore.accomodationImages.length >
                MAX_ACCOMODATION_IMAGES
              "
              text="Añadir"
              :title="`Haz click aquí para añadir una nueva imagen, hasta un máximo de ${MAX_ACCOMODATION_IMAGES} imágenes.`"
              buttonStyle="baseButton-dark--outlined"
              @input="handleAddImage"
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
          <!-- Botón editar alojamiento -->
          <BaseButton
            v-once
            text="Editar"
            buttonStyle="baseButton-primary--filled"
            id="button-edit-accomodation-main-properties"
            buttonTitle="Haz click aquí para editar los características del alojamiento."
            @click="handleApplyAccomodationChanges"
          />
        </section>
      </div>

      <!-- Categoría del alojamiento -->
      <section class="form-edit-accomodation-category">
        <h3 v-once>Categoría</h3>
        <div class="form-edit-accomodation-category__wrapper">
          <!-- Categoría -->
          <BaseFormSelect
            inputLabel="Categoría"
            selectId="accomodation-category-select"
            :options="categories"
            @handleChange="(value) => (accomodationStore.category = value)"
          />
          <BaseButton
            text="Editar"
            buttonStyle="baseButton-dark--filled--small"
            title="Haz click aquí para editar la categoría del alojamiento."
            id="button-edit-accomodation-category"
            @click="handleEditAccomodationCategory"
          />
        </div>
      </section>

      <!-- Servicios -->
      <div class="form-edit-services">
        <h3 v-once>Servicios</h3>
        <p>
          El alojamiento dispone de
          {{ accomodationStore.accomodationServices.length }} servicios.
        </p>
        <div class="form-edit-services__container">
          <TextEditChip
            v-for="service in allServices"
            :key="`service-${service.id}`"
            :chipTitle="`Haz click para eliminar el servicio ${service.denomination}`"
            :chipText="service.denomination"
            :serviceData="service"
            :showIcon="true"
            :isServiceEnabled="
              accomodationStore.accomodationServices.some(
                (serv) =>
                  serv.accomodationAccServiceId.idAccomodationService.id ===
                  service.id
              )
            "
            @handleCheckBoxChange="
              (e) => handleServiceChipChange(e, service.id)
            "
          />
        </div>
      </div>

      <!-- Normas -->
      <div class="form-edit-rules">
        <h3 v-once>Normas</h3>
        <p>
          El alojamiento tiene
          {{ accomodationStore.accomodationRules.length }} normas
        </p>
        <div class="form-edit-rules__container">
          <TextEditChip
            v-for="rule in allRules"
            :key="`rule-${rule.id}`"
            :chipTitle="`Haz click apra eliminar el servicio ${rule.id}`"
            :chipText="rule.rule"
            :isServiceEnabled="
              accomodationStore.accomodationRules.some(
                (r) => r.accomodationAccRuleId.idAccomodationRule.id === rule.id
              )
            "
            @handleCheckBoxChange="(e) => handleRuleChipChange(e, rule.id)"
          />
        </div>
      </div>

      <!-- Contenedor boton volver -->
      <div class="form-edit-buttons">
        <!-- Botón cancelar cambios -->
        <BaseButton
          v-once
          text="Volver"
          buttonStyle="baseButton-danger--filled"
          buttonTitle="Haz click aquí para cancelar los cambios realizados en el alojamiento"
          @click="router.go(-1)"
        />
      </div>
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

        & > #button-edit-accomodation-main-properties {
          justify-content: flex-start;
          margin-left: 15px;
        }
      } // Fin .form-edit-main-features__properties
    } // Fin form-edit-main-features

    // Estilos sección categoría
    & > .form-edit-accomodation-category {
      @include flex-column;

      &:hover > .form-edit-accomodation-category__wrapper > div:nth-child(2) {
        display: block;
      }

      & > .form-edit-accomodation-category__wrapper {
        @include flex-row;
        flex-wrap: wrap;
        gap: 20px;

        // Estilos selector de categoría
        & > div:first-child {
          width: 20%;
        }

        // Estilos boton editar
        & > div:nth-child(2) {
          display: none;
        }
      } // Fin estilos .form-edit-accomodation-category__wrapper
    } // Fin estilos form-edit-accomodation-category

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

    // Estilos botones editar y cancelar
    & > .form-edit-buttons {
      @include flex-row;
      gap: 10px;
      align-self: center;
      margin-top: 30px;
    }
  } // Fin form-edit-container
}

// -------------------------------------------------
// -- Responsive design
// -------------------------------------------------
@media screen and (max-width: $breakpoint-sm) {
  // Estilos sección características principales e imágenes.
  .edit-form > #form-edit-container > .form-edit-main-features {
    @include flex-column;

    & > .form-edit-main-features__images {
      & > .form-edit-main-features-images__container {
        align-self: center;
      }
    }
  }

  // Estilos sección categoría
  .edit-form
    > #form-edit-container
    > .form-edit-accomodation-category
    > .form-edit-accomodation-category__wrapper {
    @include flex-column;

    // Estilos selector de categoría
    & > div:first-child {
      width: 100%;
    }
  }
}
</style>