import { Award, Calendar, Clock, Heart, MapPin, MessageCircle, PawPrint, Phone, Star, Users } from "lucide-react"

import { useParams } from "react-router"

import SwiperWrapper from "@/components/ui/SwiperWrapper"
import { Button } from "@/components/ui/button"
import DoctorSkeleton from "@/components/ui/feedbacks/doctorSkeleton"
import { ReviewItem } from "@/components/ui/serviceProfile/ReviewItem"

import { DoctorsWritereivew } from "@/apis/writeriewve"
import WriteReview from "@/components/forms/write-review"
import { useDoctor } from "@/hooks/doctors"

export default function SingleDoctor() {
  const { id } = useParams()
  const { value: data, loading, error, retry } = useDoctor(id ?? "")

  const doctor: Doctor = data ?? {}

  if (error) {
    return (
      <div className="container min-h-[50vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Error loading doctor data</h3>
          <Button onClick={retry} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (!loading && !doctor) {
    return (
      <div className="container min-h-[50vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Doctor not found</h3>
          <p className="text-gray-600">The doctor you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container md:py-8 py-4 space-y-8">
        {loading ? (
          <DoctorSkeleton />
        ) : doctor ? (
          <>
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 md:p-8 p-4">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-80 mx-auto lg:mx-0">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                      <div className="relative bg-white rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                        <img
                          src={doctor?.doctorImage}
                          alt={doctor?.name}
                          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                          Verified Doctor
                        </span>
                      </div>

                      <h1 className="text-4xl font-bold text-gray-900 leading-tight">Dr. {doctor?.name}</h1>

                      <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-200">
                          <Star className="text-yellow-500 fill-yellow-500 w-5 h-5" />
                          <span className="font-bold text-yellow-700">{doctor?.rate}</span>
                          <span className="text-yellow-600">({doctor.numberOfRate} reviews)</span>
                        </div>

                        <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200">
                          <Clock className="w-4 h-4 text-green-600" />
                          <span className="text-green-700 font-medium">Available Today</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Specializations
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {doctor?.specialized_in?.map((specialty) => (
                          <span
                            key={specialty}
                            className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20 hover:bg-primary/20 transition-colors duration-200"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                        <PawPrint className="w-4 h-4" />
                        Treats
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {doctor?.accepted_pet_types?.map((petType) => (
                          <span
                            key={petType}
                            className="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium flex items-center gap-2 border border-secondary/20 hover:bg-secondary/20 transition-colors duration-200"
                          >
                            <PawPrint className="w-3 h-3" />
                            {petType}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Phone className="text-primary w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Phone Number</p>
                          <p className="font-semibold text-gray-900">{doctor.phone}</p>
                        </div>
                      </div>

                      {doctor.description && (
                        <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl">{doctor.description}</p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex md:flex-row flex-col gap-4 pt-4">
                      <Button
                        asChild
                        className="flex-1 h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        <a
                          href={`https://wa.me/${doctor?.phone ? doctor.phone.replace(/\D/g, "") : ""}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Phone size={20} />
                          Contact via WhatsApp
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 h-12 text-base font-semibold border-2 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        <Calendar size={20} />
                        Book Appointment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {doctor?.about && (
              <div className="bg-white rounded-2xl shadow-lg md:p-8 p-4 border border-gray-100">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  About Dr. {doctor?.name ? (doctor.name.split(" ")[1] ?? doctor.name) : ""}
                </h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">{doctor?.about}</p>
                </div>
              </div>
            )}

            {/* Gallery Section */}
            {doctor?.imagesProfile?.length && (
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                  <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-secondary" />
                  </div>
                  Clinic Gallery
                </h2>
                <SwiperWrapper preview={3} isPagination className="rounded-xl overflow-hidden">
                  {doctor.imagesProfile?.map((image, index) => (
                    <div key={index} className="group relative rounded-xl overflow-hidden aspect-[4/3] shadow-lg">
                      <img
                        src={image}
                        alt={`${doctor.name}'s clinic - ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="font-semibold">Clinic View {index + 1}</p>
                      </div>
                    </div>
                  ))}
                </SwiperWrapper>
              </div>
            )}

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 md:p-8 p-4 border-b border-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  Customer Reviews
                  <span className="text-lg font-normal text-gray-600">({doctor.numberOfRate})</span>
                </h2>
              </div>

              <div className="md:p-8 p-4">
                {doctor?.reviewsOfDoctor?.length ? (
                  <div className="space-y-6">
                    {doctor?.reviewsOfDoctor.map((review) => <ReviewItem review={review} reload={() => retry()} />)}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-lg">No reviews yet</p>
                    <p className="text-gray-400">Be the first to leave a review!</p>
                  </div>
                )}
              </div>
            </div>

            <WriteReview
              writeReview={(data) => {
                DoctorsWritereivew(data, id ?? "")
                retry()
              }}
            />
          </>
        ) : null}
      </div>
    </div>
  )
}
