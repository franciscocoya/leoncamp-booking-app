<script setup>
import { onMounted, ref } from "vue";

import BaseButton from "@/components/Buttons/BaseButton.vue";
import LabelFormInput from "@/components/Forms/LabelFormInput.vue";
import BaseFormTextArea from "@/components/Forms/BaseFormTextArea.vue";
import BaseFormSelect from "@/components/Forms/BaseFormSelect.vue";

import ThumbnailMap from "@/components/Maps/ThumbnailMap.vue";

// Store
import { useAccomodationStore } from "@/store/accomodation";

// Si el usuario no acepta el uso de la geolocalizacion, se muestran por defecto
// las coordenadas del centro de León.
const currentCoords = ref({
  lat: 42.598283859657776,
  lng: -5.570953032164213,
});

const accomodationStore = useAccomodationStore();

onMounted(() => {
  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by this browser.");
  }
  navigator.geolocation.getCurrentPosition((pos) => {
    accomodationStore.accomodationLocation.coords.lat = navigator.geolocation
      ? pos.coords.latitude
      : currentCoords.value.lat;
    accomodationStore.accomodationLocation.coords.lng = navigator.geolocation
      ? pos.coords.longitude
      : currentCoords.value.lng;
  });
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
            :inputValue="accomodationStore.accomodationLocation.coords.lat"
            @handleInput="
              (value) =>
                (accomodationStore.accomodationLocation.coords.lat = value)
            "
          />
          <LabelFormInput
            inputLabel="Longitud"
            inputType="text"
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
          />
          <LabelFormInput
            inputLabel="Código Postal"
            inputType="text"
            :inputValue="accomodationStore.accomodationLocation.zip"
            @handleInput="
              (value) => (accomodationStore.accomodationLocation.zip = value)
            "
          />
        </div>
        <p>
          * Si modificas los campos en el formulario, no se actualizará en el
          mapa.
        </p>
      </div>
      <div class="accomodation-upload-location__map">
        <!-- <ThumbnailMap
          :lat="currentCoords.lat"
          :lng="currentCoords.lng"
          :isMarkerDraggable="true"
        /> -->
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

      & > .accomodation-upload-location-form__coords {
        @include flex-row;
        gap: 10px;
      }

      & > .accomodation-upload-location-form__direction-city {
        @include flex-row;
        gap: 10px;
      }
    }

    // Estilos mapa
    & > .accomodation-upload-location__map {
      height: 300px;
      flex: 1;
    }
  }
}
</style>