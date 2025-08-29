import { Globe, Languages } from "lucide-react"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"

export default function LanguageToggle() {
  const { i18n } = useTranslation()
  const [currentLang, setCurrentLang] = useState(i18n.language)

  useEffect(() => {
    setCurrentLang(i18n.language)
  }, [i18n.language])

  const toggleLanguage = () => {
    const newLang = currentLang === "ar" ? "en" : "ar"
    i18n.changeLanguage(newLang)
    setCurrentLang(newLang)

    // Update document direction
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = newLang
  }

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      size="sm"
      className="group bg-background/80 backdrop-blur-xl border-2 border-border/50 hover:border-purple-500/50 hover:bg-purple-50/50 dark:hover:bg-purple-950/20 transition-all duration-300 rounded-2xl px-4 py-2 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
    >
      <div className="flex items-center gap-2">
        <div className="relative">
          <Globe className="w-4 h-4 text-purple-600 group-hover:rotate-180 transition-transform duration-500" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
        </div>
        <span className="text-sm font-bold text-foreground">{currentLang === "ar" ? "EN" : "عربي"}</span>
        <Languages className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
      </div>
    </Button>
  )
}
