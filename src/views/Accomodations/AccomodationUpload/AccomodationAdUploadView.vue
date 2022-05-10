<script setup>
import { ref, onMounted } from "vue";

import { RouterView, useRouter } from "vue-router";
import BaseButton from "@/components/Buttons/BaseButton.vue";

const router = useRouter();

const accomodationUploadSteps = [
  "accomodation-upload-basic-data",
  "accomodation-upload-location",
];

// Número de paso de subida de alojamiento
const currentUploadStepNum = ref(0);

// Ruta paso subida alojamiento actual
const currentUploadStepRoute = ref(accomodationUploadSteps[0]);

/**
 * Muestra la ventana del siguiente paso a realizar para subir un alojamiento
 */
const showNextStep = () => {
  if (currentUploadStepNum.value == 5) {
    currentUploadStepNum.value = 5;
  }
  currentUploadStepNum.value++;
  currentUploadStepRoute.value =
    accomodationUploadSteps[currentUploadStepNum.value];
  router.push({
    name: currentUploadStepRoute.value,
  });
};

/**
 * Vuelve al paso anterior.
 */
const showPreviousStep = () => {
  if (currentUploadStepNum == 0) {
    currentUploadStepNum.value = 0;
  }
  currentUploadStepNum.value--;
  currentUploadStepRoute.value =
    accomodationUploadSteps[currentUploadStepNum.value];
  router.push({
    name: currentUploadStepRoute.value,
  });
};

onMounted(() => {
  currentUploadStepRoute.value = router.currentRoute.value.name;
});
</script>

<template>
  <div class="accomodation-upload-view">
    <div class="accomodation-upload-view__header">
      <h1 v-once>Publicar un nuevo alojamiento</h1>
    </div>
    <div class="accomodation-upload-view__body">
      <Transition name="slide-fade">
        <RouterView />
      </Transition>
      <div class="accomodation_upload_steps">
        <div class="accomodation_upload_steps__buttons">
          <BaseButton
            text="Volver"
            buttonStyle="baseButton-dark--filled--small"
            :style="`opacity: ${
              router.currentRoute.value.name !== accomodationUploadSteps[0]
                ? '1'
                : '0'
            }`"
            @click="showPreviousStep"
          />
          <BaseButton
            text="Siguiente"
            buttonStyle="baseButton-dark--filled--small"
            @click="showNextStep"
          />
        </div>
        <!-- TODO: Child component con el paso -->
        <p>Paso {{ currentUploadStepNum + 1 }} de 5</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

.accomodation-upload-view {
  @include flex-column;
  margin: 20px 50px;

  & > .accomodation-upload-view__header {
    @include flex-column;

    & > h1 {
      text-align: center;
      margin: 0;
      font-size: 1.5rem;
      font-weight: 400;
    }
  }

  & > .accomodation-upload-view__body {
    @include flex-column;

    & > .accomodation_upload_steps {
      @include flex-column;
      margin-top: 20px;

      // Estilos contenedor botones siguiente y volver
      & > .accomodation_upload_steps__buttons {
        @include flex-row;
        justify-content: space-between;
      }

      // Estilos texto paso actual
      & > p {
        text-align: center;
      }
    }
  }
}
</style>