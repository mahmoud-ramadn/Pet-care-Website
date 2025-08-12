import { Calendar, PawPrint, Phone, Star } from "lucide-react"

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
    return <div className="container text-center py-10">Error loading doctor data</div>
  }

  if (!loading && !doctor) {
    return <div className="container text-center py-10">Doctor not found</div>
  }

  return (
    <div className="container py-8">
      {loading ? (
        <DoctorSkeleton />
      ) : doctor ? (
        <>
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="rounded-2xl overflow-hidden border-2 border-dashed border-white">
                <img
                  src={doctor?.doctorImage}
                  alt={doctor?.name}
                  className="w-full h-auto aspect-square object-cover"
                />
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <h1 className="text-3xl font-bold">{doctor?.name}</h1>

              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="text-yellow-400 fill-yellow-400" />
                  <span className="ml-1 font-medium">{doctor?.rate}</span>
                </div>
                <span className="text-gray-400">({doctor.numberOfRate} reviews)</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {doctor?.specialized_in?.map((specialty) => (
                  <span key={specialty} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {specialty}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {doctor?.accepted_pet_types?.map((petType) => (
                  <span
                    key={petType}
                    className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm flex items-center gap-1"
                  >
                    <PawPrint className="w-3 h-3" />
                    {petType}
                  </span>
                ))}
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <Phone className="text-primary" size={18} />
                  <span>{doctor.phone}</span>
                </div>
                <p className="text-gray-300">{doctor.description}</p>
              </div>

              <div className="flex gap-4 pt-4">
                <Button asChild className="flex-1 gap-2">
                  <a
                    href={`https://wa.me/${doctor?.phone ? doctor.phone.replace(/\D/g, "") : ""}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Phone size={18} />
                    Contact via WhatsApp
                  </a>
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Calendar size={18} />
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 my-8" />

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              About Dr. {doctor?.name ? (doctor.name.split(" ")[1] ?? doctor.name) : ""}
            </h2>
            <p className="text-gray-300 whitespace-pre-line">{doctor?.about}</p>
          </section>
          {doctor?.imagesProfile?.length && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Gallery</h2>
              <SwiperWrapper preview={4} isPagination>
                {doctor.imagesProfile?.map((image, index) => (
                  <div key={index} className="rounded-lg overflow-hidden aspect-square">
                    <img
                      src={image}
                      alt={`${doctor.name}'s clinic - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </SwiperWrapper>
            </section>
          )}

          <section className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">مراجعات العملاء</h2>

            {doctor?.reviewsOfDoctor?.length ? (
              <div className="space-y-6">
                {doctor?.reviewsOfDoctor.map((review) => (
                  <ReviewItem key={review._id} review={review} reload={() => retry()} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">لا توجد مراجعات حتى الآن</p>
            )}
          </section>

          <WriteReview
            writeReview={(data) => {
              DoctorsWritereivew(data, id ?? "")
              retry()
            }}
          />
        </>
      ) : null}
    </div>
  )
}
