import { EarthIcon, Heart, Moon, ShoppingBagIcon, Sun, X } from "lucide-react"

import { Link } from "react-router-dom"

import { HeaderLinks } from "@/Constants/main"

interface MobileMenuProps {
  mobileMenuOpen: boolean
  closeMobileMenu: () => void
  toggleLanguage: () => void
  toggleTheme: () => void
  theme: string
  token: string | null
  t: (key: string) => string
}

export default function MobileMenu({
  mobileMenuOpen,
  closeMobileMenu,
  toggleLanguage,
  toggleTheme,
  theme,
  token,
  t,
}: MobileMenuProps) {
  return (
    <div
      className={`lg:hidden fixed top-0 right-0 h-full w-80 max-w-full bg-background/95 backdrop-blur-xl shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <img className="h-8 w-8" src="/logo.webp" alt="logo" loading="lazy" />
          <span className="font-bold text-foreground">{t("menu")}</span>
        </div>
        <button
          onClick={closeMobileMenu}
          className="p-2 text-foreground/70 hover:text-red-500 transition-colors duration-200 focus:outline-none group"
          aria-label={t("closeMenu")}
        >
          <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
        </button>
      </div>

      {/* Body */}
      <div className="px-4 sm:px-6 py-4 h-[calc(100%-64px)] overflow-y-auto">
        {/* Links */}
        <nav className="mb-6">
          <ul className="space-y-1">
            {HeaderLinks.map((item) => (
              <li key={item.labelKey}>
                <Link
                  className="group flex items-center py-3 px-4 bg-gradient-to-r from-accent to-primary hover:from-accent/20 hover:to-primary/20 rounded-lg transition-all duration-200 active:scale-95"
                  to={item.href}
                  onClick={closeMobileMenu}
                >
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                    {t(item.labelKey)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Language */}
        <div className="mb-6">
          <button
            type="button"
            onClick={toggleLanguage}
            className="group flex items-center w-full py-3 px-4 bg-gradient-to-r from-accent/20 to-primary/20 hover:from-accent/30 hover:to-primary/30 rounded-lg transition-all duration-200 active:scale-95"
          >
            <EarthIcon className="w-5 h-5 mr-3 text-primary group-hover:rotate-12" />
            <span className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
              {t("toggleLanguage")}
            </span>
          </button>
        </div>

        {/* Theme */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => {
              toggleTheme()
              if (mobileMenuOpen) closeMobileMenu()
            }}
            className="group flex items-center w-full py-3 px-4 bg-gradient-to-r from-accent/20 to-primary/20 hover:from-accent/30 hover:to-primary/30 rounded-lg transition-all duration-200 active:scale-95"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 mr-3 text-primary group-hover:rotate-12" />
            ) : (
              <Moon className="w-5 h-5 mr-3 text-primary group-hover:rotate-12" />
            )}
            <span className="font-medium  text-foreground group-hover:text-primary transition-colors duration-200">
              {t("toggleTheme")}
            </span>
          </button>
        </div>

        {/* Auth */}
        {!token && (
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <Link
              className="block py-3 px-6 bg-gradient-to-r from-primary to-secondary text-foreground rounded-xl text-center font-medium hover:from-primary hover:to-secondary transition-all duration-200 active:scale-95"
              to="/Signup"
              onClick={closeMobileMenu}
            >
              {t("SignupPageLink")}
            </Link>
            <Link
              className="block py-3 px-6 border-2 border-primary text-primary rounded-xl text-center font-medium hover:bg-primary/20 transition-all duration-200 active:scale-95"
              to="/login"
              onClick={closeMobileMenu}
            >
              {t("LoginPageLink")}
            </Link>
          </div>
        )}

        {/* Logged in */}
        {token && (
          <div className="space-y-1 pt-4 border-t border-gray-100">
            <Link
              to="/shop/fav"
              className="group flex items-center py-3 px-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-100 hover:to-pink-100 rounded-lg transition-all duration-200 active:scale-95"
              onClick={closeMobileMenu}
            >
              <Heart className="w-5 h-5 mr-3 text-white" />
              <span className="font-medium text-foreground group-hover:text-red-600">{t("favoriteProducts")}</span>
            </Link>

            <Link
              to="/shop/cart"
              className="group flex items-center py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-100 hover:to-purple-100 rounded-lg transition-all duration-200 active:scale-95"
              onClick={closeMobileMenu}
            >
              <ShoppingBagIcon className="w-5 h-5 mr-3 text-white" />
              <span className="font-medium text-foreground group-hover:text-blue-600">{t("shoppingCart")}</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
