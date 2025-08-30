import { Award, Building, Calendar, Clock, Heart, MapPin, Navigation, Phone, Star, Users } from "lucide-react"

import { Helmet } from "react-helmet"
import { useParams } from "react-router"

import { Button } from "@/components/ui/button"
import ClinicSkeleton from "@/components/ui/feedbacks/clinic-singal-skeleton"

import MapComponent from "@/components/map/MapComponent"
import { useVet } from "@/hooks/vet"

export default function SingleClinic() {
  const { id } = useParams()
  const { value: vet, loading } = useVet(id ?? "")

  if (!vet && !loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <Building className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Clinic not found</h3>
          <p className="text-gray-600">The clinic you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{vet?.vetName}</title>
        <meta name="description" content={`Learn more about ${vet?.vetName}`} />
      </Helmet>

      <div className="min-h-screen ">
        <div className="container py-8 space-y-8">
          {loading ? (
            <ClinicSkeleton />
          ) : (
            <>
              {/* Hero Section */}
              <div className="bg-white rounded-xl md:rounded-3xl shadow-lg md:shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-emerald-500/10 via-blue-500/5 to-purple-500/10 p-4 sm:p-6 md:p-8">
                  <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                    {/* Clinic Image */}
                    <div className="lg:w-1/2">
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl md:rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                        <div className="relative bg-white rounded-xl md:rounded-2xl overflow-hidden border-2 md:border-4 border-white shadow-lg md:shadow-2xl">
                          <img
                            src={vet?.vetImage}
                            alt={vet?.vetName}
                            className="w-full h-64 sm:h-80 md:h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                          {/* Floating badges */}
                          <div className="absolute top-3 left-3 md:top-4 md:left-4 flex gap-2">
                            <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 md:px-3 md:py-1 flex items-center gap-1 shadow-md md:shadow-lg">
                              <Award className="w-3 h-3 md:w-4 md:h-4 text-emerald-600" />
                              <span className="text-xs md:text-sm font-medium text-emerald-700">Verified</span>
                            </div>
                            <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 md:px-3 md:py-1 flex items-center gap-1 shadow-md md:shadow-lg">
                              <Clock className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
                              <span className="text-xs md:text-sm font-medium text-blue-700">Open Now</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Clinic Info */}
                    <div className="lg:w-1/2 space-y-4 md:space-y-6">
                      <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                          <span className="text-xs md:text-sm font-medium text-emerald-700 bg-emerald-100 px-2 py-0.5 md:px-3 md:py-1 rounded-full">
                            Veterinary Clinic
                          </span>
                        </div>

                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                          {vet?.vetName}
                        </h1>

                        <div className="flex items-center gap-3 flex-wrap">
                          <div className="flex items-center gap-2 bg-yellow-50 px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl border border-yellow-200 shadow-sm">
                            <Star className="text-yellow-500 fill-yellow-500 w-4 h-4 md:w-5 md:h-5" />
                            <span className="font-bold text-yellow-700 text-base md:text-lg">{vet?.rate}</span>
                            <span className="text-yellow-600 text-sm md:text-base">({vet?.numberOfRate} reviews)</span>
                          </div>

                          <div className="flex items-center gap-2 bg-emerald-50 px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl border border-emerald-200 shadow-sm">
                            <Users className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                            <span className="text-emerald-700 font-medium text-sm md:text-base">Trusted by 1000+</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      {vet?.bio && (
                        <div className="space-y-2">
                          <h3 className="font-semibold text-gray-700 text-base md:text-lg">About Our Clinic</h3>
                          <p className="text-gray-700 leading-relaxed text-sm md:text-base bg-gray-50 p-3 md:p-4 rounded-lg md:rounded-xl border">
                            {vet?.bio}
                          </p>
                        </div>
                      )}

                      {vet?.review && (
                        <div className="bg-blue-50 p-3 md:p-4 rounded-lg md:rounded-xl border border-blue-200">
                          <p className="text-blue-800 italic text-sm md:text-base">"{vet?.review}"</p>
                        </div>
                      )}

                      {/* Contact Info */}
                      <div className="space-y-3 md:space-y-4">
                        <h3 className="font-semibold text-gray-700 text-base md:text-lg">Contact Information</h3>

                        <div className="space-y-2 md:space-y-3">
                          <div className="flex items-center gap-3 p-3 md:p-4 bg-gray-50 rounded-lg md:rounded-xl border hover:shadow-md transition-shadow duration-300">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <MapPin className="text-emerald-600 w-4 h-4 md:w-6 md:h-6" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs md:text-sm text-gray-600 font-medium">Address</p>
                              <p className="text-gray-900 font-semibold text-sm md:text-base">
                                {vet?.locations.address}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 p-3 md:p-4 bg-gray-50 rounded-lg md:rounded-xl border hover:shadow-md transition-shadow duration-300">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <Phone className="text-blue-600 w-4 h-4 md:w-6 md:h-6" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs md:text-sm text-gray-600 font-medium">Phone Number</p>
                              <p className="text-gray-900 font-semibold text-sm md:text-base">{vet?.callNumber}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-3 md:pt-4">
                        <Button
                          className="flex-1 h-12 md:h-14 text-sm md:text-base font-semibold shadow-md md:shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 md:hover:-translate-y-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
                          asChild
                        >
                          <a
                            href={`tel:${vet?.callNumber}`}
                            className="flex items-center justify-center gap-2 md:gap-3"
                          >
                            <Phone size={18} className="md:size-5" />
                            Call Now
                          </a>
                        </Button>

                        <Button
                          variant="outline"
                          className="flex-1 h-12 md:h-14 text-sm md:text-base font-semibold border-2 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 transform hover:-translate-y-0.5 md:hover:-translate-y-1"
                        >
                          <Calendar size={18} className="mr-2 md:mr-3 md:size-5" />
                          Book Appointment
                        </Button>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex gap-2 md:gap-3 pt-1 md:pt-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="flex-1 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors duration-200 text-xs md:text-sm"
                        >
                          <Heart className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="flex-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 text-xs md:text-sm"
                        >
                          <Navigation className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                          Directions
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-emerald-50 p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Clinic Location</h2>
                      <p className="text-gray-600">Find us on the map</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none z-10" />

                  <div className="h-96 relative overflow-hidden z-3">
                    <MapComponent
                      latitude={vet?.locations.coordinates[0] ?? 0}
                      longitude={vet?.locations.coordinates[1] ?? 0}
                    />
                  </div>

                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 z-20">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md sm:shadow-lg border border-white/50">
                      <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3">
                        <div className="flex items-center gap-3 w-full xs:w-auto">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                          </div>
                          <div className="flex-1 xs:flex-none">
                            <p className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-1">
                              {vet?.vetName}
                            </p>
                            <p className="text-gray-600 text-xs sm:text-sm line-clamp-1">{vet?.locations.address}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="w-full xs:w-auto ml-0 xs:ml-auto bg-emerald-600 hover:bg-emerald-700 text-xs sm:text-sm"
                          onClick={() => {
                            const url = `https://www.google.com/maps/dir/?api=1&destination=${vet?.locations.coordinates[0]},${vet?.locations.coordinates[1]}`
                            window.open(url, "_blank")
                          }}
                        >
                          <Navigation className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          Directions
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
