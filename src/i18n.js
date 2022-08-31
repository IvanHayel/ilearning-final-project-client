import i18n               from 'i18next';
import Backend            from 'i18next-http-backend';
import {initReactI18next} from 'react-i18next';
import {LANGUAGE}         from "./Constants";

i18n.use(Backend).use(initReactI18next).init({
  fallbackLng: LANGUAGE.ENGLISH,
  debug: false,
  interpolation: {
    escapeValue: false,
  },
}).catch(error => console.error(error));
