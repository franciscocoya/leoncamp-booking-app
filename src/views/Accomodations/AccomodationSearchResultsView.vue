<script setup>
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";

// Componentes
import AccomodationThumbnailItem from "@/components/Accomodation/AccomodationThumbnailItem.vue";
import BaseAccomodationsMap from "@/components/Maps/BaseAccomodationsMap.vue";

// Servicios
import { getAllAccomodationsByCity } from "@/services/accomodation/AccomodationService";

// Store
const route = useRoute();

let filteredAccomodations = ref([]);
let accomodationMarkers = ref([]);

onBeforeMount(async () => {
  filteredAccomodations.value = await getAllAccomodationsByCity(
    route.params.city
  );

  accomodationMarkers.value = await filteredAccomodations.value.map((acc) => {
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
</script>

<template>
  <div class="accomodation-city-results-view">
    <h1>Alojamientos en {{ route.params.city }}</h1>
    <div class="accomodation-city-results__wrapper">
      <section class="home-accomodations-list">
        <AccomodationThumbnailItem
          v-for="accomodation in filteredAccomodations"
          :key="accomodation.registerNumber"
          :accData="accomodation"
          :isCurrentUserOwner="true"
          :showDeleteButton="false"
        />
      </section>
      <BaseAccomodationsMap
        :markers="accomodationMarkers"
        :selectedMarker="selectedMarkerRegNumber"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.accomodation-city-results-view {
  @include flex-column;
  gap: 20px;
  margin: 30px 0;

  & > h1 {
    font-weight: 400;
    text-align: center;
  }

  & > .accomodation-city-results__wrapper {
    margin: 0 50px;

    & > .home-accomodations-list {
      @include flex-column;
      gap: 50px;
    }
  }
}
</style>