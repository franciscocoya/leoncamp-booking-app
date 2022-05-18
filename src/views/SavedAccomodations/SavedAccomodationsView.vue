<script setup>
import { onMounted, ref } from "vue";

// Componentes
import AccomodationThumbnailItem from "@/components/Accomodation/AccomodationThumbnailItem.vue";

// Store
import { useAccomodationStore } from "@/store/accomodation";
const accomodationStore = useAccomodationStore();

let savedAccomodations = ref([]);

onMounted(async () => {
  savedAccomodations.value =
    await accomodationStore.getAllUserSavedAccomodations();
});
</script>

<template>
  <div class="saved-accomodations-view">
    <h1 v-once>Alojamientos guardados</h1>
    <div v-if="savedAccomodations.length > 0">
      <AccomodationThumbnailItem
        v-for="accomodation in savedAccomodations"
        :key="accomodation.idAccomodation.registerNumber"
        :savedAccId="accomodation.id"
        :accData="accomodation.idAccomodation"
        :isCurrentUserOwner="false"
        :showDeleteButton="true"
      />
    </div>
    <div v-else class="not-saved-accomodations_container">
      <h2 v-once>No tienes alojamientos guardados</h2>
      <p>Aquí se mostrarán todos los alojamientos que guardes</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

.saved-accomodations-view {
  @include flex-column;
  gap: 20px;
  margin: 20px 50px;
}

.not-saved-accomodations_container {
  @include flex-column-center;
  gap: 10px;

  & > h2 {
    font-size: 1.7rem;
    font-weight: 400;
    text-align: center;
  }
}

// ---------------------------------------------------------------
// -- Responsive design
// ---------------------------------------------------------------
@media (max-width: $breakpoint-sm) {
  .saved-accomodations-view {
    gap: 10px;
    margin: 10px 30px;

    & > h1 {
      font-size: 2rem;
      font-weight: 400;
      text-align: center;
    }
  }
}
</style>