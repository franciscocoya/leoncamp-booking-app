<script setup>
import { onMounted, ref } from "vue";

// Componentes
// import { DatePicker } from "v-calendar";
import AccomodationThumbnailItem from "@/components/Accomodation/AccomodationThumbnailItem.vue";
import BaseAccomodationsMap from "@/components/Maps/BaseAccomodationsMap.vue";
// Componentes
// import BaseMarker from "@/components/Maps/Marker/BaseMarker.vue";

// Servicios
import { getAllAccomodations } from "@/services/accomodation/AccomodationService";

// const selectedDates = {
//   checkIn: new Date(),
//   checkOut: null,
// };

// const datePicker = ref(null);

// const handleChange = () => {
//   console.log(datePicker);
// };

let allAccomodations = ref([]);

let accomodationMarkers = ref([]);

let selectedMarkerRegNumber = ref("");

onMounted(async () => {
  allAccomodations.value = await getAllAccomodations();

  // Markers de los alojamientos del listado.
  accomodationMarkers.value = await allAccomodations.value.map((acc) => {
    const { latitude, longitude } = acc.idAccomodationLocation;
    return {
      coords: {
        lat: latitude,
        lng: longitude,
      },
      price: acc.pricePerNight,
      registerNumber: acc.registerNumber,
    };
  });
});

const highLightSelectedMarker = (val) => {
  selectedMarkerRegNumber.value = val;
};

const deselectMarker = () => {
  selectedMarkerRegNumber.value = "";
};

</script>

<template>
  <!-- <DatePicker
    ref="datePicker"
    :model="range"
    :from-page="new Date()"
    :value="selectedDates"
    is-range
    :columns="$screens({ default: 1, lg: 2 })"
    color="gray"
    :min-date="new Date()"
    transition="slide-h"
  /> -->
  <section class="home-view">
    <div class="home-accomodations-list">
      <AccomodationThumbnailItem
        v-for="accomodation in allAccomodations"
        :key="accomodation.registerNumber"
        :accData="accomodation"
        :isCurrentUserOwner="true"
        :showDeleteButton="false"
        @highlightMarker="(value) => highLightSelectedMarker(value)"
        @deselectMarker="(value) => deselectMarker(value)"
      />
    </div>
    <!-- <BaseAccomodationsMap
      :markers="accomodationMarkers"
      @show-selected-marker="(value) => highLightSelectedMarker(value)"
      @hide-selected-marker="(value) => deselectMarker(value)"
      :selectedMarker="selectedMarkerRegNumber"
    /> -->
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

$home-section-margin: 50px;

.home-view {
  // height: calc(100vh - $header-height - $home-section-margin);
  display: grid;
  grid-template-columns: auto 60%;
  grid-gap: 20px;
  // gap: 20px;
  margin: $home-section-margin 0 0 $home-section-margin;
  // Estilos para la lista de alojamientos
  & > .home-accomodations-list {
    @include flex-column;
    gap: 30px;
  }
}

// --------------------------------------------------------------
// Responsive design
// --------------------------------------------------------------

@media (max-width: $breakpoint-sm) {
  .home-view{
    @include flex-column;
    margin: 20px;
  }
}
</style>