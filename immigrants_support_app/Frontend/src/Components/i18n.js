import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: require('../locales/registeration_en.json')
      },
      es: {
        translation: require('../locales/registeration_es.json')
      },
      hi: {
        translation: require('../locales/registeration_hi.json') // Hindi
      },
      ar: {
        translation: require('../locales/registeration_ar.json') // Arabic
      },
      zh: {
        translation: require('../locales/registeration_zh.json') // Chinese
      },
      vi: {
        translation: require('../locales/registeration_vi.json') // Vietnamese
      },
      ne: {
        translation: require('../locales/registeration_ne.json') // Nepali
      },
      bn: {
        translation: require('../locales/registeration_bn.json') // Bengali
      }
    },
    lng: 'ne', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  }, (err, t) => {
    if (err) return console.error(err);
    console.log('i18n initialized with:', i18n.languages); // Check available languages
  });

export default i18n;
