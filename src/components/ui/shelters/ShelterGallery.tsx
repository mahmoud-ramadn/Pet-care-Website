// components/shelters/ShelterGallery.tsx
import { Heart, Share2 } from "lucide-react"

import { useState } from "react"

import SwiperWrapper from "@/components/ui/SwiperWrapper"

interface Props {
  images: string[]
  name?: string
}

export default function ShelterGallery({ images, name }: Props) {
  const [mainImage, setMainImage] = useState(images?.[0])
  const [isFavorited, setIsFavorited] = useState(false)

  return (
    <div className="lg:w-1/2">
      {/* Main Image */}
      <div className="relative group overflow-hidden rounded-2xl shadow-xl">
        <img
          src={mainImage}
          alt={name}
          className="w-full h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />

        {/* Buttons */}
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

        {/* Badge */}
        <div className="absolute bottom-4 left-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-full flex items-center gap-2 shadow-lg">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span>مفتوح الآن</span>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="mt-6">
        <SwiperWrapper isPagination preview={4}>
          {images?.map((img) => (
            <div key={img} className="cursor-pointer group" onClick={() => setMainImage(img)}>
              <img
                src={img}
                alt={`${name} thumbnail`}
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
  )
}
