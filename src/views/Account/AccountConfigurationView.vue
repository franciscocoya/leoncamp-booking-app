<script setup>
import { onMounted, ref } from "vue";

// Componentes
import BaseFormSelect from "@/components/Forms/BaseFormSelect.vue";
import BaseButton from "@/components/Buttons/BaseButton.vue";

// Service
import {
  addUserConfigurationToUser,
  updateUserConfiguration,
} from "@/services/user/userService";

// Store
import { useAppContextStore } from "@/store/appContext";
import { useAuthStore } from "@/store/auth";

const appContextStore = useAppContextStore();
const authStore = useAuthStore();

// True si el usuario tiene configuración establecida
const hasUserPreviuousConfig = ref(false);

const isExecution = ref(false);

/**
 * Manejador del evento del selector de divisa.
 */
const handleCurrencySelection = (e) => {
  let selectedCurrency = [...appContextStore.appCurrencies].filter(
    (c) => c.currencyCode === Number(e.target.value)
  )[0];

  appContextStore.userConfiguration.idCurrency = selectedCurrency;
};

/**
 * Manejador del evento del selector de idioma.
 */
const handleLanguageSelection = (e) => {
  const selectedLanguage = e.target.id.split("-").slice(-1)[0];

  switch (selectedLanguage) {
    case "esES":
      appContextStore.userConfiguration.idLanguage = {
        id: 1,
        language: "ES",
      };
      break;

    case "enEN":
      appContextStore.userConfiguration.idLanguage = {
        id: 2,
        language: "EN",
      };
      break;

    default:
      appContextStore.userConfiguration.idLanguage = {
        id: 1,
        language: "ES",
      };
  }
};

/**
 * Actualiza la configuración del usuario.
 */
const handleUpdateUserPreferences = async () => {
    isExecution.value  =true;
  await updateUserConfiguration(
    authStore.userData.id,
    appContextStore.userConfiguration,
    (err) => console.log(err.data)
  );

   isExecution.value = false;
};

/**
 * Crea una configuración para el usuario en sesión.
 */
const handleCreateUserPreferences = async () => {
  await addUserConfigurationToUser(
    authStore.userData.id,
    appContextStore.userConfiguration
  );
};

onMounted(async () => {
  await appContextStore.loadAllAvailableCurrencies();
  await appContextStore.loadUserConfiguration();
  if (appContextStore.userConfiguration) {
    hasUserPreviuousConfig.value = true;
  }
});
</script>

<template>
  <div class="account-configuration-view">
    <h1>Configuración y preferencias</h1>
    <div class="account-configuration-view__wrapper">
      <section class="account-configuration__currency">
        <h2>Moneda</h2>
        <select
          name="currency-selector"
          @change="(e) => handleCurrencySelection(e)"
        >
          <option
            v-for="currency in appContextStore.appCurrencies"
            :key="currency.currencyCode"
            :value="currency.currencyCode"
            :selected="
              appContextStore?.userConfiguration
                ? appContextStore?.userConfiguration?.idCurrency
                    ?.currencyCode == currency.currencyCode
                : currency.currencyCode == 978
            "
          >
            {{ currency.currencyAlphanumericCode }} -
            {{ currency.currencyName }}
          </option>
        </select>
      </section>

      <section class="account-configuration__language">
        <h2>Idioma</h2>
        <fieldset>
          <div>
            <input
              type="radio"
              name="language-config"
              id="select-language-esES"
              :checked="`${
                appContextStore?.userConfiguration
                  ? appContextStore?.userConfiguration?.idLanguage?.language ==
                    'ES'
                  : true
              }`"
              @change="(e) => handleLanguageSelection(e)"
            />
            <label for="select-language-esES">Español (España)</label>
          </div>
          <div>
            <input
              type="radio"
              name="language-config"
              id="select-language-enEN"
              :checked="`${
                appContextStore?.userConfiguration
                  ? appContextStore?.userConfiguration?.idLanguage?.language ==
                    'EN'
                  : false
              }`"
              @change="(e) => handleLanguageSelection(e)"
            />
            <label for="select-language-enEN">Inglés (Reino Unido)</label>
          </div>
        </fieldset>
      </section>
      <BaseButton
        :text="`${
          hasUserPreviuousConfig == true ? isExecution == true ? 'Actualizando...' : 'Actualizar' : 'Establecer'
        }`"
        buttonStyle="baseButton-secondary--filled"
        :fullWidth="appContextStore.isMobile == true"
        @click="
          hasUserPreviuousConfig == true
            ? handleUpdateUserPreferences()
            : handleCreateUserPreferences()
        "
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

.account-configuration-view {
  @include flex-column;
  gap: 20px;

  & h2 {
    color: $color-primary;
    font-weight: 400;
  }

  & > .account-configuration-view__wrapper {
    @include flex-column;
    gap: 20px;

    & > section {
      @include flex-column;
      gap: 20px;
    }

    // Estilos sección moneda
    & > .account-configuration__currency {
    }

    // Estilos sección idioma
    & > .account-configuration__language {
      & > fieldset {
        @include flex-row;
        flex-wrap: wrap;
        gap: 20px;
        border: none;
        padding: 0;

        & > div {
          @include flex-row;
          gap: 10px;
          background-color: $color-tertiary-light;
          border-radius: $global-border-radius;
          padding: 15px 30px;
          transition: box-shadow 0.2s ease-in-out;

          &:hover {
            box-shadow: $global-box-shadow;
          }

          & > label,
          & > input {
            cursor: pointer;
          }
        }
      }
    }
  }
}

// ---------------------------------------------------------------
// -- Responsive design
// ---------------------------------------------------------------
@media (max-width: $breakpoint-sm) {
  .account-configuration-view {
    & > h1 {
      font-weight: 400;
      text-align: center;
    }
    & > .account-configuration-view__wrapper {
      gap: 50px;
    }
  }
}
</style>