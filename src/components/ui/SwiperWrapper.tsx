import { ArrowLeft, ArrowRight } from "lucide-react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import { type ReactNode, useRef } from "react"

import { cn } from "@/lib/utils"

import i18n from "@/i18n"

import { Button } from "./button"

type SwiperWrapperProps = {
  children: ReactNode[]
  className?: string
  isPagination?: boolean
  isNavigation?: boolean
  preview?:number
}

export default function SwiperWrapper({
  children,
  className,
  isPagination = false,
  isNavigation = false,
  preview=3,
}: SwiperWrapperProps) {
  const prevRef = useRef<HTMLButtonElement | null>(null)
  const nextRef = useRef<HTMLButtonElement | null>(null)
  const isArabic = i18n.language === "ar"

  return (
    <div className={cn("relative", className)}>
      {isNavigation && (
        <>
          <Button
            ref={prevRef}
            className={cn("absolute -left-5 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white")}
          >
            <ArrowLeft />
          </Button>
          <Button
            ref={nextRef}
            className={cn("absolute -right-5 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white")}
          >
            <ArrowRight />
          </Button>
        </>
      )}
      <Swiper
        dir={isArabic ? "rtl" : "ltr"}
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={preview}
       breakpoints={{
          0: {    // Mobile
            slidesPerView: 1.2,
            spaceBetween: 15
          },
          480: {   // Small tablets
            slidesPerView: 1.5,
            spaceBetween: 15
          },
          640: {   // Large phones/tablets
            slidesPerView: 2,
            spaceBetween: 20
          },
          768: {   // Tablets
            slidesPerView: 2.5,
            spaceBetween: 20
          },
          1024: {  // Laptops
            slidesPerView: preview,
            spaceBetween: 25
          },
          1280: {  // Desktops
            slidesPerView: preview,
            spaceBetween: 30
          }
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
            swiper.params.navigation.prevEl = prevRef.current
            swiper.params.navigation.nextEl = nextRef.current
            swiper.navigation.init()
            swiper.navigation.update()
          }
        }}
        pagination={isPagination ? { clickable: true } : false}
      >
        {children.map((child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
