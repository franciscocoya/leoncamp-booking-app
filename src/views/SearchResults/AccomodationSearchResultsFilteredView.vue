<script setup>
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// Componentes
import AccomodationThumbnailItem from "@/components/Accomodation/AccomodationThumbnailItem.vue";
import BaseAccomodationsMap from "@/components/Maps/BaseAccomodationsMap.vue";

// Servicios
import { getAccomodationMultipleFilter } from "@/services/accomodation/AccomodationService";

// Store
const route = useRoute();

let filteredAccomodations = ref([]);
let accomodationMarkers = ref([]);

onBeforeMount(async () => {
  const minPrice = Number(route.query.minprice);
  const maxPrice = Number(route.query.maxprice);
  const beds = Number(route.query.beds);
  const bedrooms = Number(route.query.bedrooms);
  const bathrooms = Number(route.query.bathrooms);
  const guests = Number(route.query.guests);

  filteredAccomodations.value = await getAccomodationMultipleFilter(
    minPrice,
    maxPrice,
    beds,
    bedrooms,
    bathrooms,
    guests,
    (err) => {
      console.log(err);
    }
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
  <div class="accomodation-filter-results-view">
    <h1>
      {{ $t("accommodation_results_filtered_view.title") }}
    </h1>
    <div class="accomodation_results_columns">
      <div class="accomodation-results__wrapper">
        <div class="accomodation_results_filters_container">
          <!-- Precio mínimo -->
          <span
            v-if="route.query.minprice > 0"
            class="filter_number_selector_button"
          >
            {{
              $tc("accommodation_results_filtered_view.filters.price.min", {
                n: route.query.minprice,
                symbol: $t("currency.symbol"),
              })
            }}
          </span>
          <!-- Precio máximo -->
          <span
            v-if="route.query.maxprice > 0"
            class="filter_number_selector_button"
          >
            {{
              $tc("accommodation_results_filtered_view.filters.price.max", {
                n: route.query.maxprice,
                symbol: $t("currency.symbol"),
              })
            }}
          </span>

          <!-- Número de camas -->
          <span
            v-if="route.query.beds > 0"
            class="filter_number_selector_button"
          >
            {{
              $tc("accommodation_results_filtered_view.filters.beds", {
                n: route.query.beds,
              })
            }}
          </span>

          <!-- Número habitaciones -->
          <span
            v-if="route.query.bedrooms > 0"
            class="filter_number_selector_button"
          >
            {{
              $tc("accommodation_results_filtered_view.filters.bedrooms", {
                n: route.query.bedrooms,
              })
            }}
          </span>

          <!-- Número baños -->
          <span
            v-if="route.query.bathrooms > 0"
            class="filter_number_selector_button"
          >
            {{
              $tc("accommodation_results_filtered_view.filters.bathrooms", {
                n: route.query.bathrooms,
              })
            }}
          </span>

          <!-- Número huéspedes -->
          <span
            v-if="route.query.guests > 0"
            class="filter_number_selector_button"
          >
            {{
              $tc("accommodation_results_filtered_view.filters.guests", {
                n: route.query.guests,
                symbol: $t("currency.symbol"),
              })
            }}
          </span>
        </div>
        <Transition name="fade">
          <section
            class="results-accomodations-list"
            v-if="filteredAccomodations.length > 0"
          >
            <AccomodationThumbnailItem
              v-for="accomodation in filteredAccomodations"
              :key="accomodation.registerNumber"
              :accData="accomodation"
              :isCurrentUserOwner="true"
              :showDeleteButton="false"
            />
          </section>
          <div v-else class="no_accomodation_results_container">
            <h2 class="no_results_found">
              {{ $t("accommodation_results_filtered_view.no_results") }}
            </h2>
          </div>
        </Transition>
      </div>
      <BaseAccomodationsMap
        :markers="accomodationMarkers"
        :selectedMarker="selectedMarkerRegNumber"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.accomodation-filter-results-view {
  @include flex-column;
  gap: 20px;
  margin: 30px 0;

  & > h1 {
    font-weight: 400;
    text-align: center;
  }

  & > .accomodation_results_columns {
    & > .accomodation-results__wrapper {
      @include flex-column;
      gap: 40px;
      margin: 0 50px;

      & > .accomodation_results_filters_container {
        @include flex-row;
        gap: 10px;
        flex-wrap: wrap;
      }

      & > .results-accomodations-list {
        @include flex-column;
        gap: 50px;
      }

      & > .no_accomodation_results_container {
        margin-top: 30px;
        & > h2 {
          text-align: center;
          color: $color-dark;
          font-weight: 400;
        }
      }
    }
  }
}
</style>