import { useAtomValue } from "jotai"
import { debounce } from "lodash-es"
import { EarthIcon, Heart, Menu, ShoppingBagIcon, SparklesIcon, X } from "lucide-react"

import { useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import { HeaderLinks } from "@/Constants/main"
import { tokenAtom } from "@/atoms"
import i18n from "@/i18n"

import UserInfo from "./user-info"

export default function Header() {
  const token = useAtomValue(tokenAtom)
  const { t } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)

  // Debounce scroll handler for better performance
  const handleScroll = useCallback(() => {
    if (isMobile) setScrolled(window.scrollY > 10)
  }, [])

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
            ? "bg-white/95 backdrop-blur-xl shadow-xl shadow-blue-500/10 border-b border-blue-100/20"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        {/* Promo Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white text-center py-2 text-sm font-medium">
          <div className="container mx-auto px-4 flex items-center justify-center space-x-2 overflow-hidden">
            <SparklesIcon className="w-4 h-4 animate-pulse flex-shrink-0" />
            <span className="truncate">🎉 Special Offer: 20% off all grooming services this week!</span>
            <SparklesIcon className="w-4 h-4 animate-pulse flex-shrink-0" />
          </div>
        </div>

        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Desktop Navigation */}
            <div className="flex items-center lg:gap-x-12 md:gap-x-8">
              <Link to="/" className="group relative shrink-0" aria-label="Home">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-2 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-300 group-hover:scale-105">
                  <img
                    className="h-10 w-10 md:h-12 md:w-12 object-contain drop-shadow-sm"
                    src="/logo.webp"
                    alt="Pet Care Logo"
                    loading="lazy"
                  />
                </div>
              </Link>

              <nav className="hidden lg:block">
                <ul className="flex items-center space-x-6 xl:space-x-8">
                  {HeaderLinks.map((item) => (
                    <li key={item.labelKey}>
                      <Link
                        className="group relative py-2 px-1 font-medium text-gray-700 hover:text-blue-600 transition-all duration-200"
                        to={item.href}
                      >
                        <span className="relative z-10">{t(item.labelKey)}</span>
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
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
                    <Link
                      to="/shop/fav"
                      className="group flex items-center justify-center relative p-2 text-gray-600 hover:text-red-500 transition-all duration-200"
                      aria-label={t("favoriteProducts")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                      <Heart className="w-5 h-5 relative z-10 group-hover:scale-110" />
                    </Link>

                    <Link
                      to="/shop/cart"
                      className="group relative p-2 flex items-center justify-center  text-gray-600 hover:text-blue-600 transition-all duration-200"
                      aria-label={t("shoppingCart")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                      <ShoppingBagIcon className="w-5 h-5 relative z-10 group-hover:scale-110" />
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
                  className="group relative p-2 text-gray-600 hover:text-green-600 transition-all duration-200"
                  aria-label={t("toggleLanguage")}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <EarthIcon className="w-5 h-5 relative z-5 group-hover:rotate-12" />
                </button>
              </div>

              <button
                className="lg:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 focus:outline-none"
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

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-80 max-w-full bg-white/95 backdrop-blur-xl shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <img className="h-8 w-8" src="/logo.webp" alt="logo" loading="lazy" />
            <span className="font-bold text-gray-800">{t("menu")}</span>
          </div>
          <button
            onClick={closeMobileMenu}
            className="p-2 text-gray-500 hover:text-red-500 transition-colors duration-200 focus:outline-none group"
            aria-label={t("closeMenu")}
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>

        <div className="px-4 sm:px-6 py-4 h-[calc(100%-64px)] overflow-y-auto">
          {/* Navigation Links */}
          <nav className="mb-6">
            <ul className="space-y-1">
              {HeaderLinks.map((item) => (
                <li key={item.labelKey}>
                  <Link
                    className="group flex items-center py-3 px-4 bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all duration-200 active:scale-95"
                    to={item.href}
                    onClick={closeMobileMenu}
                  >
                    <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200">
                      {t(item.labelKey)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Language Toggle */}
          <div className="mb-6">
            <button
              type="button"
              onClick={toggleLanguage}
              className="group flex items-center w-full py-3 px-4 bg-gradient-to-r from-green-50 to-blue-50 hover:from-green-100 hover:to-blue-100 rounded-lg transition-all duration-200 active:scale-95"
            >
              <EarthIcon className="w-5 h-5 mr-3 text-green-600 group-hover:rotate-12" />
              <span className="font-medium text-gray-700 group-hover:text-green-600 transition-colors duration-200">
                {t("toggleLanguage")}
              </span>
            </button>
          </div>

          {/* Auth Buttons for Mobile */}
          {!token && (
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <Link
                className="block py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-center font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 active:scale-95"
                to="/Signup"
                onClick={closeMobileMenu}
              >
                {t("SignupPageLink")}
              </Link>
              <Link
                className="block py-3 px-6 border-2 border-blue-600 text-blue-600 rounded-xl text-center font-medium hover:bg-blue-600 hover:text-white transition-all duration-200 active:scale-95"
                to="/login"
                onClick={closeMobileMenu}
              >
                {t("LoginPageLink")}
              </Link>
            </div>
          )}

          {/* User actions for mobile when logged in */}
          {token && (
            <div className="space-y-1 pt-4 border-t border-gray-100">
              <Link
                to="/shop/fav"
                className="group flex items-center py-3 px-4 bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 rounded-lg transition-all duration-200 active:scale-95"
                onClick={closeMobileMenu}
              >
                <Heart className="w-5 h-5 mr-3 text-red-500" />
                <span className="font-medium text-gray-700 group-hover:text-red-600">{t("favoriteProducts")}</span>
              </Link>

              <Link
                to="/shop/cart"
                className="group flex items-center py-3 px-4 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-lg transition-all duration-200 active:scale-95"
                onClick={closeMobileMenu}
              >
                <ShoppingBagIcon className="w-5 h-5 mr-3 text-blue-500" />
                <span className="font-medium text-gray-700 group-hover:text-blue-600">{t("shoppingCart")}</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
