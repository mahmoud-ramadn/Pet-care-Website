import { useAtomValue } from "jotai"
import { debounce } from "lodash-es"
import { EarthIcon, Heart, Menu, Moon, ShoppingBagIcon, SparklesIcon, Sun } from "lucide-react"

import { Suspense, useCallback, useEffect, useState } from "react"
import { lazy } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import { HeaderLinks } from "@/Constants/main"
import { tokenAtom } from "@/atoms"
import { useTheme } from "@/components/global-provider/theme-provider"
import i18n from "@/i18n"

import Loader from "../ui/loader"
import UserInfo from "./user-info"

const MobileMenu = lazy(() => import("./MobileMenu"))

export default function Header() {
  const token = useAtomValue(tokenAtom)
  const { t } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)
  const { theme, toggleTheme } = useTheme()

  // Debounce scroll handler for better performance
  const handleScroll = useCallback(() => {
    if (isMobile) setScrolled(window.scrollY > 10)
  }, [isMobile])

  useEffect(() => {
    const debouncedScroll = debounce(handleScroll, 50)
    window.addEventListener("scroll", debouncedScroll)

    const handleResize = debounce(() => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false)
      }
    }, 100)

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", debouncedScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [handleScroll])

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar"
    i18n.changeLanguage(newLang)
    if (mobileMenuOpen) setMobileMenuOpen(false)
  }

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-xl shadow-xl shadow-blue-500/10 border-b border-border"
            : "bg-background/80 backdrop-blur-sm"
        }`}
      >
        {/* Promo Banner */}
        <div className="bg-gradient-to-r from-primary via-secondary to-primary text-foreground text-center py-2 text-sm font-medium">
          <div className="container mx-auto px-4 flex items-center justify-center space-x-2 overflow-hidden">
            <SparklesIcon className="w-4 h-4 animate-pulse flex-shrink-0" />
            <span className="truncate">{t("header.promo")}</span>
            <SparklesIcon className="w-4 h-4 animate-pulse flex-shrink-0" />
          </div>
        </div>

        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Desktop Navigation */}
            <div className="flex items-center lg:gap-x-12 md:gap-x-8">
              <Link to="/" className="group relative shrink-0" aria-label="Home">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-2 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300 group-hover:scale-105">
                  <img
                    className="h-10 w-10 md:h-12 md:w-12 object-contain drop-shadow-sm"
                    src="/logo.webp"
                    alt={t("header.logoAlt")}
                    loading="lazy"
                  />
                </div>
              </Link>

              <nav className="hidden lg:block">
                <ul className="flex items-center space-x-6 xl:space-x-8">
                  {HeaderLinks.map((item) => (
                    <li key={item.labelKey}>
                      <Link
                        className="group relative py-2 px-1 font-medium text-foreground hover:text-blue-600 transition-all duration-200"
                        to={item.href}
                      >
                        <span className="relative z-10">{t(item.labelKey)}</span>
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* User Actions */}
            <div className="flex items-center  z-10 relative ">
              <div className="flex items-center md:space-x-2 sm:space-x-4">
                {token ? (
                  <>
                    <Link to="/shop/fav" className="hidden sm:block">
                      <Heart className="w-5 h-5 mr-3  dark:text-white" />
                    </Link>

                    <Link to="/shop/cart" className="hidden sm:block">
                      <ShoppingBagIcon className="w-5 h-5 mr-3 dark:text-white" />
                    </Link>
                    <UserInfo />
                  </>
                ) : (
                  <>
                    <Link
                      to="/Signup"
                      className="hidden sm:block px-4 py-1.5 sm:px-5 sm:py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 active:scale-95 text-sm sm:text-base"
                    >
                      {t("SignupPageLink")}
                    </Link>

                    <Link
                      to="/login"
                      className="hidden sm:block px-4 py-1.5 sm:px-5 sm:py-2 border-2 border-blue-600 text-blue-600 font-medium rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200 hover:scale-105 active:scale-95 text-sm sm:text-base"
                    >
                      {t("LoginPageLink")}
                    </Link>
                  </>
                )}

                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="group relative p-2 text-foreground hover:text-primary transition-all duration-200"
                  aria-label={t("toggleLanguage")}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <EarthIcon className="w-5 h-5 relative z-5 group-hover:rotate-12" />
                </button>

                <button
                  type="button"
                  onClick={toggleTheme}
                  className="group relative p-2 text-foreground hover:text-primary transition-all duration-200"
                  aria-label={t("toggleTheme")}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-blue-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5 relative z-5 group-hover:rotate-12" />
                  ) : (
                    <Moon className="w-5 h-5 relative z-5 group-hover:rotate-12" />
                  )}
                </button>
              </div>

              <button
                className="lg:hidden p-2 text-foreground hover:text-primary transition-colors duration-200 focus:outline-none"
                onClick={() => setMobileMenuOpen(true)}
                aria-label={t("openMenu")}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrolling Indicator */}
        <div
          className={`h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"}`}
        ></div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMobileMenu}
      />

      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full">
            <Loader />
          </div>
        }
      >
        <MobileMenu
          mobileMenuOpen={mobileMenuOpen}
          closeMobileMenu={closeMobileMenu}
          toggleLanguage={toggleLanguage}
          toggleTheme={toggleTheme}
          theme={theme}
          token={token}
          t={t}
        />
      </Suspense>
    </>
  )
}
