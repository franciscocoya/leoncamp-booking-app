<script setup>
import { onMounted, ref } from "vue";

// Componentes
import { DatePicker } from "v-calendar";
import AccomodationThumbnailItem from '@/components/Accomodation/AccomodationThumbnailItem.vue';


// Servicios
import {getAllAccomodations} from '@/services/accomodation/AccomodationService';

const selectedDates = {
  checkIn: new Date(),
  checkOut: null,
};

const datePicker = ref(null);

const handleChange = () => {
  console.log(datePicker);
};

onMounted(async () => {
  // const accomodations = await getAllAccomodations();
  // console.log(accomodations);
});
</script>

<template :slot="{inputValue}">
  <h1>Hello</h1>
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
  <AccomodationThumbnailItem />
</template>

<style scoped>
</style>