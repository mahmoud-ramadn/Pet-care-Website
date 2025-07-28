import { MapPin, Star } from "lucide-react"

export function ServiceInfo({ name, rate, numberOfRate }: { name?: string; rate?: number; numberOfRate?: number }) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2">{name}</h1>
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
          <span className="font-medium">
            {rate?.toFixed(1)} ({numberOfRate} reviews)
          </span>
        </div>
        <div className="flex items-center">
          <MapPin className="w-5 h-5 text-gray-500 mr-1" />
          <span>Location</span>
        </div>
      </div>
    </>
  )
}
