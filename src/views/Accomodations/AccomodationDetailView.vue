<script setup>
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";

// Componentes
import AccomodationImagesGallery from "@/components/Accomodation/AccomodationImagesGallery.vue";

// Store
import { useAccomodationStore } from "@/store/accomodation";
const accomodationStore = useAccomodationStore();

const router = useRouter();

onMounted(async () => {
  const currentAccRegisterNumber =
    router.currentRoute.value.params.registerNumber;
  console.log(currentAccRegisterNumber);

  await accomodationStore.getAccomodationByRegisterNumber(
    currentAccRegisterNumber
  );
});
</script>

<template>
  <div class="accomodation-detail-view">
    <div class="accomodation-detail-view__wrapper">
      <div class="accomodation-detail__header">
        <h1>
          {{ accomodationStore.category.accomodationCategory }} en
          {{ accomodationStore.accomodationLocation.city }}
        </h1>
        <AccomodationImagesGallery
          :images="accomodationStore.accomodationImages"
          :regNumber="accomodationStore.registerNumber"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.accomodation-detail-view {
  margin-top: 20px;
  @include flex-row-center;
}
</style>