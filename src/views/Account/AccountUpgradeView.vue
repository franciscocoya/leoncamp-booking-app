<script setup>
import { onBeforeMount, ref } from "@vue/runtime-core";

import { useRouter } from "vue-router";

import { login } from "@/services/auth/AuthService";

// Componentes
import LabelFormInput from "@/components/Forms/LabelFormInput.vue";
import BaseButton from "@/components/Buttons/BaseButton.vue";
import BaseMessageItem from "@/components/Forms/Messages/BaseMessageItem.vue";

import { useAppContextStore } from "@/store/appContext";
import { useAuthStore } from "@/store/auth";

import { upgradeBaseUserToHost } from "@/services/user/userService";

// Validaciones formulario
import {
  checkInputStringFieldIsValid,
  checkValidDNI,
} from "@/helpers/formValidator";

// Store
const appContextStore = useAppContextStore();
const authStore = useAuthStore();

// Servicios

const router = useRouter();

// Mensajes de error del formulario
const formErrors = ref([]);
const showFormErrors = ref(false);

// Condición booleana actualización de los datos
const isUpdating = ref(false);

const isFormFieldsValid = () => {
  let isValid = true;
  showFormErrors.value = false;

  const userDni = authStore.userData.dni;
  const userDirection = authStore.userData.direction;

  // Validar campos no vacíos y que no contienen caracteres especiales
  if (!checkInputStringFieldIsValid(userDni, 9, 9, true)) {
    formErrors.value.push("components.forms.messages.dni.min");
    isValid = false;
  } else if (!checkValidDNI(userDni)) {
    formErrors.value.push("components.forms.messages.dni.invalid");
    isValid = false;
  }

  if (!checkInputStringFieldIsValid(userDirection, 5, 100, false)) {
    formErrors.value.push("components.forms.messages.direction.invalid");
    isValid = false;
  }

  showFormErrors.value = isValid;

  if (isValid == false) {
    showFormErrors.value = true;
    setTimeout(() => {
      showFormErrors.value = false;
    }, 6000);
  }

  // Limpiar los errores
  // formErrors.value = [];

  return isValid;
};

/**
 * Manejador click botón actualizar cuenta a host.
 */
const handleUpgradeAccount = async () => {
  isUpdating.value = true;
  formErrors.value = [];

  if (isFormFieldsValid()) {
    const userId = authStore?.userData?.id;
    const userDni = authStore?.userData?.dni;
    const userDirection = authStore?.userData?.direction;

    const data = await upgradeBaseUserToHost(
      userId,
      userDni,
      userDirection,
      (err) => {
        console.log(err);
      }
    );
    if (data) {
      // authStore.userData.id = data.id;
      window.confirm("Para aplicar los cambios debe cerrar sesión");
      authStore.logout();
    }
  }

  isUpdating.value = false;
};

onBeforeMount(async () => {
  await authStore.loadCurrentUserData();
});
</script>

<template>
  <div class="account-upgrade-view">
    <h1>{{$t('user_upgrade_account_view.title')}}</h1>
    <h2>
      {{
        $t('user_upgrade_account_view.subtitle')
      }}
    </h2>
    <div class="account-upgrade-view__wrapper">
      <form>
        <!-- DNI -->
        <LabelFormInput
          :inputLabel="$t('components.forms.dni')"
          :inputValue="authStore?.userData?.dni"
          :inputMaxCharacters="9"
          @handleInput="(value) => (authStore.userData.dni = value)"
        />

        <!-- Dirección -->
        <LabelFormInput
          :inputLabel="$t('components.forms.zip')"
          :inputValue="authStore?.userData?.direction"
          :inputMaxCharacters="100"
          @handleInput="(value) => (authStore.userData.direction = value)"
        />
        <Transition name="fade">
          <div v-if="showFormErrors == true">
            <BaseMessageItem
              v-for="(errorMsg, index) in formErrors"
              :key="index"
              :msg="$t(errorMsg)"
              msgType="error"
            />
          </div>
        </Transition>

        <!-- Botón actualizar -->
        <BaseButton
          :text="`${
            isUpdating == true ? $tc('user_upgrade_account_view.upgrade_status_button', 1) 
            : $tc('user_upgrade_account_view.upgrade_status_button', 2)
          }`"
          buttonStyle="baseButton-primary--filled"
          :fullWidth="appContextStore?.isMobile == true"
          id="btn-upgrade-account"
          @click="handleUpgradeAccount"
        />
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.account-upgrade-view {
  @include flex-column;
  gap: 20px;

  & > h1 {
    font-weight: 400;
  }

  & > h2 {
    font-weight: 300;
    color: $color-primary-dark;
  }

  & > .account-upgrade-view__wrapper {
    & > form {
      @include flex-column;
      gap: 20px;

      & > #btn-upgrade-account {
        align-self: flex-start;
      }
    }
  }
}

// ---------------------------------------------------------------
// -- Responsive design
// ---------------------------------------------------------------
@media (max-width: $breakpoint-sm) {
  .account-upgrade-view {
    & > h1 {
      text-align: center;
      margin: 0;
    }

    & > h2 {
      text-align: center;
    }

    & > .account-upgrade-view__wrapper {
      & > form {
        & > #btn-upgrade-account {
          width: 100%;
        }
      }
    }
  }
}
</style>