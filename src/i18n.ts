import i18n from "i18next"

import { initReactI18next } from "react-i18next"

import ar from "./locales/ar.json"
import en from "./locales/en.json"

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: "en", // اللغة الافتراضية
  fallbackLng: "ar", 

  interpolation: {
    escapeValue: false, // React بيعمل escape تلقائي
  },
})

export default i18n
