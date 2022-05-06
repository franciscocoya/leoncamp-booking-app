<script setup>
import { defineAsyncComponent, onMounted, ref } from "vue";
import { useAccomodationStore } from "@/store/accomodation";

const AccomodationThumbnailItem = defineAsyncComponent({
  loader: () =>
    import("@/components/Accomodation/AccomodationThumbnailItem.vue"),
});

// Store
const accomodationStore = useAccomodationStore();

// Alojamientos publicados por el usuario en sesión
let accomodations = ref([]);

onMounted(async () => {
  accomodations.value = await accomodationStore.getAllUserAccomodations();
});
</script>

<template>
  <div class="accomodations-ads-view">
    <h1 v-once>Mis alojamientos</h1>
    <div class="grid-user-accomodation-ads" v-if="accomodations.length > 0">
      <Suspense>
        <AccomodationThumbnailItem
          v-for="accomodation in accomodations"
          :key="accomodation.registerNumber"
          :accData="accomodation"
          :isCurrentUserOwner="true"
          :showDeleteButton="false"
          :showEditButton="true"
        />

        <template #fallback>Cargando... </template>
      </Suspense>
    </div>
    <h2 v-else>No tienes alojamientos publicados</h2>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

.accomodations-ads-view {
  @include flex-column;
  justify-content: flex-start;
  gap: 10px;
}
</style>