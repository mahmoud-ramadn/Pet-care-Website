import { Eye, MapPin, Star, TrendingUp } from "lucide-react"

import { Link } from "react-router-dom"

export default function ServicesCard({
  serviceType,
  serviceImage,
  price,
  city,
  serviceProfile,
}: Readonly<ShuffledServiceType>) {
  const rating = serviceProfile?.rate ?? 0
  const reviewCount = serviceProfile?.rate ?? serviceProfile?.rate ?? 0

  return (
    <div className="group relative rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white overflow-hidden transform hover:-translate-y-2 hover:scale-[1.02] border border-gray-100">
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden">
        <img
          className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110"
          src={serviceImage}
          alt={serviceType}
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Floating Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-green-500" />
            <span className="text-xs font-semibold text-gray-700">Popular</span>
          </div>
        </div>

        {/* Rating Badge */}
        {rating > 0 && (
          <div className="absolute top-4 left-4 bg-yellow-500 text-white rounded-full px-2 py-1 shadow-lg">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-xs font-bold">{rating.toFixed(1)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4">
        {/* Header */}
        <div className="flex justify-between items-start gap-3">
          <h2 className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {serviceType}
          </h2>
          <div className="flex flex-col items-end">
            <span className="text-sm text-gray-500 font-medium">from</span>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ${price}
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium">{city}</span>
        </div>

        {/* Description */}
        {serviceProfile?.description && (
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{serviceProfile.description}</p>
        )}

        {/* Rating and Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          {/* Star Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 transition-colors duration-200 ${
                    i < rating ? "text-yellow-400 drop-shadow-sm" : "text-gray-300"
                  }`}
                  fill={i < rating ? "currentColor" : "none"}
                />
              ))}
            </div>

            <span className="text-xs text-gray-500 font-medium">
              ({reviewCount} review{reviewCount !== 1 ? "s" : ""})
            </span>
          </div>

          {/* View Details Link */}
          <Link
            to={`/services/description/${serviceProfile?._id || serviceProfile}`}
            className="group/link flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
          >
            <Eye className="w-3 h-3 transition-transform duration-300 group-hover/link:scale-110" />
            <span>View Details</span>
          </Link>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-colors duration-300 pointer-events-none"></div>
    </div>
  )
}
