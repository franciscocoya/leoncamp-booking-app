<script setup>
import { defineAsyncComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAccomodationStore } from "@/store/accomodation";
import { useUserStore } from "@/store/user";
// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";

const AccomodationThumbnailItem = defineAsyncComponent({
  loader: () =>
    import("@/components/Accomodation/AccomodationThumbnailItem.vue"),
});

const router = useRouter();

// Store
const accomodationStore = useAccomodationStore();
const userStore = useUserStore();

// Alojamientos publicados por el usuario en sesión
let accomodations = ref([]);

/**
 * Manejador de click para mostrar la vista de publicación de un alojamiento.
 *
 */
const handleClickUploadButton = () => {
  router.push({
    name: "account-accomodation-upload",
    params: {
      username: `${userStore.name}-${userStore.surname}`,
    },
  });
  accomodationStore.$reset();
};

onMounted(async () => {
  accomodations.value = await accomodationStore.getAllUserAccomodations();
});
</script>

<template>
  <div class="accomodations-ads-view">
    <div class="accomodations-ads-view__header">
      <h1>{{$t('account_view.account_ads.title')}}</h1>
      <BaseButton
        v-if="accomodations.length > 0"
        :text="$t('components.buttons.upload')"
        buttonStyle="baseButton-dark--outlined--small"
        buttonId="bt-ads-upload-new"
        @click="handleClickUploadButton"
      />
    </div>
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

        <template #fallback>{{$t('account_view.account_ads.loading_ads')}}</template>
      </Suspense>
    </div>
    <div v-else class="not-acomodation-ads_container">
      <h2>{{$t('account_view.account_ads.no_ads')}}</h2>
      <p>{{$t('account_view.account_ads.first_publish')}}</p>
      <BaseButton
        :text="$tc('components.buttons.upload', 1)"
        buttonStyle="baseButton-dark--filled"
        buttonId="bt-ads-upload-new"
        @click="handleClickUploadButton"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

.accomodations-ads-view {
  @include flex-column;
  justify-content: flex-start;
  gap: 10px;

  // Estilos cabecera de la vista (Título y botón de publicar)
  & > .accomodations-ads-view__header {
    @include flex-row;
    gap: 20px;
  }

  & > .grid-user-accomodation-ads {
    @include flex-column;
    gap: 20px;
  }
}

.not-acomodation-ads_container {
  @include flex-column-center;
  gap: 10px;

  & > h2 {
    font-size: 2rem;
    font-weight: 400;
  }

  & > p {
    font-size: 1.5rem;
  }
}

// ---------------------------------------------------------------
// -- Responsive design
// ---------------------------------------------------------------
@media (max-width: $breakpoint-sm) {
  .accomodations-ads-view {
    & > .accomodations-ads-view__header {
      justify-content: center;
    }
  }
}
</style>