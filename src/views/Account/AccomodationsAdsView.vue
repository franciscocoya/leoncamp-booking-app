<script lang="ts" setup>
import { onMounted, ref } from "vue";

// Componentes
import AccomodationThumbnailItem from "@/components/Accomodation/AccomodationThumbnailItem.vue";

// Store
import { useAccomodationStore } from "@/store/accomodation";
const accomodationStore = useAccomodationStore();

// Alojamientos publicados por el usuario en sesión
let accomodations: any = ref([]);

onMounted(async () => {
  accomodations.value = await accomodationStore.getAllUserAccomodations();
  console.log(accomodations);
});
</script>

<template>
  <div class="accomodations-ads-view">
    <h1>Mis alojamientos</h1>
    <div class="grid-user-accomodation-ads" v-if="accomodations.length > 0">
      <AccomodationThumbnailItem
        v-for="accomodation in accomodations"
        :key="accomodation.registerNumber"
        :denomination="`${accomodation.idAccomodationCategory.accomodationCategory} en ${accomodation.idAccomodationLocation.city} `"
        :category="accomodation.idAccomodationCategory.accomodationCategory"
        :pricePerNight="accomodation.pricePerNight"
        :location="accomodation.idAccomodationLocation.direction"
      />
    </div>
    <h2 v-else>No tienes alojamientos publicados</h2>
  </div>
</template>

<style lang="scss" scoped>
</style>