<script setup>
import { onMounted, ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";

import BaseButton from "@/components/Buttons/BaseButton.vue";
import LabelFormInput from "@/components/Forms/LabelFormInput.vue";
import BaseFormTextArea from "@/components/Forms/BaseFormTextArea.vue";
import BaseFormSelect from "@/components/Forms/BaseFormSelect.vue";

import ThumbnailMap from "@/components/Maps/ThumbnailMap.vue";

// Store
import { useAccomodationStore } from "@/store/accomodation";
import { useFormErrorsStore } from "@/store/formErrors";

// Service
import { getAccomodationLocationByCoords } from "@/services/accomodation/AccomodationService";

// Rutas permitidas
import { headerRoutes } from "@/helpers/appRoutes";

// Validaciones
import {
  checkInputStringFieldIsValid,
  checkValidSpanishZipCode,
} from "@/helpers/formValidator";

// Si el usuario no acepta el uso de la geolocalizacion, se muestran por defecto
// las coordenadas del centro de León.
const currentCoords = ref({
  lat: 42.598283859657776,
  lng: -5.570953032164213,
});

const accomodationStore = useAccomodationStore();
const formErrorsStore = useFormErrorsStore();

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
    formErrorsStore.errors.push("La dirección introducida no es válida");
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
    formErrorsStore.errors.push("La ciudad introducida no es válida");
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
      4,
      4
    )
  ) {
    formErrorsStore.errors.push("El código postal no es válido");
  } else {
    // Si no está vacío
    if (
      !checkValidSpanishZipCode(accomodationStore?.accomodationLocation.zip)
    ) {
      formErrorsStore.errors.push(
        "El código postal no se corresponde con ninguna provincia"
      );
    }
  }

  showNextButton();
};

const showNextButton = () => {
  formErrorsStore.enableNextButton =
    checkInputStringFieldIsValid(
      accomodationStore?.accomodationLocation.direction
    ) &&
    checkInputStringFieldIsValid(
      accomodationStore?.accomodationLocation.city
    ) &&
    checkInputStringFieldIsValid(accomodationStore?.accomodationLocation.zip) &&
    checkValidSpanishZipCode(accomodationStore?.accomodationLocation.zip);

  if (formErrorsStore.enableNextButton) {
    formErrorsStore.errors = [];
  }
};

onMounted(async () => {
  if (!navigator.geolocation) {
    console.log("El navegador no sorporta geolocalización.");
  }

  // Si el navegador soporta geolocalización, obtener las coordenadas actuales y reflejarlas en el mapa.
  navigator.geolocation.getCurrentPosition((pos) => {
    accomodationStore.accomodationLocation.coords.lat = navigator.geolocation
      ? pos.coords.latitude
      : currentCoords.value.lat;
    accomodationStore.accomodationLocation.coords.lng = navigator.geolocation
      ? pos.coords.longitude
      : currentCoords.value.lng;
  });

  const accomodationLocation = await getAccomodationLocationByCoords({
    lat: accomodationStore.accomodationLocation.coords.lat,
    lng: accomodationStore.accomodationLocation.coords.lng,
  });

  accomodationStore.accomodationLocation.direction =
    accomodationLocation.address;
  accomodationStore.accomodationLocation.city = accomodationLocation.city;
  accomodationStore.accomodationLocation.zip = accomodationLocation.cp;
});

onBeforeRouteLeave((from, to) => {
  if (
    formErrorsStore.enableNextButton == false &&
    !headerRoutes.includes(to.name)
  ) {
    return false;
  }
});
</script>


<template>
  <div class="accomodation-upload-location-view">
    <h2 v-once>Ubicación</h2>

    <div class="accomodation-upload-location__wrapper">
      <div class="accomodation-upload-location__form">
        <div class="accomodation-upload-location-form__coords">
          <LabelFormInput
            inputLabel="Latitud"
            inputType="text"
            :isReadonly="true"
            :inputValue="accomodationStore.accomodationLocation.coords.lat"
            @handleInput="
              (value) =>
                (accomodationStore.accomodationLocation.coords.lat = value)
            "
          />
          <LabelFormInput
            inputLabel="Longitud"
            inputType="text"
            :isReadonly="true"
            :inputValue="accomodationStore.accomodationLocation.coords.lng"
            @handleInput="
              (value) =>
                (accomodationStore.accomodationLocation.coords.lng = value)
            "
          />
        </div>
        <div class="accomodation-upload-location-form__direction">
          <LabelFormInput
            inputLabel="Dirección"
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
            inputLabel="Ciudad"
            inputType="text"
            :inputValue="accomodationStore.accomodationLocation.city"
            @handleInput="
              (value) => (accomodationStore.accomodationLocation.city = value)
            "
            @handleBlur="checkAccomodationCity"
          />
          <LabelFormInput
            inputLabel="Código Postal"
            inputType="text"
            :inputValue="accomodationStore.accomodationLocation.zip"
            @handleInput="
              (value) => (accomodationStore.accomodationLocation.zip = value)
            "
            @handleBlur="checkAccomodationZipCode"
          />
        </div>
        <p>
          * Puedes arrastrar el marcador del mapa para obtener rellenar los
          campos automáticamente.
        </p>
      </div>
      <div class="accomodation-upload-location__map">
        <ThumbnailMap
          :lat="currentCoords.lat"
          :lng="currentCoords.lng"
          :isMarkerDraggable="true"
        />
      </div>
    </div>
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