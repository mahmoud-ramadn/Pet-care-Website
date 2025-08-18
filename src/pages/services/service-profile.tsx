import { useAtomValue } from "jotai"

import { useParams } from "react-router-dom"

import { ServiceProfileSkeleton } from "@/components/ui/feedbacks/service-profile-skeleton"
import { BookingCard } from "@/components/ui/serviceProfile/BookingCard"
import { PetPreferences } from "@/components/ui/serviceProfile/PetPreferences"
import { ReviewItem } from "@/components/ui/serviceProfile/ReviewItem"
import { ServiceDetails } from "@/components/ui/serviceProfile/ServiceDetails"
import { ServiceGallery } from "@/components/ui/serviceProfile/ServiceGallery"
import { ServiceHeader } from "@/components/ui/serviceProfile/ServiceHeader"
import { ServiceInfo } from "@/components/ui/serviceProfile/ServiceInfo"

import { serviceWritereivew } from "@/apis/writeriewve"
import { tokenAtom } from "@/atoms"
import WriteReview from "@/components/forms/write-review"
import { useServiceProfile } from "@/hooks/services"

export default function Description() {
  const token = useAtomValue(tokenAtom)
  const { id } = useParams()

  const { value: serviceProfile, loading, retry } = useServiceProfile(id ?? "")

  if (loading) return <ServiceProfileSkeleton />
  if (!serviceProfile) return <div className="text-center text-gray-500 py-12">Service not found</div>

  return (
    <div className="container py-10 space-y-10">
      <ServiceHeader name={serviceProfile.name} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* المحتوى الرئيسي */}
        <div className="lg:col-span-2 space-y-10">
          <ServiceInfo
            name={serviceProfile.name}
            rate={serviceProfile.rate}
            numberOfRate={serviceProfile.numberOfRate}
          />

          <ServiceGallery images={serviceProfile.imagesProfile} />

          <section className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">عن الخدمة</h2>
            <p className="text-gray-600 whitespace-pre-line leading-relaxed">{serviceProfile.about}</p>
          </section>

          <ServiceDetails
            from={serviceProfile.from}
            to={serviceProfile.to}
            price={serviceProfile.price}
            pricePer={serviceProfile.pricePer}
          />

          <PetPreferences types={serviceProfile.accepted_pet_types} sizes={serviceProfile.accepted_pet_sizes} />

          <section className="bg-white md:p-6  rounded-xl shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">مراجعات العملاء</h2>

            {serviceProfile.reviewsOfService?.length ? (
              <div className="space-y-6">
                {serviceProfile.reviewsOfService.map((review) => (
                  <ReviewItem key={review._id} review={review} reload={() => retry()} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">لا توجد مراجعات حتى الآن</p>
            )}
          </section>

          {token && (
            <WriteReview
              writeReview={(data) => {
                serviceWritereivew(data, id ?? "")
                retry()
              }}
            />
          )}
        </div>

        <div className="lg:col-span-1">
          <BookingCard
            price={serviceProfile.price}
            pricePer={serviceProfile.pricePer}
            from={serviceProfile.from}
            to={serviceProfile.to}
            questions={serviceProfile.question1}
          />
        </div>
      </div>
    </div>
  )
}
