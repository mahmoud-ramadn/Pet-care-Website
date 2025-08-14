import { useTranslation } from "react-i18next"

import { GroomingReviewsMock } from "@/Constants/main"

import SwiperWrapper from "../SwiperWrapper"
import UiTitle from "../ui-title"
import GroomingCard from "./GroomingCard"

export default function GroomingReviews() {
  const { t } = useTranslation()

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20"></div>

      <div className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-full blur-2xl animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-pink-400/10 to-red-400/10 rounded-full blur-lg animate-pulse"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-full shadow-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
            <span className="text-sm font-semibold text-blue-700">Customer Testimonials</span>
          </div>

          <div className="space-y-4">
            <UiTitle className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight">
              {t("groomingReview")}
            </UiTitle>

            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              <div className="w-8 h-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full"></div>
            </div>
          </div>

          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            Discover what our amazing customers have to say about their pets' grooming experience
          </p>
        </div>

        <div className="relative">

            <SwiperWrapper isNavigation preview={4} className="grooming-reviews-swiper">
              {GroomingReviewsMock.map((item, index) => (
                
                      <GroomingCard key={index} {...item} />
              ))}
            </SwiperWrapper>

          <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute -bottom-6 -right-6 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-30 animate-bounce delay-500"></div>
        </div>

        <div className="text-center mt-16 space-y-6">
          <div className="max-w-md mx-auto">
            <p className="text-gray-600 mb-6 font-light">
              Ready to give your pet the premium grooming experience they deserve?
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105">
                <span className="relative z-10">Book Grooming</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>

              <button className="px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-700 font-semibold rounded-2xl transition-all duration-300 hover:bg-white hover:border-gray-300 hover:shadow-lg">
                View All Reviews
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">4.9★</div>
              <div className="text-sm text-gray-500">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">500+</div>
              <div className="text-sm text-gray-500">Happy Pets</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 mb-1">98%</div>
              <div className="text-sm text-gray-500">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-1">5yrs</div>
              <div className="text-sm text-gray-500">Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 w-full opacity-20">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="url(#bottomGradient)"
          />
          <defs>
            <linearGradient id="bottomGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      
    </section>
  )
}
