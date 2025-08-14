import { ArrowRight, Bookmark, Clock, ExternalLink } from "lucide-react"

import { useState } from "react"

export default function BlogCard({ plogImage, description, link }: Blog) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-gray-200">
      {/* Background Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500 -z-10" />

      {/* Image Section */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <div className={`w-full h-56 bg-gray-200 transition-all duration-500 ${!imageLoaded ? "animate-pulse" : ""}`}>
          <img
            src={plogImage || "/placeholder-image.jpg"}
            alt={description}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            setIsBookmarked(!isBookmarked)
          }}
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
            isBookmarked ? "bg-blue-500 text-white shadow-lg" : "bg-white/90 text-gray-700 hover:bg-white"
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
        </button>

        {/* Reading Time Badge */}
        <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 text-white text-sm font-medium rounded-full flex items-center gap-2 backdrop-blur-sm">
          <Clock className="w-3 h-3" />
          <span>٥ دقائق قراءة</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Category Badge */}
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">مقالات</span>
          <div className="flex items-center gap-1 text-gray-400">
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>

        {/* Title */}
        <a href={link} target="_blank" rel="noopener noreferrer" className="block">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
            {description}
          </h3>
        </a>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-xs">ب</span>
            </div>
            <span>بلوق الحيوانات</span>
          </div>
          <span>منذ يومين</span>
        </div>

        {/* Enhanced Read More Button */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mt-4 transition-all duration-300"
        >
          <span>اقرأ المزيد</span>
          <div className="relative overflow-hidden">
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            <ArrowRight className="w-4 h-4 absolute top-0 -right-4 transition-transform duration-300 group-hover/btn:right-0" />
          </div>
        </a>

        {/* Interaction Bar */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4 text-gray-500">
            <button className="flex items-center gap-1 text-sm hover:text-blue-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>٢٤</span>
            </button>
            <button className="flex items-center gap-1 text-sm hover:text-blue-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.486-1.22L3 21l1.22-5.514A8.955 8.955 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"
                />
              </svg>
              <span>٧</span>
            </button>
          </div>

          <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
              />
            </svg>
            <span>مشاركة</span>
          </button>
        </div>
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-400/5 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-all duration-500" />
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-purple-400/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
    </div>
  )
}
