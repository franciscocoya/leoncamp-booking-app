<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";
import LabelFormInput from "@/components/Forms/LabelFormInput.vue";
import BaseFormTextArea from "@/components/Forms/BaseFormTextArea.vue";
import BaseFormSelect from "@/components/Forms/BaseFormSelect.vue";
import UploadImageInputButton from "@/components/Buttons/UploadImageInputButton.vue";
import BaseMessageItem from "@/components/Forms/Messages/BaseMessageItem.vue";

// i18n
import {
  translateAmenity,
  translateCategory,
} from "@/helpers/i18nTranslations";

// Chips
import ImageEditChip from "@/components/Chips/ImageEditChip.vue";
import TextEditChip from "@/components/Chips/TextEditChip.vue";

// Store
import { useAccomodationStore } from "@/store/accomodation";
import { useAppContextStore } from "@/store/appContext";
import { useAuthStore } from "@/store/auth";

// Utils
import { convertImageToBase64 } from "@/helpers/utils";

// Servicios
import {
  getAllAccomodationCategories,
  updateAccomodationCategory,
} from "@/services/accomodation/AccomodationCategoryService";

const router = useRouter();

const accomodationStore = useAccomodationStore();
const appContextStore = useAppContextStore();
const authStore = useAuthStore();

let showAccomodationUpdateSuccessMessage = ref(false);
let showUpdateAccomodationCategorySuccessMessage = ref(false);

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
  await accomodationStore.updateAccomodation();
  showAccomodationUpdateSuccessMessage.value = true;

  setTimeout(() => {
    showAccomodationUpdateSuccessMessage.value = false;
  }, 3000);
};

/**
 * Manejador de click para editar la categoría del alojamiento.
 */
const handleEditAccomodationCategory = async () => {
  await accomodationStore.updateAccomodationCategory();
  showUpdateAccomodationCategorySuccessMessage.value = true;

  setTimeout(() => {
    showUpdateAccomodationCategorySuccessMessage.value = false;
  }, 3000);
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

/**
 * Manejador de click del botón de eliminar el alojamiento.
 */
const handleRemoveCurrentAccomodation = async () => {
  const confirmRemove = window.confirm(
    "¿Estás seguro de que quieres eliminar este alojamiento?"
  );

  if (!confirmRemove) {
    return false;
  }

  accomodationStore.removeAccomodation();
  router.push({
    name: "user-profile",
    params: {
      username: `${authStore?.userData?.name}-${authStore?.userData?.surname}`,
    },
  });
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
          <h2>{{$t('edit_accommodation_view.images.title')}}</h2>
          <p>
            {{
              $tc("edit_accommodation_view.images.count", {
                n: accomodationStore.accomodationImages.length,
              })
            }}
          </p>
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
              :text="$t('components.buttons.upload_image')"
              :title="`Haz click aquí para añadir una nueva imagen, hasta un máximo de ${MAX_ACCOMODATION_IMAGES} imágenes.`"
              buttonStyle="baseButton-dark--outlined"
              @input="handleAddImage"
            />
          </div>
        </section>

        <!-- Sección características -->
        <section class="form-edit-main-features__properties">
          <h2 v-once v-t="'edit_accommodation_view.features.title'"></h2>
          <!-- Descripción -->
          <fieldset class="form-edit-main-features_properties__description">
            <BaseFormTextArea
              inputType="text"
              :inputLabel="$t('components.forms.description')"
              inputId="accomodation-description"
              :textAreaContent="accomodationStore.description"
              @handleInput="(value) => (accomodationStore.description = value)"
            />
          </fieldset>

          <fieldset class="form-edit-main-features_properties__rooms">
            <!-- Número de camas -->
            <LabelFormInput
              inputType="number"
              :inputLabel="$tc('components.forms.beds', 2)"
              inputId="accomodation-beds"
              :inputValue="accomodationStore.numOfBeds"
              @handleInput="
                (value) => (accomodationStore.numOfBeds = Number(value))
              "
            />

            <!-- Número de habitaciones -->
            <LabelFormInput
              inputType="number"
              :inputLabel="$tc('components.forms.bedroom', 2)"
              inputId="accomodation-bedrooms"
              :inputValue="accomodationStore.numOfBedRooms"
              @handleInput="
                (value) => (accomodationStore.numOfBedRooms = Number(value))
              "
            />

            <!-- Número de baños -->
            <LabelFormInput
              inputType="number"
              :inputLabel="$tc('components.forms.bathroom', 2)"
              inputId="accomodation-bathrooms"
              :inputValue="accomodationStore.numOfBathRooms"
              @handleInput="
                (value) => (accomodationStore.numOfBathRooms = Number(value))
              "
            />
          </fieldset>

          <fieldset class="form-edit-main-features_properties__guest-category">
            <!-- Número de huéspedes -->
            <LabelFormInput
              inputType="number"
              :inputLabel="$tc('components.forms.guests', 2)"
              inputId="accomodation-guests"
              :inputValue="accomodationStore.numOfGuests"
              @handleInput="
                (value) => (accomodationStore.numOfGuests = Number(value))
              "
            />
          </fieldset>

          <fieldset class="form-edit-main-features_properties__area-price">
            <!-- Superficie -->
            <LabelFormInput
              inputType="number"
              :inputLabel="$t('components.forms.area')"
              inputId="accomodation-area"
              :inputValue="accomodationStore.area"
              @handleInput="(value) => (accomodationStore.area = Number(value))"
            />

            <!-- Precio -->
            <LabelFormInput
              inputType="number"
              :inputLabel="$tc('components.forms.price', 2)"
              inputId="accomodation-price"
              :inputValue="accomodationStore.pricePerNight"
              @handleInput="
                (value) => (accomodationStore.pricePerNight = Number(value))
              "
            />
          </fieldset>
          <!-- Botón editar alojamiento -->
          <BaseButton
            :text="$t('components.buttons.edit')"
            buttonStyle="baseButton-primary--filled"
            id="button-edit-accomodation-main-properties"
            buttonTitle="Haz click aquí para editar los características del alojamiento."
            :fullWidth="appContextStore.isTablet == true"
            @click="handleApplyAccomodationChanges"
          />
        </section>
        <Transition name="fade">
          <div v-if="showAccomodationUpdateSuccessMessage == true">
            <BaseMessageItem
              :msg="
                $t('edit_accommodation_view.edit_basic_data_success_message')
              "
              msgType="success"
            />
          </div>
        </Transition>
      </div>

      <!-- Categoría del alojamiento -->
      <section class="form-edit-accomodation-category">
        <h3 v-once v-t="'edit_accommodation_view.category.title'">Categoría</h3>
        <div class="form-edit-accomodation-category__wrapper">
          <!-- Categoría -->
          <BaseFormSelect
            :inputLabel="$t('components.forms.category')"
            selectId="accomodation-category-select"
            :options="categories"
            :selectedOption="accomodationStore.category.accomodationCategory"
            @handleChange="(value) => (accomodationStore.category = value)"
          />
          <BaseButton
            text="Editar"
            buttonStyle="baseButton-dark--filled--small"
            title="Haz click aquí para editar la categoría del alojamiento."
            id="button-edit-accomodation-category"
            :fullWidth="appContextStore.isMobile"
            @click="handleEditAccomodationCategory"
          />
          <Transition name="fade">
            <div v-if="showUpdateAccomodationCategorySuccessMessage == true">
              <BaseMessageItem
                :msg="
                  $t('edit_accommodation_view.edit_category_success_message')
                "
                msgType="success"
              />
            </div>
          </Transition>
        </div>
      </section>

      <!-- Servicios -->
      <div class="form-edit-services">
        <h3 v-once v-t="'edit_accommodation_view.services.title'"></h3>
        <p>
          {{
            $tc("edit_accommodation_view.services.subtitle", {
              n: accomodationStore.accomodationServices.length,
            })
          }}
        </p>
        <div class="form-edit-services__container">
          <TextEditChip
            v-for="service in allServices"
            :key="`service-${service.id}`"
            :chipTitle="`Haz click para eliminar el servicio ${service.denomination}`"
            :chipText="
              $t(
                `accomodation_amenities[${translateAmenity(
                  service.denomination
                )}]`
              )
            "
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
        <h3 v-once v-t="'edit_accommodation_view.rules.title'">Normas</h3>
        <p>
          {{
            $tc("edit_accommodation_view.rules.subtitle", {
              n: accomodationStore.accomodationRules.length,
            })
          }}
        </p>
        <div class="form-edit-rules__container">
          <TextEditChip
            v-for="rule in allRules"
            :key="`rule-${rule.id}`"
            :chipTitle="`Haz click para eliminar el servicio ${rule.id}`"
            :chipText="$t(`accomodation_rules[${rule.id - 1}]`)"
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
          :text="$tc('components.buttons.back', 1)"
          buttonStyle="baseButton-dark--outlined"
          :fullWidth="appContextStore.isMobile"
          @click="router.go(-1)"
        />
        <BaseButton
          :text="$tc('components.buttons.delete', 1)"
          buttonStyle="baseButton-danger--filled"
          :fullWidth="appContextStore.isMobile"
          @click="handleRemoveCurrentAccomodation"
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
      @include flex-row;
      gap: 30px;
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
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            grid-gap: 20px;
          }
        } // Fin .form-edit-main-features-images__container
      } // Fin .form-edit-main-features__images

      // -- Estilos sección campos de entrada para editar los datos del alojamiento.
      & > .form-edit-main-features__properties {
        @include flex-column;
        flex: 0 0 50%;
        gap: 20px;

        & fieldset {
          border: none;
          padding: 0;
          & > div {
            width: 100%;
          }
        }
        // Estilos campos de entrada
        & > .form-edit-main-features_properties__guest-category {
          @include flex-row;
          gap: 10px;
          flex-wrap: wrap;
        }

        & > .form-edit-main-features_properties__rooms {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          & .base-input {
            width: 50px !important;
          }
        } // Fin .form-edit-main-features_properties__rooms

        & > .form-edit-main-features_properties__guest-category {
          @include flex-row;
        }

        & > .form-edit-main-features_properties__area-price {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        & > #button-edit-accomodation-main-properties {
          justify-content: flex-start;
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

    & > .form-edit-buttons {
      @include flex-row;
      gap: 10px;
    }
  } // Fin form-edit-container
}

// -------------------------------------------------
// -- Responsive design
// -------------------------------------------------
@media screen and (max-width: $breakpoint-sm) {
  // Estilos sección características principales e imágenes.
  .edit-form {
    & > #form-edit-container {
      // Estilos seccion imágenes y características principales
      & > .form-edit-main-features {
        @include flex-column;

        & > .form-edit-main-features__images {
          & > .form-edit-main-features-images__container {
            width: 100%;
            & > div {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              grid-gap: 20px;
            } // Fin estilos div
          } // Fin estilos .form-edit-main-features-images__container
        } // Fin estilos form-edit-main-features__images

        & > .form-edit-main-features__properties {
          & > .form-edit-main-features_properties__rooms {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          }

          & > .form-edit-main-features_properties__guest-category {
            display: grid;
            grid-template-columns: 1fr;
          }

          & > .form-edit-main-features_properties__area-price {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 2fr));
          }
        }
      } // Fin estilos .form-edit-main-features

      &
        > .form-edit-accomodation-category
        > .form-edit-accomodation-category__wrapper {
        @include flex-column;

        // Estilos selector de categoría
        & > div:first-child {
          width: 100%;
        }
      }

      & > .form-edit-buttons {
        @include flex-column;
        gap: 10px;

        & > div {
          flex: 1;
        }
      }
    }
  }
}
</style>