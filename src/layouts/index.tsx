import { NuqsAdapter } from "nuqs/adapters/react"

import { Suspense, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Outlet } from "react-router"

import GlobalFallback from "@/components/ui/global-fallback"

export default function Layout() {
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.lang = i18n.language
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr"
  }, [i18n.language])
  return (
    <main>
      <NuqsAdapter>
        <Suspense fallback={<GlobalFallback />}>
          <Outlet />
        </Suspense>
      </NuqsAdapter>
    </main>
  )
}
