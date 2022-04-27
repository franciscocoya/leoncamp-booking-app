<script setup>
import { onMounted } from "vue";

// Componentes
// import { DatePicker } from "v-calendar";
import AccomodationThumbnailItem from "@/components/Accomodation/AccomodationThumbnailItem.vue";
// import BaseAccomodationsMap from "@/components/Maps/BaseAccomodationsMap.vue";
// Componentes
// import BaseMarker from "@/components/Maps/Marker/BaseMarker.vue";

// Servicios
// import {getAllAccomodations, getAccomodationById} from '@/services/accomodation/AccomodationService';

// const selectedDates = {
//   checkIn: new Date(),
//   checkOut: null,
// };

// const datePicker = ref(null);

// const handleChange = () => {
//   console.log(datePicker);
// };

onMounted(async () => {
  // const accomodations = await getAllAccomodations();
  // const accomodation = await getAccomodationById('0001234A');
  // console.log(accomodation);
});
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
      <AccomodationThumbnailItem />
      <AccomodationThumbnailItem />
      <AccomodationThumbnailItem />
    </div>
    <!-- <BaseAccomodationsMap /> -->
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

$home-section-margin: 50px;

.home-view {
  height: calc(100vh - $header-height - $home-section-margin);
  display: grid;
  grid-template-columns: 40% 60%;
  // gap: 20px;
  margin: $home-section-margin 0 0 $home-section-margin;
  // Estilos para la lista de alojamientos
  & > .home-accomodations-list {
    @include flex-column;
    gap: 30px;
  }
}
</style>