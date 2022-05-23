<script setup>
import { onMounted } from "vue";

// Servicio
import { getUserConfigurationByUserId } from "@/services/user/userService";

// Iconos
import { ICON_LANGUAGE } from "@/helpers/iconConstants";

// Store
import { useAppContextStore } from "@/store/appContext";
import { useAuthStore } from "@/store/auth";

const appContextStore = useAppContextStore();
const authStore = useAuthStore();

/**
 * Establece el idioma por defecto de la aplicación.
 */
const handleLanguageChange = (lang, callback) => {
  const spanishSelector = document.getElementById("language_switch__spanish");
  const englishSelector = document.getElementById("language_switch__english");
  const activeLanguageClass = "--selectedLanguage";

  spanishSelector.classList.remove(activeLanguageClass);
  englishSelector.classList.remove(activeLanguageClass);

  switch (lang) {
    case "ES":
      sessionStorage.lang = "es";
      spanishSelector.classList.add(activeLanguageClass);
      break;

    case "EN":
      sessionStorage.lang = "en";
      englishSelector.classList.add(activeLanguageClass);
      break;

    default:
      sessionStorage.lang = "en";
      spanishSelector.classList.add(activeLanguageClass);
      break;
  }

  callback();
};

onMounted(async () => {
  if(authStore?.userData?.id){
    const userConfig = await getUserConfigurationByUserId(
      authStore?.userData?.id
    );
  
    sessionStorage.lang = userConfig?.idLanguage?.language.toLowerCase();
  }else{
    sessionStorage.lang = navigator.language.toLowerCase();
  }
});
</script>

<template>
  <div class="language-switch">
    <div class="language_switch__langs">
      <span
        id="language_switch__spanish"
        :class="`${
          this.$i18n.locale === 'es' ||
          appContextStore.selectedLanguage === 'es' ||
          sessionStorage?.getItem('lang') === 'es'
            ? '--selectedLanguage'
            : ''
        }`"
        @click.prevent="
          handleLanguageChange('ES', () => {
            this.$i18n.locale = 'es';
            appContextStore.selectedLanguage = 'es';
          })
        "
        >ES</span
      >
      <span
        id="language_switch__english"
        :class="`${
          this.$i18n.locale === 'en' ||
          appContextStore.selectedLanguage === 'en' ||
          sessionStorage?.getItem('lang') === 'en'
            ? '--selectedLanguage'
            : ''
        }`"
        @click.prevent="
          handleLanguageChange('EN', () => {
            this.$i18n.locale = 'en';
            appContextStore.selectedLanguage = 'en';
          })
        "
        >EN</span
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

.language-switch {
  cursor: pointer;
  @include flex-row;
  gap: 10px;

  & > img {
    width: 30px;
  }

  & > .language_switch__langs {
    @include flex-row;
    gap: 10px;
    background-color: $color-tertiary-light;
    padding: 0 20px;
    border-radius: $global-border-radius;

    & > span {
      @include flex-row-center;
      align-items: center;
      align-self: center;
      font-size: 0.9rem;
      font-weight: 600;
      color: $color_dark;
      background-color: $color_tertiary_dark;
      height: 35px;
      width: 35px;
      border-radius: 50px;
    }

    & > span.--selectedLanguage {
      background-color: $color-primary;
      color: #fff;
    }
  }
}
</style>