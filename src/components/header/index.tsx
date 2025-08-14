import { useAtomValue } from "jotai"
import { EarthIcon, Heart, Menu, ShoppingBagIcon, SparklesIcon, X } from "lucide-react"

import { useEffect, useState } from "react"
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar"
    i18n.changeLanguage(newLang)
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-xl shadow-blue-500/10 border-b border-blue-100/20"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white text-center py-2 text-sm font-medium">
          <div className="flex items-center justify-center space-x-2">
            <SparklesIcon className="w-4 h-4 animate-pulse" />
            <span>🎉 Special Offer: 20% off all grooming services this week!</span>
            <SparklesIcon className="w-4 h-4 animate-pulse" />
          </div>
        </div>

        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Navigation */}
            <div className="flex items-center lg:gap-x-12 md:gap-x-8">
              {/* Logo with enhanced styling */}
              <Link to="/" className="group relative  shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-2 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-300 group-hover:scale-105">
                  <img
                    className="h-10 w-10 md:h-12 md:w-12 object-contain drop-shadow-sm"
                    src="/logo.webp"
                    alt="Pet Care Logo"
                  />
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="lg:block hidden">
                <ul className="flex items-center space-x-8">
                  {HeaderLinks.map((item, index) => (
                    <li key={item.labelKey} style={{ animationDelay: `${index * 0.1}s` }}>
                      <Link
                        className="group relative py-2 px-1 font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300"
                        to={item.href}
                      >
                        <span className="relative z-10">{t(item.labelKey)}</span>
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-6">
              {/* User Actions */}
              <div className="flex items-center space-x-4">
                {token ? (
                  <>
                    <Link
                      to="/shop/fav"
                      className="group relative p-2 text-gray-600 hover:text-red-500 transition-all duration-300"
                      aria-label={t("favoriteProducts")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Heart className="w-5 h-5 relative z-10 group-hover:animate-pulse" />
                    </Link>

                    <Link
                      to="/shop/cart"
                      className="group relative p-2 text-gray-600 hover:text-blue-600 transition-all duration-300"
                      aria-label={t("shoppingCart")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <ShoppingBagIcon className="w-5 h-5 relative z-10 group-hover:animate-bounce" />
                    </Link>

                    <UserInfo />
                  </>
                ) : (
                  <>
                    {/* Sign Up Button */}
                    <Link
                      to="/Signup"
                      className="hidden sm:block px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                    >
                      {t("SignupPageLink")}
                    </Link>

                    {/* Login Button */}
                    <Link
                      to="/login"
                      className="hidden sm:block px-6 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105"
                    >
                      {t("LoginPageLink")}
                    </Link>
                  </>
                )}

                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="group relative p-2 text-gray-600 hover:text-green-600 transition-all duration-300"
                  aria-label={t("toggleLanguage")}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <EarthIcon className="w-5 h-5 relative z-5 group-hover:animate-spin" />
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 focus:outline-none"
                onClick={() => setMobileMenuOpen(true)}
                aria-label={t("openMenu")}
              >
                <div className="relative">
                  <Menu className="w-6 h-6" />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom border gradient */}
        <div
          className={`h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`}
        ></div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Sidebar */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl z-50 transform transition-transform duration-500 ease-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile menu header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <img className="h-8 w-8" src="/logo.webp" alt="logo" />
            <span className="font-bold text-gray-800">Menu</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-gray-500 hover:text-red-500 transition-colors duration-300 focus:outline-none group"
            aria-label={t("closeMenu")}
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Mobile menu content */}
        <div className="px-6 py-4 h-full overflow-y-auto">
          {/* Navigation Links */}
          <nav className="mb-8">
            <ul className="space-y-2">
              {HeaderLinks.map((item, index) => (
                <li key={item.labelKey} style={{ animationDelay: `${index * 0.1}s` }}>
                  <Link
                    className="group flex items-center py-4 px-4 bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                      {t(item.labelKey)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Language Toggle */}
          <div className="mb-8">
            <button
              type="button"
              onClick={toggleLanguage}
              className="group flex items-center w-full py-4 px-4 bg-gradient-to-r from-green-50 to-blue-50 hover:from-green-100 hover:to-blue-100 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
            >
              <EarthIcon className="w-5 h-5 mr-3 text-green-600 group-hover:animate-spin" />
              <span className="font-semibold text-gray-700 group-hover:text-green-600 transition-colors duration-300">
                {t("toggleLanguage")}
              </span>
            </button>
          </div>

          {/* Auth Buttons for Mobile */}
          {!token && (
            <div className="space-y-4 pt-6 border-t border-gray-100">
              <Link
                className="block py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl text-center font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25"
                to="/Signup"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("SignupPageLink")}
              </Link>
              <Link
                className="block py-4 px-6 border-2 border-blue-600 text-blue-600 rounded-2xl text-center font-bold hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105"
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("LoginPageLink")}
              </Link>
            </div>
          )}

          {/* User actions for mobile when logged in */}
          {token && (
            <div className="space-y-4 pt-6 border-t border-gray-100">
              <Link
                to="/shop/fav"
                className="group flex items-center py-4 px-4 bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Heart className="w-5 h-5 mr-3 text-red-500" />
                <span className="font-semibold text-gray-700 group-hover:text-red-600">{t("favoriteProducts")}</span>
                <div className="ml-auto w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">2</span>
                </div>
              </Link>

              <Link
                to="/shop/cart"
                className="group flex items-center py-4 px-4 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingBagIcon className="w-5 h-5 mr-3 text-blue-500" />
                <span className="font-semibold text-gray-700 group-hover:text-blue-600">{t("shoppingCart")}</span>
                <div className="ml-auto w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">3</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
