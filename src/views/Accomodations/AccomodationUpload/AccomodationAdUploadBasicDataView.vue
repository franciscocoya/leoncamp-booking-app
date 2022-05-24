<script setup>
import { onMounted, ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";

// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";
import LabelFormInput from "@/components/Forms/LabelFormInput.vue";
import BaseFormTextArea from "@/components/Forms/BaseFormTextArea.vue";
import BaseFormSelect from "@/components/Forms/BaseFormSelect.vue";

// Servicios
import { checkAccomodationExistsByRegNumber } from "@/services/accomodation/AccomodationService";
import { getAllAccomodationCategories } from "@/services/accomodation/AccomodationCategoryService";

// Store
import { useAccomodationStore } from "@/store/accomodation";
import { useFormErrorsStore } from "@/store/formErrors";

// Rutas permitidas
import { uploadAccomodationRoutes } from "@/helpers/appRoutes";

// Validaciones
import {
  checkInputStringFieldIsValid,
  checkInputNumberFieldIsValid,
} from "@/helpers/formValidator";

// Imágenes
import {
  IMG_UPLOAD_ACCOMODATION_STEP_1_A,
  IMG_UPLOAD_ACCOMODATION_STEP_1_B,
} from "@/helpers/iconConstants";

const accomodationStore = useAccomodationStore();
const formErrorsStore = useFormErrorsStore();

const allAvailableAccomodationCategories = ref([]);

/**
 * Valida el número de registro introducido.
 */
const checkRegisterNumber = async () => {
  if (!checkInputStringFieldIsValid(accomodationStore?.registerNumber, 1, 20)) {
    formErrorsStore.errors.push(
      "components.forms.messages.registerNumber.invalid"
    );
  } else {
    if (accomodationStore?.registerNumber !== "") {
      const existsAccomodation = await checkAccomodationExistsByRegNumber(
        accomodationStore?.registerNumber
      );

      if (existsAccomodation) {
        formErrorsStore.errors.push(
          "components.forms.messages.registerNumber.exists"
        );
      }
    }
  }

  showNextButton();
};

/**
 * Valida la descripción introducida.
 */
const checkAccomodationDescription = () => {
  if (!checkInputStringFieldIsValid(accomodationStore?.description, 1, 10000)) {
    formErrorsStore.errors.push(
      "components.forms.messages.description.invalid"
    );
  }

  showNextButton();
};

/**
 * Valida el área introducida.
 */
const checkAccomodationArea = () => {
  if (!checkInputNumberFieldIsValid(accomodationStore?.area, 1, 100000)) {
    formErrorsStore.errors.push("components.forms.messages.area.invalid");
  }

  showNextButton();
};

/**
 * Valida el número de camas introducido.
 */
const checkAccomodationNumOfBeds = () => {
  if (!checkInputNumberFieldIsValid(accomodationStore?.numOfBeds, 1, 100)) {
    formErrorsStore.errors.push("components.forms.messages.numOfbeds.invalid");
  }

  showNextButton();
};

/**
 * Valida el número de baños introducido.
 */
const checkAccomodationNumOfBathRooms = () => {
  if (!checkInputNumberFieldIsValid(accomodationStore?.numOfBathRooms, 1, 50)) {
    formErrorsStore.errors.push(
      "components.forms.messages.numOfBathrooms.invalid"
    );
  }

  showNextButton();
};

/**
 * Valida el número de habitaciones introducido.
 */
const checkAccomodationNumOfBedRooms = () => {
  if (!checkInputNumberFieldIsValid(accomodationStore?.numOfBedRooms, 1, 50)) {
    formErrorsStore.errors.push(
      "components.forms.messages.numOfBedrooms.invalid"
    );
  }

  showNextButton();
};

/**
 * Valida el precio del alojamiento introducido.
 */
const checkAccomodationPrice = () => {
  if (
    !checkInputNumberFieldIsValid(accomodationStore?.pricePerNight, 1, 100000)
  ) {
    formErrorsStore.errors.push("components.forms.messages.price.invalid");
  }

  showNextButton();
};

/**
 * Valida el precio del alojamiento introducido.
 */
const checkAccomodationNumOfGuests = () => {
  if (
    !checkInputNumberFieldIsValid(
      accomodationStore?.numOfGuests,
      1,
      accomodationStore?.numOfGuests
    )
  ) {
    formErrorsStore.errors.push("components.forms.messages.guests.invalid");
  }

  showNextButton();
};

const checkAccomodationCategory = () => {
  if (accomodationStore?.category === "" || !accomodationStore?.category) {
    formErrorsStore.errors.push("components.forms.messages.category.required");
  }

  showNextButton();
};

const showNextButton = async () => {
  let existsAccomodation = false;

  if (accomodationStore?.registerNumber) {
    existsAccomodation = await checkAccomodationExistsByRegNumber(
      accomodationStore?.registerNumber
    );
  }

  formErrorsStore.enableNextButton =
    checkInputStringFieldIsValid(accomodationStore?.registerNumber, 1, 20) &&
    checkInputStringFieldIsValid(accomodationStore?.description, 1, 10000) &&
    checkInputNumberFieldIsValid(accomodationStore?.area, 1, 100000) &&
    checkInputNumberFieldIsValid(accomodationStore?.numOfBeds, 1, 100) &&
    checkInputNumberFieldIsValid(accomodationStore?.numOfBathRooms, 1, 50) &&
    checkInputNumberFieldIsValid(accomodationStore?.numOfBedRooms, 1, 50) &&
    checkInputNumberFieldIsValid(accomodationStore?.pricePerNight, 1, 100000) &&
    checkInputNumberFieldIsValid(accomodationStore?.numOfGuests, 1, 100) &&
    accomodationStore?.category &&
    !existsAccomodation;

  setTimeout(() => {
    formErrorsStore.errors = [];
  }, 5000);
};

onMounted(async () => {
  allAvailableAccomodationCategories.value =
    await getAllAccomodationCategories();

  formErrorsStore.enableNextButton = false;
});

// onBeforeRouteLeave((to, from) => {
//   if (
//     formErrorsStore.enableNextButton == false &&
//     uploadAccomodationRoutes.includes(to.name)
//   ) {
//     return false;
//   }
// });
</script>

<template>
  <div class="accomodation-upload-basic-data-view">
    <h2 v-once v-t="'upload_accomodation_view.step1.title'"></h2>
    <div class="accomodation-upload-basic-data__wrapper">
      <div>
        <!-- Número de registro -->
        <LabelFormInput
          :inputLabel="$t('components.forms.registerNumber')"
          inputType="text"
          :inputValue="accomodationStore.registerNumber"
          :inputMinCharacters="2"
          :inputMaxCharacters="20"
          :convertInputToUpper="true"
          @handleInput="(value) => (accomodationStore.registerNumber = value)"
          @keydown="
            (e) =>
              convertInputToUpper
                ? (e.target.value = e.target.value.toUpperCase())
                : null
          "
          @handleBlur="checkRegisterNumber"
        />

        <!-- Descripción -->
        <BaseFormTextArea
          :inputLabel="$t('components.forms.description')"
          :inputTitle="$t('upload_accomodation_view.step1.description.title')"
          :textAreaContent="accomodationStore.description"
          @handleInput="(value) => (accomodationStore.description = value)"
          @handleBlur="checkAccomodationDescription"
        />

        <div class="accomodation-upload-basic-data_wrapper__row3">
          <!-- Categoría -->
          <BaseFormSelect
            :inputLabel="$t('components.forms.category')"
            :inputTitle="$t('upload_accomodation_view.step1.category.title')"
            :inputValue="accomodationStore.category"
            :options="[...allAvailableAccomodationCategories]"
            @handleChange="(value) => (accomodationStore.category = value)"
            @handleBlur="checkAccomodationCategory"
          />

          <!-- Superficie -->
          <LabelFormInput
            :inputLabel="$t('components.forms.area')"
            inputType="number"
            :inputTitle="$t('upload_accomodation_view.step1.area.title')"
            :inputValue="accomodationStore.area"
            :inputNumberMax="100000"
            @handleInput="(value) => (accomodationStore.area = Number(value))"
            @handleBlur="checkAccomodationArea"
          />
        </div>

        <div class="accomodation-upload-basic-data_wrapper__row4">
          <!-- Camas -->
          <LabelFormInput
            :inputLabel="$tc('components.forms.beds', 2)"
            inputType="number"
            :inputNumberMax="10"
            :inputValue="accomodationStore.numOfBeds"
            @handleInput="
              (value) => (accomodationStore.numOfBeds = Number(value))
            "
            @handleBlur="checkAccomodationNumOfBeds"
          />

          <!-- Habitaciones -->
          <LabelFormInput
            :inputLabel="$tc('components.forms.bedroom', 2)"
            inputType="number"
            :inputNumberMax="10"
            :inputValue="accomodationStore.numOfBedRooms"
            @handleInput="
              (value) => (accomodationStore.numOfBedRooms = Number(value))
            "
            @handleBlur="checkAccomodationNumOfBedRooms"
          />

          <!-- Baños -->
          <LabelFormInput
            :inputLabel="$tc('components.forms.bathroom', 2)"
            inputType="number"
            :inputValue="accomodationStore.numOfBathRooms"
            :inputNumberMax="10"
            @handleInput="
              (value) => (accomodationStore.numOfBathRooms = Number(value))
            "
            @handleBlur="checkAccomodationNumOfBathRooms"
          />
        </div>

        <div class="accomodation-upload-basic-data_wrapper__row5">
          <!-- Huéspedes -->
          <LabelFormInput
            :inputLabel="$tc('components.forms.guests', 2)"
            inputType="number"
            :inputNumberMax="100"
            :inputTitle="$t('upload_accomodation_view.step1.guests.title')"
            :inputValue="accomodationStore.numOfGuests"
            @handleInput="
              (value) => (accomodationStore.numOfGuests = Number(value))
            "
            @handleBlur="checkAccomodationNumOfGuests"
          />

          <!-- Precio -->
          <LabelFormInput
            :inputLabel="$t('components.forms.price')"
            isPriceInput="true"
            :inputValue="accomodationStore.pricePerNight"
            :inputNumberMax="100000"
            @handleInput="
              (value) => (accomodationStore.pricePerNight = Number(value))
            "
            @handleBlur="checkAccomodationPrice"
          />
        </div>
      </div>
      <div>
        <img v-once :src="IMG_UPLOAD_ACCOMODATION_STEP_1_A" alt="" />
        <img v-once :src="IMG_UPLOAD_ACCOMODATION_STEP_1_B" alt="" />
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
        width: 200px;
        object-fit: contain;
        border-radius: $global-border-radius;

        &:first-child {
          z-index: $z-index-2;
          position: absolute;
          left: 0;
          top: 0;
        }
        &:last-child {
          position: absolute;
          left: 25%;
          top: 10%;
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