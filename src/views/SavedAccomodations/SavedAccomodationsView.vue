<script setup>
import { onMounted, onUpdated, reactive } from "vue";

// Componentes
import AccomodationThumbnailItem from "@/components/Accomodation/AccomodationThumbnailItem.vue";

// Store
import { useAccomodationStore } from "@/store/accomodation";
const accomodationStore = useAccomodationStore();

// let savedAccomodations = ref([]);

let savedAccomodations = reactive({
  all: [],
});

onMounted(async () => {
  savedAccomodations.all =
    await accomodationStore.getAllUserSavedAccomodations();
});

// onUpdated(async () => {
//   savedAccomodations.all =
//     await accomodationStore.getAllUserSavedAccomodations();
// });
</script>

<template>
  <div class="saved-accomodations-view">
    <h1 v-once v-t="'saved_view.title'"></h1>
    <div v-if="savedAccomodations.all.length > 0">
      <AccomodationThumbnailItem
        v-for="accomodation in savedAccomodations.all"
        :key="accomodation.idAccomodation.registerNumber"
        :savedAccId="accomodation.id"
        :accData="accomodation.idAccomodation"
        :isCurrentUserOwner="false"
        :showDeleteButton="true"
      />
    </div>
    <div v-else class="not-saved-accomodations_container">
      <h2 v-once v-t="'saved_view.not_saved'"></h2>
      <p v-t="'saved_view.not_saved_subtitle'"></p>
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