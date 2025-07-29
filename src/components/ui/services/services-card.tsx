import { Star } from "lucide-react"

import { Link } from "react-router-dom"

export default function ServicesCard({
  serviceType,
  serviceImage,
  price,
  city,
  serviceProfile,
}: Readonly<ShuffledServiceType>) {
  return (
    <Link
      to={`/services/description/${serviceProfile?._id || serviceProfile?.id}`}
      className="rounded-lg shadow-lg hover:shadow-xl transition-shadow bg-white overflow-hidden"
    >
      <img className="w-full h-48 object-cover" src={serviceImage} alt={serviceType} />
      <div className="p-5 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{serviceType}</h2>
          <span className="text-primary font-bold">from {price}</span>
        </div>
        <p className="text-sm text-gray-500">{city}</p>
        <p className="text-sm">{serviceProfile?.description}</p>
        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => {
            const rate = serviceProfile?.rate ?? 0
            return (
              <Star
                key={i}
                className={i < rate ? "text-yellow-400" : "text-gray-300"}
                fill={i < rate ? "currentColor" : "none"}
              />
            )
          })}

          <span className="ml-2 text-xs text-gray-600">
            {serviceProfile?.rate} Review{serviceProfile?.rate !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </Link>
  )
}
