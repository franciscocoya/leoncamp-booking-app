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
    <h2 v-else v-once>No tienes alojamientos guardados</h2>
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

// ---------------------------------------------------------------
// -- Responsive design
// ---------------------------------------------------------------
@media (max-width: $breakpoint-sm) {
  .saved-accomodations-view {
    gap: 10px;
    margin: 10px 30px;

    & > h1{
      font-size: 2rem;
      font-weight: 400;
      text-align: center;
    }
  }
}
</style>