import { ArrowRight, Clock, Heart, MapPin, Star, Users } from "lucide-react"

import { useState } from "react"
import { Link } from "react-router"

import { Button } from "../button"

export default function ShelterCard({ shelterImage, shelterName, locations, rate, id }: Readonly<ShelterItem>) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const rating = Math.round(rate ?? 0)

  return (
    <div
      className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-gray-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500 -z-10" />

      {/* Content Container */}
      <div className="relative flex items-stretch gap-6 p-6">
        {/* Enhanced Image Section */}
        <div className="relative flex-shrink-0 w-36 h-36 overflow-hidden rounded-2xl">
          <img
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            src={shelterImage || "/placeholder.jpg"}
            alt={shelterName}
          />

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsFavorited(!isFavorited)
            }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
              isFavorited ? "bg-red-500 text-white shadow-lg" : "bg-white/80 text-gray-600 hover:bg-white"
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
          </button>

          {/* Status Badge */}
          <div className="absolute bottom-3 left-3 px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span>مفتوح</span>
          </div>
        </div>

        {/* Enhanced Content Section */}
        <div className="flex flex-col justify-between flex-grow">
          <div className="space-y-3">
            {/* Title with Gradient */}
            <h3 className="text-2xl font-bold line-clamp-1 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {shelterName}
            </h3>

            {/* Enhanced Rating Section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`transition-all duration-300 ${
                        i < rating ? "fill-amber-400 text-amber-400 drop-shadow-sm" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">({rating}.0)</span>
              </div>

              {/* Pet Count Badge */}
              <div className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                <Users className="w-4 h-4" />
                <span>٢٥+ حيوان</span>
              </div>
            </div>

            {/* Enhanced Location & Hours */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4 text-green-500" />
                <span className="font-medium text-green-600">مفتوح ٢٤ ساعة</span>
              </div>

              {locations?.address && (
                <div className="flex items-start gap-2 text-gray-600">
                  <MapPin className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
                  <p className="text-sm line-clamp-2">{locations.address}</p>
                </div>
              )}
            </div>

            {/* Features Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full">
                تبني مجاني
              </span>
              <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full">رعاية طبية</span>
            </div>
          </div>

          {/* Enhanced Action Section */}
          <div className="pt-4 border-t border-gray-100 mt-4">
            <Link to={`/get-shilter/${id}`} className="block">
              <Button
                className={`group/btn relative w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 overflow-hidden ${
                  isHovered ? "scale-105" : ""
                }`}
              >
                {/* Button Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />

                <span className="relative flex items-center justify-center gap-2">
                  <span>عرض الحيوانات</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-indigo-400/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
    </div>
  )
}
