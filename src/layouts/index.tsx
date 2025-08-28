import { NuqsAdapter } from "nuqs/adapters/react"
import { Toaster } from "sonner"

import { Suspense, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Outlet } from "react-router"

import ErrorBoundary from "@/components/ui/ErrorBoundary"
import LayoutWrapper from "@/components/ui/LayoutWrapper"
import GlobalFallback from "@/components/ui/global-fallback"

import { TanstackProvider } from "@/components/global-provider/tanstack-provider"
import { useAuthLoad } from "@/hooks/auth"

export default function Layout() {
  const { i18n } = useTranslation()
  useAuthLoad()
  useEffect(() => {
    const dir = i18n.language === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = i18n.language
    document.documentElement.dir = dir
  }, [i18n.language])

  return (
    <main>
      <NuqsAdapter>
        <TanstackProvider>
          <ErrorBoundary>
            <LayoutWrapper>
              <Suspense fallback={<GlobalFallback />}>
                <Outlet />
              </Suspense>
            </LayoutWrapper>
          </ErrorBoundary>
          <Toaster />
        </TanstackProvider>
      </NuqsAdapter>
    </main>
  )
}
