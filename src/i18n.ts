import { createI18n } from 'vue-i18n';

import { en_msgs } from './locales/en';
import { es_msgs } from './locales/es';

const messages = {
  es: es_msgs,
  en: en_msgs,
};

export default createI18n({
  locale: sessionStorage.getItem('lang') || import.meta.env.VITE_APP_I18N_LOCALE || 'es',
  fallbackLocale: import.meta.env.VITE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages,
});
