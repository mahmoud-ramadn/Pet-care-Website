// components/shelters/ShelterMap.tsx
import { MapPin, Navigation } from "lucide-react"

import { Button } from "@/components/ui/button"

import MapComponent from "@/components/map/MapComponent"

interface Props {
  shelter: any
}
export default function ShelterMap({ shelter }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Shelter Location</h2>
            <p className="text-gray-600">Find us on the map</p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="h-96 relative overflow-hidden z-3">
          <MapComponent
            latitude={shelter?.locations?.coordinates?.[0] ?? 0}
            longitude={shelter?.locations?.coordinates?.[1] ?? 0}
          />
        </div>
        <div className="absolute  bottom-3 left-3 right-3 z-20">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-md border border-white/50 flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-900">{shelter?.shelterName}</p>
              <p className="text-gray-600 text-sm">{shelter?.locations?.address || "Address not available"}</p>
            </div>
            <Button
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-xs sm:text-sm px-3"
              onClick={() => {
                if (shelter?.locations?.coordinates?.[0] && shelter?.locations?.coordinates?.[1]) {
                  const url = `https://www.google.com/maps/dir/?api=1&destination=${shelter.locations.coordinates[0]},${shelter.locations.coordinates[1]}`
                  window.open(url, "_blank")
                }
              }}
            >
              <Navigation className="w-3 h-3 mr-1" /> Directions
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
