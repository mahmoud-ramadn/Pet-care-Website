// pages/SinglShilter.tsx
import { useMemo, useState } from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router"

import { ShelterSkeleton } from "@/components/ui/feedbacks/singl-shilter-skeleton"


import { useShilter } from "@/hooks/shilters"
import ShelterGallery from "@/components/ui/shelters/ShelterGallery"
import ShelterInfo from "@/components/ui/shelters/ShelterInfo"
import ShelterAbout from "@/components/ui/shelters/ShelterAbout"
import ShelterMap from "@/components/ui/shelters/ShelterMap"
import ShelterReviews from "@/components/ui/shelters/ShelterReviews"



export default function SinglShilter() {
  const { id } = useParams()
  const { value: shelter, loading, retry } = useShilter(id ?? "")
  const [, setMainImage] = useState<string | undefined>()

  useMemo(() => {
    if (shelter) {
      setMainImage(shelter.shelterImages?.[0] ?? shelter.shelterImage)
    }
  }, [shelter])

  if (loading) return <ShelterSkeleton />

  return (
    <>
      <Helmet>
        <title>{shelter?.shelterName}</title>
        <meta name="description" content={shelter?.description} />
      </Helmet>

      <div className="min-h-screen light:bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="container py-8">
          {/* Header */}
          <div className="relative overflow-hidden light:bg-gradient-to-br from-white to-gray-50/50 rounded-3xl shadow-lg border border-white/20 md:p-8 p-4 mb-12">
            <div className="relative z-10 flex flex-col lg:flex-row gap-12">
              <ShelterGallery
                images={[shelter?.shelterImage, ...(shelter?.shelterImages || [])].filter(
                  (img): img is string => !!img
                )}
                name={shelter?.shelterName}
              />
              <ShelterInfo shelter={shelter} />
            </div>
          </div>

          <ShelterAbout about={shelter?.about} name={shelter?.shelterName} />
          <ShelterMap shelter={shelter} />
          <ShelterReviews reviews={shelter?.reviewsOfShelter} shelterId={id ?? ""} retry={retry} />
        </div>
      </div>
    </>
  )
}
