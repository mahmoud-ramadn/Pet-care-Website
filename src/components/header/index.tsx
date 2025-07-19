import { EarthIcon, Menu, X } from "lucide-react"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import { HeaderLinks } from "@/Constants/main"
import i18n from "@/i18n"

export default function Header() {
  const { t } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  // useEffect(() => {
  //   const storedLange= localStorage.getItem('lang')
  //     if (storedLange && storedLange !== i18n.language) {
  //   i18n.changeLanguage(storedLange)
  // }

  // },[])

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
    // localStorage.setItem("lang", newLang)
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full py-3 bg-white transition-all duration-300 ${scrolled ? "shadow-md" : ""}`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-x-8 lg:gap-x-32">
          <Link to="/">
            <img className="h-12 w-12 md:h-16 md:w-16" src="/logo.webp" alt="logo" />
          </Link>
          <ul className="space-x-5 md:flex items-center hidden">
            {HeaderLinks.map((item) => (
              <Link
                key={item.labelKey}
                className=" transition-all duration-200 font-medium text-gray-800 hover:text-primary"
                to={item.href}
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </ul>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/Signup" className="hover:text-primary transition-colors duration-200 font-medium text-gray-800">
              {t("SignupPageLink")}
            </Link>
            <Link to="/login" className="hover:text-primary transition-colors duration-200 font-medium text-gray-800">
              {t("LoginPageLink")}
            </Link>
            <button
              type="button"
              onClick={toggleLanguage}
              className="cursor-pointer text-gray-800 hover:text-primary transition-colors duration-200"
              aria-label={t("toggleLanguage")}
            >
              <EarthIcon className="w-5 h-5" />
            </button>
          </div>

          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={() => setMobileMenuOpen(true)}
            aria-label={t("openMenu")}
          >
            <Menu className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`md:hidden fixed inset-0 bg-black/35 z-40 transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Sidebar Mobile Menu */}
        <div
          className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-4 flex justify-end">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-500 hover:text-primary focus:outline-none"
              aria-label={t("closeMenu")}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-6 py-4">
            <ul className="flex flex-col space-y-4">
              {HeaderLinks.map((item) => (
                <li key={item.labelKey}>
                  <Link
                    className="block py-2 hover:text-primary transition-colors duration-200 text-gray-800 font-medium"
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="flex items-center py-2 hover:text-primary transition-colors duration-200 text-gray-800 font-medium"
                >
                  <EarthIcon className="w-5 h-5 mx-2 " /> {t("toggleLanguage")}
                </button>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <Link
                className="block py-3 px-4 bg-primary text-white rounded-lg text-center mb-3 hover:bg-primary-dark transition-colors duration-200 font-medium"
                to="/Signup"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("SignupPageLink")}
              </Link>
              <Link
                className="block py-3 px-4 border border-primary text-primary rounded-lg text-center hover:bg-gray-50 transition-colors duration-200 font-medium"
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("LoginPageLink")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
