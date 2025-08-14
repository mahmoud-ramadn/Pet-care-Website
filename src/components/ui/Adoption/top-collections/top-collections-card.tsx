import { Heart } from "lucide-react"

export default function TopCollectionsCard({ petImage, name, type }: Readonly<PetItem>) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200">
      {/* Glass-morphism Favorite Button */}
      <button
        className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm bg-white/80 shadow-sm hover:bg-white transition-all duration-300 hover:shadow-md"
        aria-label="Add to favorites"
      >
        <Heart
          className="h-[18px] w-[18px] text-rose-500 group-hover:text-rose-600 group-hover:scale-110 transition-all duration-300"
          fill="currentColor"
          fillOpacity="0.2"
        />
      </button>

      {/* Image with gradient overlay */}
      <div className="relative overflow-hidden h-60 w-full">
        <img
          src={petImage}
          alt={`${name} - ${type}`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Info with subtle background */}
      <div className="p-5 bg-gradient-to-b from-white to-gray-50">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
              {name}
            </h3>
            <p className="mt-1 text-sm font-medium text-gray-500 capitalize">{type}</p>
          </div>

          {/* Status badge - could be dynamic based on props */}
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
            Available
          </span>
        </div>

        {/* Hidden details that appear on hover */}
        <div className="mt-3 pt-3 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Age</span>
            <span className="font-medium text-gray-700">2 years</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-500">Location</span>
            <span className="font-medium text-gray-700">San Francisco</span>
          </div>
        </div>
      </div>
    </div>
  )
}
