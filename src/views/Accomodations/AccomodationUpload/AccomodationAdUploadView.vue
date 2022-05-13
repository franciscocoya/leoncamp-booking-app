<script setup>
import { ref, onMounted } from "vue";
import { RouterView, useRouter } from "vue-router";

// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";

// Servicios
import { addNewAccomodation } from "@/services/accomodation/AccomodationService";
import { getUserDataById } from "@/services/user/userService";

// Store
import { useAccomodationStore } from "@/store/accomodation";
import {useAppContextStore} from "@/store/appContext";

const router = useRouter();

const accomodationUploadSteps = [
  "accomodation-upload-basic-data",
  "accomodation-upload-location",
  "accomodation-upload-services",
  "accomodation-upload-rules",
  "accomodation-upload-images",
];

const accomodationStore = useAccomodationStore();
const appContextStore = useAppContextStore();

// Número de paso de subida de alojamiento
const currentUploadStepNum = ref(1);

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
 * Finaliza la subida de un alojamiento, con todos los datos
 * de los 5 pasos (Datos básicos, ubicación, servicios, reglas e imagenes)
 */
const handleUploadAccomodation = async () => {
  console.log(accomodationStore.$state);
  await addNewAccomodation(accomodationStore.$state);
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

onMounted(async () => {
  currentUploadStepNum.value = 0;
  currentUploadStepRoute.value = router.currentRoute.value.name;
  currentUploadStepNum.value = accomodationUploadSteps.indexOf(
    currentUploadStepRoute.value
  );
  //
  let currentUser = await getUserDataById(
    JSON.parse(sessionStorage.getItem("user")).id
  );

  accomodationStore.userHost = currentUser;
});
</script>

<template>
  <div class="accomodation-upload-view">
    <div class="accomodation-upload-view__header">
      <h1 v-once>Publicar un nuevo alojamiento</h1>
    </div>
    <div class="accomodation-upload-view__body">
      <Transition name="slide-right-fade">
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
            :text="`${currentUploadStepNum == 4 ? 'Finalizar' : 'Siguiente'}`"
            buttonStyle="baseButton-dark--filled--small"
            @click="
              currentUploadStepNum == 4
                ? handleUploadAccomodation()
                : showNextStep()
            "
          />
        </div>
        <!-- TODO: Child component con el paso -->
        <p v-if="appContextStore.isMobile == false">Paso {{ currentUploadStepNum + 1 }} de 5</p>
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
      margin-bottom: 30px;
      font-size: 1.5rem;
      font-weight: 400;
    }
  }

  & > .accomodation-upload-view__body {
    @include flex-column;

    & > .accomodation_upload_steps {
      @include flex-column;
      margin: 30px 0;

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

// Estilos titulos de los pasos
:deep(h2) {
  font-weight: 400;
  text-transform: uppercase;
  margin-bottom: 20px;
}

// ---------------------------------------------------------------
// -- Responsive design
// ---------------------------------------------------------------
@media (max-width: $breakpoint-sm) {
  :deep(h2) {
    text-align: center;
  }

  .accomodation-upload-view {

    // Estilos botones volver y siguiente en móvil
    & > .accomodation-upload-view__body{
      flex-direction: column-reverse;
    }
  }
}
</style>