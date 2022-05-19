<script setup>
import { onBeforeMount, onMounted, ref } from "vue";

// Componentes
import AccomodationThumbnailItem from "@/components/Accomodation/AccomodationThumbnailItem.vue";
import BaseAccomodationsMap from "@/components/Maps/BaseAccomodationsMap.vue";
import SearchBarItem from "@/components/Header/SearchBar/SearchBarItem.vue";

// Servicios
import { getAllAccomodations } from "@/services/accomodation/AccomodationService";

// Store
import { useAppContextStore } from "@/store/appContext";

const appContextStore = useAppContextStore();

let allAccomodations = ref([]);
let accomodationMarkers = ref([]);
let selectedMarkerRegNumber = ref("");

onBeforeMount(async() => {
 allAccomodations.value = await getAllAccomodations();

  // Markers de los alojamientos del listado.
  accomodationMarkers.value = allAccomodations.value.map((acc) => {
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
  <main class="home-view">
    <section
      v-if="appContextStore.isMobile == true"
      class="home_accomodation_search"
    >
      <SearchBarItem
        @show-search-results="appContextStore.showSearchResults = true"
        @hide-search-results="appContextStore.showSearchResults = false"
      />
    </section>
    <section class="home-view__wrapper">
      <section class="home-accomodations-list">
        <AccomodationThumbnailItem
          v-for="accomodation in allAccomodations"
          :key="accomodation.registerNumber"
          :accData="accomodation"
          :isCurrentUserOwner="true"
          :showDeleteButton="false"
          @highlightMarker="(value) => highLightSelectedMarker(value)"
          @deselectMarker="(value) => deselectMarker(value)"
        />
      </section>
      <BaseAccomodationsMap
        :markers="accomodationMarkers"
        @show-selected-marker="(value) => highLightSelectedMarker(value)"
        @hide-selected-marker="(value) => deselectMarker(value)"
        :selectedMarker="selectedMarkerRegNumber"
      />
    </section>
  </main>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

$home-section-margin: 50px;

.home-view {
  @include flex-column;
  & > .home-view__wrapper {
    display: grid;
    height: calc(100vh - $header-height - 50px);
    grid-template-columns: auto 50%;
    gap: 5px;
    margin: $home-section-margin 0 0 $home-section-margin;
    // Estilos para la lista de alojamientos
    & > .home-accomodations-list {
      @include flex-column;
      height: 100%;
      gap: 30px;
      overflow-y: scroll;
      padding-bottom: 50px;
    }
  }
}

// --------------------------------------------------------------
// Responsive design
// --------------------------------------------------------------

@media (max-width: $breakpoint-md) {
  .home-view {
    height: 100%;
    margin: 20px 10px;

    & > .home-view__wrapper {
      @include flex-column;
      margin: 20px;
      height: max-content;
      & > .home-accomodations-list {
        overflow: auto;
      }
    }
  }
}
</style>