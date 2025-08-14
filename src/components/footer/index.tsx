import { ArrowUpIcon, FacebookIcon, HeartIcon, InstagramIcon, XIcon } from "lucide-react"

import { useTranslation } from "react-i18next"

import { contactLinks } from "@/Constants/main"

import { Input } from "../ui/input"

export default function Footer() {
  const { t } = useTranslation()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Top wave decoration */}
      <div className="absolute top-0 left-0 w-full transform rotate-180">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V120Z"
            fill="url(#topWaveGradient)"
          />
          <defs>
            <linearGradient id="topWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="50%" stopColor="#1E40AF" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 pt-32 pb-8">
        {/* Main footer content */}
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            {/* Newsletter Section */}
            <div className="lg:col-span-1 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                    <HeartIcon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-bold text-white text-2xl">{t("footer.getInTouch")}</h3>
                </div>
                <p className="text-blue-100 leading-relaxed font-light">
                  Stay updated with our latest news, special offers, and pet care tips delivered right to your inbox.
                </p>
              </div>

              <div className="space-y-4">
                <div className="relative group">
                  <Input
                    type="email"
                    className="w-full bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder:text-blue-200 focus:border-yellow-400 focus:bg-white/20 transition-all duration-300 rounded-xl px-6 py-6 pr-12"
                    placeholder={t("footer.emailPlaceholder")}
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg px-4 py-2 font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 hover:scale-105">
                    Subscribe
                  </button>
                </div>

                <div className="flex items-center space-x-4 pt-2">
                  <span className="text-blue-100 text-sm font-medium">Follow us:</span>
                  <div className="flex space-x-3">
                    <a
                      href="#"
                      className="group relative w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110"
                    >
                      <FacebookIcon className="w-5 h-5 text-blue-200 group-hover:text-white transition-colors duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </a>
                    <a
                      href="#"
                      className="group relative w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110"
                    >
                      <XIcon className="w-5 h-5 text-blue-200 group-hover:text-white transition-colors duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-500/20 to-gray-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </a>
                    <a
                      href="#"
                      className="group relative w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110"
                    >
                      <InstagramIcon className="w-5 h-5 text-blue-200 group-hover:text-white transition-colors duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">📞</span>
                  </div>
                  <h3 className="font-bold text-white text-2xl">{t("contacts")}</h3>
                </div>
              </div>

              <div className="space-y-3">
                {contactLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target={link.external ? "_blank" : "_self"}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="group flex items-center py-3 px-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:from-blue-400/40 group-hover:to-purple-500/40 transition-all duration-300">
                      {link.icon()}
                    </div>
                    <span className="text-blue-100 group-hover:text-white transition-colors duration-300 font-medium">
                      {link.text}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">📋</span>
                  </div>
                  <h3 className="font-bold text-white text-2xl">{t("footer.terms")}</h3>
                </div>
              </div>

              <div className="space-y-3">
                {(t("footer.termsList", { returnObjects: true }) as string[]).map((item, index) => (
                  <a
                    key={index}
                    href="/"
                    className="group block py-3 px-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                  >
                    <span className="text-blue-100 group-hover:text-white transition-colors duration-300 font-medium">
                      {item}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-8">
            <button
              onClick={scrollToTop}
              className="group relative w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-yellow-400/25"
            >
              <ArrowUpIcon className="w-6 h-6 text-white group-hover:animate-bounce" />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        <div className="border-t border-white/20 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <p className="text-blue-100 font-medium text-center md:text-left">{t("footer.rights")}</p>

              <div className="flex items-center space-x-2 text-blue-100">
                <span>Made by</span>
                <HeartIcon className="w-4 h-4 text-red-400 animate-pulse" />
                <span>Mahmoud Ramadan </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </footer>
  )
}
