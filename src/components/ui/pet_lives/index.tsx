import { useTranslation } from "react-i18next"

import imagePetLive from "@/assets/images/background/home-section.webp"

export default function PetLives() {
  const { t } = useTranslation()

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <div className="relative group order-2 lg:order-1">
            {/* Decorative background shapes */}
            <div className="absolute -top-6 -left-6 w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-3xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500"></div>

            {/* Main image container */}
            <div className="relative z-10 overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500">
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 z-10"></div>

              <img
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                src={imagePetLive}
                alt="Pet Lives - Happy pets and their owners"
              />

              {/* Floating badge */}
              <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-800">Premium Care</span>
                </div>
              </div>
            </div>

            {/* Floating elements around image */}
            <div className="absolute -top-4 right-10 w-8 h-8 bg-yellow-400 rounded-full animate-bounce opacity-80"></div>
            <div className="absolute -bottom-2 left-16 w-6 h-6 bg-blue-400 rounded-full animate-bounce delay-500 opacity-80"></div>
            <div className="absolute top-1/2 -right-4 w-4 h-4 bg-purple-400 rounded-full animate-bounce delay-1000 opacity-80"></div>
          </div>

          {/* Content Section */}
          <div className="space-y-8 order-1 lg:order-2">
            {/* Section badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-full">
              <span className="text-sm font-medium text-blue-600">About Our Mission</span>
            </div>

            {/* Main heading */}
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                  {t("petLives.title")}
                </span>
              </h2>

              {/* Decorative line */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                <div className="w-4 h-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full"></div>
              </div>
            </div>

            {/* Description paragraphs */}
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute -left-4 top-2 w-1 h-8 bg-gradient-to-b from-blue-500 to-transparent rounded-full"></div>
                <p className="text-xl leading-relaxed text-gray-700 font-light pl-4">{t("petLives.desc1")}</p>
              </div>

              <div className="relative">
                <div className="absolute -left-4 top-2 w-1 h-8 bg-gradient-to-b from-purple-500 to-transparent rounded-full"></div>
                <p className="text-xl leading-relaxed text-gray-700 font-light pl-4">{t("petLives.desc2")}</p>
              </div>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="group cursor-pointer">
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                    ✓
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Expert Care</div>
                    <div className="text-sm text-gray-600">Professional service</div>
                  </div>
                </div>
              </div>

              <div className="group cursor-pointer">
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl group-hover:from-purple-100 group-hover:to-purple-200 transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                    ♥
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">With Love</div>
                    <div className="text-sm text-gray-600">Caring approach</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to action */}
            <div className="pt-6">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white font-semibold rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105">
                <span className="relative z-10">Learn More About Us</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 w-full opacity-10">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0C240 20 480 40 720 45C960 50 1200 40 1320 35L1440 30V120H0V0Z" fill="url(#gradient)" />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  )
}
