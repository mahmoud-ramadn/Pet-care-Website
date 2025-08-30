import {
  Award,
  Calendar,
  CheckCircle,
  Clock,
  Heart,
  MapPin,
  MessageSquare,
  Navigation,
  Phone,
  Share2,
  Star,
  Users,
} from "lucide-react"

import { useMemo, useState } from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router"

import SwiperWrapper from "@/components/ui/SwiperWrapper"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShelterSkeleton } from "@/components/ui/feedbacks/singl-shilter-skeleton"
import { ReviewItem } from "@/components/ui/serviceProfile/ReviewItem"

import { ShilterWritereivew } from "@/apis/writeriewve"
import WriteReview from "@/components/forms/write-review"
import MapComponent from "@/components/map/MapComponent"
import { useShilter } from "@/hooks/shilters"

export default function SinglShilter() {
  const { id } = useParams()
  const { value: shelter, loading, retry } = useShilter(id ?? "")
  const [mainImage, setMainImage] = useState<string | undefined>()
  const [isFavorited, setIsFavorited] = useState(false)

  useMemo(() => {
    if (shelter) {
      const firstImage = shelter.shelterImages?.[0] ?? shelter.shelterImage
      setMainImage(firstImage)
    }
  }, [shelter])

  if (loading) {
    return <ShelterSkeleton />
  }

  return (
    <>
      <Helmet>
        <title>{shelter?.shelterName}</title>
        <meta name="description" content={shelter?.description} />
      </Helmet>
      <div className="min-h-screen light:bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="container py-8">
          {/* Enhanced Shelter Header */}
          <div className="relative overflow-hidden light:bg-gradient-to-br from-white to-gray-50/50 rounded-3xl shadow-lg border border-white/20  md:p-8 p-4 mb-12">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-400/10 to-transparent rounded-full -translate-y-32 translate-x-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-400/10 to-transparent rounded-full translate-y-24 -translate-x-24 blur-2xl" />

            <div className="relative z-10 flex flex-col lg:flex-row gap-12">
              {/* Enhanced Image Gallery */}
              <div className="lg:w-1/2">
                {/* Main Image with Enhanced Styling */}
                <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src={mainImage}
                    alt={shelter?.shelterName}
                    className="w-full h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  {/* Action Buttons on Image */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => setIsFavorited(!isFavorited)}
                      className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 transform hover:scale-110 ${
                        isFavorited ? "bg-red-500 text-white shadow-lg" : "bg-white/90 text-gray-700 hover:bg-white"
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
                    </button>
                    <button className="p-3 rounded-full bg-white/90 text-gray-700 hover:bg-white backdrop-blur-md transition-all duration-300 transform hover:scale-110">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute bottom-4 left-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-full flex items-center gap-2 shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span>مفتوح الآن</span>
                  </div>
                </div>

                {/* Enhanced Thumbnail Swiper */}
                <div className="mt-6">
                  <SwiperWrapper isPagination preview={4} className="thumbnail-swiper">
                    {[shelter?.shelterImage, ...(shelter?.shelterImages || [])]
                      .filter((img, index, arr) => arr.indexOf(img) === index)
                      .map((img) => (
                        <div key={img} className="cursor-pointer group" onClick={() => setMainImage(img)}>
                          <img
                            src={img}
                            alt={`${shelter?.shelterName} thumbnail`}
                            className={`h-24 w-full object-cover rounded-xl transition-all duration-300 shadow-md ${
                              mainImage === img
                                ? "ring-4 ring-blue-500 shadow-lg scale-105"
                                : "hover:opacity-80 hover:shadow-lg hover:scale-105"
                            }`}
                          />
                        </div>
                      ))}
                  </SwiperWrapper>
                </div>
              </div>

              {/* Enhanced Shelter Info */}
              <div className="lg:w-1/2 space-y-6">
                {/* Title and Rating */}
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text light:text-transparent text-white leading-tight">
                    {shelter?.shelterName}
                  </h1>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-xl">
                      <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                      <span className="font-bold text-lg text-amber-700">{shelter?.rate?.toFixed(1)}</span>
                      <span className="text-amber-600">({shelter?.numberOfRates} مراجعة)</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-medium">موثق</span>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700">{shelter?.locations?.address}</span>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                    <Phone className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-gray-700">{shelter?.shelterNumber}</span>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                    <Clock className="w-5 h-5 text-purple-500" />
                    <span className="font-medium text-gray-700">مفتوح ٢٤ ساعة</span>
                  </div>
                </div>

                {/* Description */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-gray-700 leading-relaxed">{shelter?.description}</p>
                </div>

                {/* Enhanced Badges */}
                <div className="flex flex-wrap gap-3">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full"
                  >
                    <Users className="w-4 h-4" />
                    {shelter?.pets_Id?.length || 0} حيوان أليف
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full"
                  >
                    <Calendar className="w-4 h-4" />
                    تأسس في {new Date(shelter?.createdAt ?? 0)?.getFullYear()}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full"
                  >
                    <Award className="w-4 h-4" />
                    موثوق
                  </Badge>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <MessageSquare className="w-5 h-5 ml-2" />
                    تواصل معنا
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 h-12 border-2 border-gray-200 hover:border-gray-300 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
                  >
                    تبرع الآن
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced About Section */}
          <section className="mb-12">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 md:p-8 px-3 py-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                حول {shelter?.shelterName}
              </h2>
              <div className="prose prose-lg text-gray-700 leading-relaxed">
                <p className="whitespace-pre-line">{shelter?.about}</p>
              </div>
            </div>
          </section>

          {/* Enhanced Map Section */}
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
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none z-10" />

              <div className="h-96 relative overflow-hidden z-3">
                <MapComponent
                  latitude={shelter?.locations?.coordinates?.[0] ?? 0}
                  longitude={shelter?.locations?.coordinates?.[1] ?? 0}
                />
              </div>
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 z-20">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md sm:shadow-lg border border-white/50">
                  <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 sm:gap-3 w-full xs:w-auto">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                          {shelter?.shelterName}
                        </p>
                        <p className="text-gray-600 text-xs sm:text-sm truncate">
                          {shelter?.locations?.address || "Address not available"}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full xs:w-auto ml-0 xs:ml-auto bg-emerald-600 hover:bg-emerald-700 text-xs sm:text-sm px-3"
                      onClick={() => {
                        if (shelter?.locations?.coordinates?.[0] && shelter?.locations?.coordinates?.[1]) {
                          const url = `https://www.google.com/maps/dir/?api=1&destination=${shelter.locations.coordinates[0]},${shelter.locations.coordinates[1]}`
                          window.open(url, "_blank")
                        }
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

          <div className=" grid md:grid-cols-2 lg:grid-cols-4 gap-5 grid-cols-1">
            <section className=" lg:col-span-3 rounded-2xl bg-white shadow-lg border border-gray-100 my-8 py-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-500 ml-3  rounded-full"></div>
                مراجعات العملاء
              </h2>

              {shelter?.reviewsOfShelter?.length ? (
                <div className="space-y-6">
                  {shelter?.reviewsOfShelter?.map((review, idx) => (
                    <ReviewItem key={idx} review={review._id ? (review as Review) : null} reload={() => retry()} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg">لا توجد مراجعات حتى الآن</p>
                  <p className="text-gray-400 text-sm mt-1">كن أول من يضع مراجعة</p>
                </div>
              )}
            </section>
            <WriteReview
              writeReview={(data) => {
                ShilterWritereivew(data, id ?? "")
                retry()
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
