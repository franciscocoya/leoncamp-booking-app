<script setup>
import { onMounted, ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";

import BaseButton from "@/components/Buttons/BaseButton.vue";
import LabelFormInput from "@/components/Forms/LabelFormInput.vue";
import BaseFormTextArea from "@/components/Forms/BaseFormTextArea.vue";
import BaseFormSelect from "@/components/Forms/BaseFormSelect.vue";
import BaseMessageItem from "@/components/Forms/Messages/BaseMessageItem.vue";

import ThumbnailMap from "@/components/Maps/ThumbnailMap.vue";

// Store
import { useAccomodationStore } from "@/store/accomodation";
import { useFormErrorsStore } from "@/store/formErrors";
import { useAppContextStore } from "@/store/appContext";

// Service
import { getAccomodationLocationByCoords } from "@/services/accomodation/AccomodationService";

// Rutas permitidas
import { uploadAccomodationRoutes } from "@/helpers/appRoutes";

// Validaciones
import {
  checkInputStringFieldIsValid,
  checkValidSpanishZipCode,
  checkFieldNotBlank,
} from "@/helpers/formValidator";

const accomodationStore = useAccomodationStore();
const formErrorsStore = useFormErrorsStore();
const appContextStore = useAppContextStore();

/**
 * Valida la dirección del alojamiento
 */
const checkAccomodationDirection = () => {
  if (
    !checkInputStringFieldIsValid(
      accomodationStore?.accomodationLocation.direction,
      2,
      100
    )
  ) {
    formErrorsStore.errors.push("components.forms.messages.direction.invalid");
  }

  showNextButton();
};

/**
 * Valida la ciudad introducida.
 */
const checkAccomodationCity = () => {
  if (
    !checkInputStringFieldIsValid(
      accomodationStore?.accomodationLocation.city,
      2,
      30
    )
  ) {
    formErrorsStore.errors.push(
      "components.forms.messages.location.city.invalid"
    );
  }

  showNextButton();
};

/**
 * Valida el código postal introducido.
 */
const checkAccomodationZipCode = () => {
  if (
    !checkInputStringFieldIsValid(
      accomodationStore?.accomodationLocation.zip,
      5,
      5
    )
  ) {
    formErrorsStore.errors.push(
      "components.forms.messages.location.zip.invalid"
    );
  } else {
    // Si no está vacío
    if (
      !checkValidSpanishZipCode(accomodationStore?.accomodationLocation.zip)
    ) {
      formErrorsStore.errors.push(
        "components.forms.messages.location.zip.not_spanish_zip"
      );
    }
  }

  showNextButton();
};

/**
 * Valida la latitud introducida.
 */
const checkAccomodationCoordsLat = () => {
  if (!checkFieldNotBlank(accomodationStore?.accomodationLocation.latitude)) {
    formErrorsStore.errors.push(
      "components.forms.messages.location.coords.lat.invalid"
    );
  }

  showNextButton();
};

/**
 * Valida la longitud introducida.
 */
const checkAccomodationCoordsLng = () => {
  if (!checkFieldNotBlank(accomodationStore?.accomodationLocation.longitude)) {
    formErrorsStore.errors.push(
      "components.forms.messages.location.coords.lng.invalid"
    );
  }

  showNextButton();
};

const showNextButton = () => {
  formErrorsStore.enableNextButton =
    checkInputStringFieldIsValid(
      accomodationStore?.accomodationLocation.direction,
      2,
      100
    ) &&
    checkInputStringFieldIsValid(
      accomodationStore?.accomodationLocation.city,
      2,
      30
    ) &&
    checkInputStringFieldIsValid(
      accomodationStore?.accomodationLocation.zip,
      5,
      5
    ) &&
    checkValidSpanishZipCode(accomodationStore?.accomodationLocation.zip) &&
    checkFieldNotBlank(accomodationStore?.accomodationLocation?.latitude) &&
    checkFieldNotBlank(accomodationStore?.accomodationLocation?.longitude);

  if (formErrorsStore.enableNextButton) {
    formErrorsStore.errors = [];
    
  } else {
    setTimeout(() => {
      formErrorsStore.errors = [];
    }, 4000);
  }
};

onMounted(async () => {
  formErrorsStore.enableNextButton = false;
  if (!navigator.geolocation) {
    appContextStore.isGeolocationSupported = false;
  }

  // Si el navegador soporta geolocalización, obtener las coordenadas actuales y reflejarlas en el mapa.
  // navigator.geolocation.getCurrentPosition((pos) => {
  //   accomodationStore.accomodationLocation.coords.lat = navigator.geolocation
  //     ? pos.coords.latitude
  //     : currentCoords.value.lat;
  //   accomodationStore.accomodationLocation.coords.lng = navigator.geolocation
  //     ? pos.coords.longitude
  //     : currentCoords.value.lng;
  // });

  const accomodationLocation = await getAccomodationLocationByCoords({
    lat: accomodationStore.accomodationLocation.latitude,
    lng: accomodationStore.accomodationLocation.longitude,
  });

  accomodationStore.accomodationLocation.direction =
    accomodationLocation.address;
  accomodationStore.accomodationLocation.city = accomodationLocation.city;
  accomodationStore.accomodationLocation.zip = accomodationLocation.cp;
});
</script>


<template>
  <div class="accomodation-upload-location-view">
    <h2 v-once v-t="'upload_accomodation_view.step2.title'"></h2>

    <div class="accomodation-upload-location__wrapper">
      <div class="accomodation-upload-location__form">
        <div class="accomodation-upload-location-form__coords">
          <LabelFormInput
            :inputLabel="$t('components.forms.lat')"
            inputType="text"
            :inputValue="accomodationStore.accomodationLocation.latitude"
            @handleInput="
              (value) =>
                (accomodationStore.accomodationLocation.latitude = value)
            "
            @handleBlur="checkAccomodationCoordsLat"
          />
          <LabelFormInput
            :inputLabel="$t('components.forms.lng')"
            inputType="text"
            :inputValue="accomodationStore.accomodationLocation.longitude"
            @handleInput="
              (value) =>
                (accomodationStore.accomodationLocation.longitude = value)
            "
            @handleBlur="checkAccomodationCoordsLng"
          />
        </div>
        <div class="accomodation-upload-location-form__direction">
          <LabelFormInput
            :inputLabel="$t('components.forms.address')"
            inputType="text"
            :inputValue="accomodationStore.accomodationLocation.direction"
            @handleInput="
              (value) =>
                (accomodationStore.accomodationLocation.direction = value)
            "
            @handleBlur="checkAccomodationDirection"
          />
        </div>
        <div class="accomodation-upload-location-form__direction-city">
          <LabelFormInput
            :inputLabel="$t('components.forms.city')"
            inputType="text"
            :inputValue="accomodationStore.accomodationLocation.city"
            @handleInput="
              (value) => (accomodationStore.accomodationLocation.city = value)
            "
            @handleBlur="checkAccomodationCity"
          />
          <LabelFormInput
            :inputLabel="$t('components.forms.zip')"
            inputType="text"
            :inputValue="accomodationStore.accomodationLocation.zip"
            @handleInput="
              (value) => (accomodationStore.accomodationLocation.zip = value)
            "
            @handleBlur="checkAccomodationZipCode"
          />
        </div>
        <p>
          {{$t('upload_accomodation_view.step2.help')}}
        </p>
      </div>
      <div class="accomodation-upload-location__map">
        <ThumbnailMap
          :lat="accomodationStore.accomodationLocation.latitude"
          :lng="accomodationStore.accomodationLocation.latitude"
          :isMarkerDraggable="true"
        />
      </div>
    </div>
    <Transition name="fade">
      <div v-if="appContextStore.isGeolocationSupported == true">
        <BaseMessageItem
          :msg="
            $t('components.forms.messages.location.geolocation_not_supported')
          "
          msgType="warning"
        />
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

.accomodation-upload-location-view {
  @include flex-column;
  width: 100%;
  margin-top: 20px;

  // & > h2 {
  //   font-weight: 400;
  //   text-transform: uppercase;
  //   margin-bottom: 20px;
  // }

  & > .accomodation-upload-location__wrapper {
    @include flex-row;
    flex-wrap: wrap;
    gap: 20px;

    // Estilos formulario de ubicación
    & > .accomodation-upload-location__form {
      @include flex-column;
      gap: 10px;

      & > .accomodation-upload-location-form__coords,
      & > .accomodation-upload-location-form__direction-city {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 10px;
      }
    }

    // Estilos mapa
    & > .accomodation-upload-location__map {
      width: 100%;
      height: 300px;
      flex: 1;
    }
  }
}

// -------------------------------------------------
// -- Responsive design
// -------------------------------------------------
@media screen and (max-width: $breakpoint-md) {
  .accomodation-upload-location-view {
    & > .accomodation-upload-location__wrapper {
      @include flex-column;
      margin-bottom: 30px;

      & > .accomodation-upload-location__map {
        & > div {
          height: 300px;
        }
      }
    }
  }
}
</style>