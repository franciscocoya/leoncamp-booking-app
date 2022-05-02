<script setup>
import { onBeforeMount, onMounted, ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";

// Componentes
import AccomodationImagesGallery from "@/components/Accomodation/AccomodationImagesGallery.vue";
import AccomodationServicesItem from "@/components/Accomodation/AccomodationServicesItem.vue";
import AccomodationReviewsItem from "@/components/Accomodation/AccomodationReview/AccomodationReviewsItem.vue";

import ThumbnailMap from "@/components/Maps/ThumbnailMap.vue";

import BasePreloader from "@/components/Preloader/BasePreloader.vue";

// Store
import { useAccomodationStore } from "@/store/accomodation";
const accomodationStore = useAccomodationStore();

const router = useRouter();

const isLoading = ref(true);

onBeforeMount(() => {
  isLoading.value = true;
});

onMounted(async () => {
  const currentAccRegisterNumber =
    router.currentRoute.value.params.registerNumber;

  await accomodationStore.getAccomodationByRegisterNumber(
    currentAccRegisterNumber
  );

  isLoading.value = false;
});
</script>

<template>
  <Transition v-if="isLoading === false">
    <div class="accomodation-detail-view">
      <div class="accomodation-detail-view__wrapper">
        <!-- Seccion título y galería de imágenes -->
        <section class="accomodation-detail__header">
          <h1>
            {{ accomodationStore.category.accomodationCategory }} en
            {{ accomodationStore.accomodationLocation.city }}
          </h1>

          <AccomodationImagesGallery
            :images="accomodationStore.accomodationImages"
            :regNumber="accomodationStore.registerNumber"
          />
        </section>

        <!-- Descripción del alojamiento -->
        <section class="accomodation-detail__description">
          <p>
            {{ accomodationStore.description }}
          </p>
        </section>

        <!-- Seccion servicios -->
        <section class="accomodation-detail__services">
          <h2>Servicios que ofrece</h2>
          <AccomodationServicesItem
            :services="accomodationStore.accomodationServices"
          />
        </section>

        <!-- Sección mapa ubicación alojamiento -->
        <section class="accomodation-detail__location">
          <h2>Dónde se encuentra</h2>
          <!-- <ThumbnailMap
            :lat="accomodationStore.latitude"
            :lng="accomodationStore.longitude"
            :mapWidth="800"
            :mapHeight="500"
          /> -->
        </section>

        <!-- Sección valoraciones -->
        <section class="accomodation-detail__reviews">
          <AccomodationReviewsItem
            :registerNumber="accomodationStore.registerNumber"
          />
        </section>
      </div>
    </div>
  </Transition>
  <!-- Preloader -->
  <BasePreloader v-else />
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.accomodation-detail-view {
  margin-top: 20px;

  & > .accomodation-detail-view__wrapper {
    @include flex-column;
    width: 80%;
    margin: 0 auto;
    gap: 40px;

    // Estilos cabecera detalles
    & > .accomodation-detail__header {
      @include flex-column-center;
    }

    // Estilos seccion servicios
    & > .accomodation-detail__services {
      @include flex-column;
      align-items: flex-start;
    }
  }
}

// Estilos transicion
.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>