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
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Top wave divider */}
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

      {/* Main content */}
      <div className="relative z-10 pt-20 pb-8 md:pt-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Newsletter section */}
            <div className="md:col-span-2 lg:col-span-1 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                    <HeartIcon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-bold text-white text-xl md:text-2xl">{t("footer.getInTouch")}</h3>
                </div>
                <p className="text-blue-100 leading-relaxed font-light text-sm md:text-base">
                  {t("footer.newsletterBlurb")}
                </p>
              </div>

              <div className="space-y-4">
                <div className="relative group">
                  <Input
                    type="email"
                    className="w-full bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder:text-blue-200 focus:border-yellow-400 focus:bg-white/20 transition-all duration-300 rounded-xl px-4 py-4 md:px-6 md:py-6 pr-28"
                    placeholder={t("footer.emailPlaceholder")}
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg px-3 py-1 md:px-4 md:py-2 text-sm md:text-base font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 hover:scale-105">
                    {t("footer.subscribe")}
                  </button>
                </div>

                <div className="flex items-center space-x-4 pt-2">
                  <span className="text-blue-100 text-sm font-medium">{t("footer.followUs")}</span>
                  <div className="flex space-x-2 md:space-x-3">
                    <SocialIcon
                      href="#"
                      icon={<FacebookIcon className="w-4 h-4 md:w-5 md:h-5" />}
                      color="from-blue-500/20 to-blue-600/20"
                    />
                    <SocialIcon
                      href="#"
                      icon={<XIcon className="w-4 h-4 md:w-5 md:h-5" />}
                      color="from-gray-500/20 to-gray-600/20"
                    />
                    <SocialIcon
                      href="#"
                      icon={<InstagramIcon className="w-4 h-4 md:w-5 md:h-5" />}
                      color="from-pink-500/20 to-purple-600/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact section */}
            <div className="space-y-6">
              <SectionHeader icon="📞" title={t("contacts")} gradient="from-blue-400 to-purple-500" />
              <div className="space-y-2 md:space-y-3">
                {contactLinks.map((link, index) => (
                  <ContactLink key={index} link={link} />
                ))}
              </div>
            </div>

            {/* Terms section */}
            <div className="space-y-6">
              <SectionHeader icon="📋" title={t("footer.terms")} gradient="from-purple-400 to-pink-500" />
              <div className="space-y-2 md:space-y-3">
                {(t("footer.termsList", { returnObjects: true }) as string[]).map((item, index) => (
                  <SimpleLink key={index} text={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Back to top button */}
          <div className="flex justify-center mb-6 md:mb-8">
            <button
              onClick={scrollToTop}
              className="group relative w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-yellow-400/20"
              aria-label="Scroll to top"
            >
              <ArrowUpIcon className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:animate-bounce" />
            </button>
          </div>
        </div>

        {/* Copyright section */}
        <div className="border-t border-white/20 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 md:py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 text-sm md:text-base">
              <p className="text-blue-100 font-medium text-center md:text-left">{t("footer.rights")}</p>
              <div className="flex items-center space-x-2 text-blue-100">
                <span>Made by</span>
                <HeartIcon className="w-4 h-4 text-red-400 animate-pulse" />
                <span>Mahmoud Ramadan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

const SocialIcon = ({ href, icon, color }: { href: string; icon: React.ReactNode; color: string }) => (
  <a
    href={href}
    className="group relative w-8 h-8 md:w-10 md:h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110"
  >
    <div className="text-blue-200 group-hover:text-white transition-colors duration-300">{icon}</div>
    <div
      className={`absolute inset-0 bg-gradient-to-br ${color} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
    ></div>
  </a>
)

const SectionHeader = ({ icon, title, gradient }: { icon: string; title: string; gradient: string }) => (
  <div className="flex items-center space-x-3">
    <div className={`w-8 h-8 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center`}>
      <span className="text-white font-bold text-sm">{icon}</span>
    </div>
    <h3 className="font-bold text-white text-xl md:text-2xl">{title}</h3>
  </div>
)

const ContactLink = ({ link }: { link: (typeof contactLinks)[0] }) => (
  <a
    href={link.href}
    target={link.external ? "_blank" : "_self"}
    rel={link.external ? "noopener noreferrer" : undefined}
    className="group flex items-center py-2 px-3 md:py-3 md:px-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5"
  >
    <div className="w-8 h-8 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-lg flex items-center justify-center mr-3 md:mr-4 group-hover:from-blue-400/40 group-hover:to-purple-500/40 transition-all duration-300">
      {link.icon()}
    </div>
    <span className="text-blue-100 group-hover:text-white transition-colors duration-300 font-medium text-sm md:text-base">
      {link.text}
    </span>
  </a>
)

const SimpleLink = ({ text }: { text: string }) => (
  <a
    href="/"
    className="group block py-2 px-3 md:py-3 md:px-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5"
  >
    <span className="text-blue-100 group-hover:text-white transition-colors duration-300 font-medium text-sm md:text-base">
      {text}
    </span>
  </a>
)
