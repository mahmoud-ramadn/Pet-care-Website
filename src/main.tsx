import "leaflet/dist/leaflet.css"
import "nprogress/nprogress.css"

import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router"

import "@/assets/css/index.css"
import { ThemeProvider } from "@/components/global-provider/theme-provider"
import i18n from "@/i18n"
import { router } from "@/routes"

function applyDirection(lang: string) {
  const isRtl = lang === "ar"
  const root = document.documentElement
  root.setAttribute("lang", lang)
  root.setAttribute("dir", isRtl ? "rtl" : "ltr")
}

applyDirection(i18n.language)
i18n.on("languageChanged", (lng) => applyDirection(lng))

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
)
