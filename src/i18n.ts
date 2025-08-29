import i18n from "i18next"

import { initReactI18next } from "react-i18next"

import ar from "./locales/ar.json"
import en from "./locales/en.json"

const getInitialLanguage = (): string => {
  if (typeof window !== "undefined") {
    const saved = window.localStorage.getItem("lng")
    if (saved) return saved
    const browser = window.navigator.language || "en"
    return browser.toLowerCase().startsWith("ar") ? "ar" : "en"
  }
  return "en"
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: getInitialLanguage(),
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
})

if (typeof window !== "undefined") {
  i18n.on("languageChanged", (lng) => {
    try {
      window.localStorage.setItem("lng", lng)
    } catch {
      console.log("tee")
    }
  })
}

export default i18n
