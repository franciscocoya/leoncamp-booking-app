<script setup>
import { defineAsyncComponent, onMounted, ref } from "vue";
import {useRouter} from "vue-router";
import { useAccomodationStore } from "@/store/accomodation";
import {useUserStore} from "@/store/user";
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

onMounted(async () => {
  accomodations.value = await accomodationStore.getAllUserAccomodations();
});
</script>

<template>
  <div class="accomodations-ads-view">
    <div class="accomodations-ads-view__header">
      <h1 v-once>Mis alojamientos</h1>
      <BaseButton
        text="Publicar"
        buttonStyle="baseButton-dark--outlined--small"
        buttonId="bt-ads-upload-new"
        @click="router.push({
          name: 'account-accomodation-upload',
          params: {
            username: `${userStore.name.toLowerCase()}-${userStore.surname.toLowerCase()}`,
          },
        })"
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

  // Estilos cabecera de la vista (Título y botón de publicar)
  & > .accomodations-ads-view__header{
    @include flex-row;
    gap: 20px;
  }
}
</style>