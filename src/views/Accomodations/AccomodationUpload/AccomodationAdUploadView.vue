<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";
import BaseMessageItem from "@/components/Forms/Messages/BaseMessageItem.vue";

// Servicios
import { addNewAccomodation } from "@/services/accomodation/AccomodationService";

// Store
import { useAccomodationStore } from "@/store/accomodation";
import { useAppContextStore } from "@/store/appContext";
import { useFormErrorsStore } from "@/store/formErrors";
import { useAuthStore } from "@/store/auth";

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
const authStore = useAuthStore();
const formErrorsStore = useFormErrorsStore();

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

  if (formErrorsStore.enableNextButton == true) {
    currentUploadStepNum.value++;
    currentUploadStepRoute.value =
      accomodationUploadSteps[currentUploadStepNum.value];

    router.push({
      name: currentUploadStepRoute.value,
    });
  }
};

/**
 * Finaliza la subida de un alojamiento, con todos los datos
 * de los 5 pasos (Datos básicos, ubicación, servicios, reglas e imagenes)
 */
const handleUploadAccomodation = async () => {
  await addNewAccomodation(accomodationStore.$state);
};

/**
 * Vuelve al paso anterior.
 */
const showPreviousStep = () => {
  if (currentUploadStepNum.value == 0) {
    currentUploadStepNum.value = 0;
  }

  if (formErrorsStore.enableNextButton == true) {
    currentUploadStepNum.value--;
    currentUploadStepRoute.value =
      accomodationUploadSteps[currentUploadStepNum.value];
    router.push({
      name: currentUploadStepRoute.value,
    });
  }
};

onMounted(async () => {
  currentUploadStepRoute.value = router.currentRoute.value.name;
  currentUploadStepNum.value = accomodationUploadSteps.indexOf(
    currentUploadStepRoute.value
  );

  formErrorsStore.enableNextButton = false;

  accomodationStore.$state = {};
  accomodationStore.userHost = authStore?.userData;
});
</script>

<template>
  <div class="accomodation-upload-view">
    <div class="accomodation-upload-view__header">
      <h1 v-once v-t="'upload_accomodation_view.title'"></h1>
    </div>
    <div class="accomodation-upload-view__body">
      <Transition name="slide-right-fade">
        <RouterView />
      </Transition>
      <div class="accomodation_upload_steps">
        <div class="accomodation_upload_steps__buttons">
          <BaseButton
            :text="$tc('components.buttons.back', 2)"
            buttonStyle="baseButton-dark--filled--small"
            :style="`opacity: ${
              router.currentRoute.value.name !== accomodationUploadSteps[0]
                ? '1'
                : '0'
            }`"
            @click="showPreviousStep"
          />
          <BaseButton
            :text="`${currentUploadStepNum == 4 ? $t('components.buttons.finish') : $t('components.buttons.next')}`"
            buttonStyle="baseButton-dark--filled--small"
            :isDisabled="formErrorsStore.enableNextButton == false"
            @click="
              currentUploadStepNum == 4
                ? handleUploadAccomodation()
                : showNextStep()
            "
          />
        </div>
        <p v-if="appContextStore.isMobile == false">
          {{
            $tc('upload_accomodation_view.step_display', {
              n1: currentUploadStepNum + 1,
              n2: accomodationUploadSteps.length,
            })
          }}
        </p>
      </div>
      <Transition name="fade">
        <div v-if="formErrorsStore.errors.length > 0">
          <BaseMessageItem
            v-for="(errorMsg, index) in formErrorsStore.errors"
            :key="index"
            :msg="errorMsg"
            msgType="error"
          />
        </div>
      </Transition>
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
    & > .accomodation-upload-view__body {
      flex-direction: column-reverse;
    }
  }
}
</style>