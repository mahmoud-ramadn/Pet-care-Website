import { Calendar, MapPin, MessageSquare, Phone, Star, Users } from "lucide-react"

import { useEffect, useState } from "react"
import { useParams } from "react-router"

import SwiperWrapper from "@/components/ui/SwiperWrapper"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShelterSkeleton } from "@/components/ui/feedbacks/singl-shilter-skeleton"

import MapComponent from "@/components/map/MapComponent"
import { useShilter } from "@/hooks/shilters"

export default function SinglShilter() {
  const { id } = useParams()
  const { value: shelter, loading } = useShilter(id ?? "")
  const [mainImage, setMainImage] = useState<string | undefined>()

  useEffect(() => {
    if (shelter) {
      const firstImage = shelter.shelterImages?.[0] ?? shelter.shelterImage
      setMainImage(firstImage)
    }
  }, [shelter])
  if (loading) {
    return <ShelterSkeleton />
  }

  return (
    <div className="container py-8">
      {/* Shelter Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Main Image */}
        <div className="md:w-1/2">
          {/* Main Image Display */}
          <img
            src={mainImage}
            alt={shelter?.shelterName}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md"
          />

          {/* Thumbnail Swiper */}
          <div className="mt-4">
            <SwiperWrapper isPagination preview={4} className="thumbnail-swiper">
              {/* Include main image in swiper if not already in shelterImages */}
              {[shelter?.shelterImage, ...(shelter?.shelterImages || [])]
                .filter((img, index, arr) => arr.indexOf(img) === index)
                .map((img) => (
                  <div key={img} className="cursor-pointer" onClick={() => setMainImage(img)}>
                    <img
                      src={img}
                      alt={`${shelter?.shelterName} thumbnail`}
                      className={`h-20 w-full object-cover rounded-md transition-opacity ${
                        mainImage === img ? "ring-2 ring-primary" : "hover:opacity-80"
                      }`}
                    />
                  </div>
                ))}
            </SwiperWrapper>
          </div>
        </div>
        {/* Shelter Info */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{shelter?.shelterName}</h1>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="font-medium">
                {shelter?.rate?.toFixed(1)} ({shelter?.numberOfRates} reviews)
              </span>
            </div>

            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-500 mr-1" />
              <span>{shelter?.locations?.address}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <Phone className="w-5 h-5 text-primary" />
            <span className="font-medium">{shelter?.shelterNumber}</span>
          </div>

          <p className="text-gray-700 mb-6">{shelter?.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {shelter?.pets_Id?.length || 0} Pets
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Established {new Date(shelter?.createdAt ?? 0)?.getFullYear()}
            </Badge>
          </div>

          <div className="flex gap-4">
            <Button>
              <MessageSquare className="w-5 h-5 mr-2" />
              Contact
            </Button>
            <Button variant="outline">Donate</Button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">About {shelter?.shelterName}</h2>
        <p className="text-gray-700 whitespace-pre-line">{shelter?.about}</p>
      </section>

      {/* Map Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Location</h2>
        <div className="h-96 rounded-lg overflow-hidden">
          <MapComponent
            latitude={shelter?.locations?.coordinates?.[1] ?? 0}
            longitude={shelter?.locations?.coordinates?.[0] ?? 0}
          />
        </div>
        <p className="mt-2 text-gray-500">{shelter?.locations?.address}</p>
      </section>

      {/* Reviews Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {shelter?.reviewsOfShelter?.length ? (
          <div className="space-y-6">
            {shelter?.reviewsOfShelter.map((review) => (
              <div key={review._id} className="border-b pb-6 last:border-0">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar>
                    <AvatarImage src={review.user?.profileImage} />
                    <AvatarFallback>{review.user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{review.user?.name}</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < (review.rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-2">
                        {new Date(review.createdAt ?? 0).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{review?.review}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet</p>
        )}
      </section>
    </div>
  )
}
