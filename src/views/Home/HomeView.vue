<script setup>
import { onMounted, ref } from "vue";

// Componentes
import AccomodationThumbnailItem from "@/components/Accomodation/AccomodationThumbnailItem.vue";
import BaseAccomodationsMap from "@/components/Maps/BaseAccomodationsMap.vue";
import SearchBarItem from "@/components/Header/SearchBar/SearchBarItem.vue";
// Servicios
import { getAllAccomodations } from "@/services/accomodation/AccomodationService";

// Store
import { useAppContextStore } from "@/store/appContext";

// Modals
import AccomodationSearchFiltersModal from "@/components/Modals/AccomodationSearchFiltersModal.vue";

// Iconos
import { ICON_FILTER } from "@/helpers/iconConstants";

const appContextStore = useAppContextStore();

let allAccomodations = ref([]);
let accomodationMarkers = ref([]);
let selectedMarkerRegNumber = ref("");
let showSearchFiltersModel = ref(false);

onMounted(async () => {
  allAccomodations.value = await getAllAccomodations();

  accomodationMarkers.value = allAccomodations.value.map((acc) => {
    //const { latitude, longitude } = acc.idAccomodationLocation;

    return {
      coords: {
        lat: acc.idAccomodationLocation.latitude,
        lng: acc.idAccomodationLocation.longitude,
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
    <Transition name="fade">
      <div v-if="showSearchFiltersModel == true">
        <AccomodationSearchFiltersModal
          @closeModal="() => (showSearchFiltersModel = false)"
        />
      </div>
    </Transition>
    <section role="toolbar" class="home-view__accomodation-filters">
      <div
        class="filter_accomodation_button"
        role="button"
        @click.prevent="() => (showSearchFiltersModel = true)"
      >
        <img :src="ICON_FILTER" alt="" />
        <span>{{ $t("components.buttons.filter") }}</span>
      </div>
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
  gap: 20px;

    & > .home-view__accomodation-filters {
      margin: 10px 0 0 50px;

      & > .filter_accomodation_button {
        @include flex-row;
        gap: 10px;
        width: 100px;
        background-color: $color-tertiary-light;
        padding: 10px;
        border-radius: $global-border-radius;
        cursor: pointer;
        transition: all 0.1s ease-in;

        &:hover {
          background-color: $color-tertiary-dark;
        }

        & > img {
          width: 20px;
          height: 20px;
        }
      }
    }

  & > .home-view__wrapper {
    display: grid;
    height: calc(100vh - $header-height - 70px);
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
    margin-left: $home-section-margin;
    background-color: none;


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
        overflow: hidden;
      }
    }
  }
}
</style>