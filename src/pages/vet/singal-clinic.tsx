import { Calendar, MapPin, Phone, Star } from "lucide-react"

import { useParams } from "react-router"

import { Button } from "@/components/ui/button"
import ClinicSkeleton from "@/components/ui/feedbacks/clinic-singal-skeleton"

import MapComponent from "@/components/map/MapComponent"
import { useVet } from "@/hooks/vet"

export default function SingleClinic() {
  const { id } = useParams()
  const { value: vet, loading } = useVet(id ?? "")

  if (!vet && !loading) {
    return <div className="container text-center py-10">Clinic not found</div>
  }

  return (
    <div className="container py-8">
      {loading ? (
        <ClinicSkeleton />
      ) : (
        <>
          {/* Header Section */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Clinic Image */}
            <div className="w-full md:w-1/2">
              <div className="rounded-2xl overflow-hidden border-2 border-dashed border-white">
                <img src={vet?.vetImage} alt={vet?.vetName} className="w-full h-96 object-cover" />
              </div>
            </div>

            {/* Clinic Info */}
            <div className="w-full md:w-1/2 space-y-4">
              <h1 className="text-3xl font-bold">{vet?.vetName}</h1>
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400 fill-yellow-400" />
                <span>
                  {vet?.rate} ({vet?.numberOfRate} reviews)
                </span>
              </div>
              <p className="text-lg">{vet?.bio}</p>
              <p className="text-gray-300">{vet?.review}</p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="text-primary" />
                  <span>{vet?.locations.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="text-primary" />
                  <span>{vet?.callNumber}</span>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button className="flex-1">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </Button>
                <Button variant="outline" className="flex-1">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>

          <div className=" rounded-xl">
            <div className="mt-12 ">
              <h2 className="text-2xl font-bold mb-4">Location</h2>
              <div className="flex items-center justify-center h-full text-gray-400">
                <MapComponent
                  latitude={vet?.locations.coordinates[0] ?? 0}
                  longitude={vet?.locations.coordinates[1] ?? 0}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
