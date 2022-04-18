import VueI18n from 'vue-i18n';

const i18n = VueI18n.createI18n({
    legacy: false, // you must set `false`, to use Composition API
    locale: 'es', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages, // set locale messages
    // If you need to specify other options, you can set other options
    // ...
  })