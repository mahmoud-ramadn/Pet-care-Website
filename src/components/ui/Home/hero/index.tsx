import { useEffect, useRef, useState } from "react"

import dog from "@/assets/images/landing page/cute-smiley-dog-wearing-sunglasses-removebg-preview 1 (2).webp"
import imageHero from "@/assets/images/landing page/mainbackground.webp"

// Custom hook for counter animation
const useCounter = (end: number, duration: number = 2000, start: number = 0) => {
  const [count, setCount] = useState(start)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let startTime: number | null = null
    let animationFrameId: number

    const isElementInViewport = () => {
      if (!ref.current) return false
      const rect = ref.current.getBoundingClientRect()
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      )
    }

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const percentage = Math.min(progress / duration, 1)

      // Use easeOutQuart for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4)
      const currentCount = Math.floor(easeOutQuart * (end - start) + start)

      setCount(currentCount)

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animateCount)
      } else {
        setCount(end)
      }
    }

    const handleScroll = () => {
      if (isElementInViewport() && count !== end) {
        animationFrameId = requestAnimationFrame(animateCount)
        window.removeEventListener("scroll", handleScroll)
      }
    }

    // Check if element is already in viewport on mount
    if (isElementInViewport()) {
      animationFrameId = requestAnimationFrame(animateCount)
    } else {
      window.addEventListener("scroll", handleScroll)
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [end, duration, start])

  return [count, ref] as const
}

export default function Hero() {
  // Using the custom counter hook for each stat
  const [happyClientsCount, happyClientsRef] = useCounter(500)
  const [ratingCount, ratingRef] = useCounter(5)
  const [supportCount, supportRef] = useCounter(24)

  // State for image loading
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-blue-900/20 to-purple-900/40"></div>
      </div>

      {/* Simplified decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-40 left-20 w-20 h-20 bg-purple-500/20 rounded-full blur-lg animate-pulse delay-1000"></div>

      <div className="container relative z-10 mx-auto px-4 py-12">
        <div className="min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Content Section */}
            <div className="space-y-8 max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
                Premium Pet Care Services
              </div>

              {/* Main heading */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                  Taking Care of Your
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
                    Smart Dog!
                  </span>
                </h1>

                <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
              </div>

              {/* Description */}
              <p className="text-xl text-white/90 leading-relaxed font-light max-w-lg">
                Experience premium products and exceptional services designed specifically for your beloved furry
                companion
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                  <span className="relative z-10">Book Appointment</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/20 hover:border-white/50">
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center" ref={happyClientsRef}>
                  <div className="text-3xl font-bold text-blue-400">{happyClientsCount}+</div>
                  <div className="text-sm text-white/70">Happy Clients</div>
                </div>
                <div className="text-center" ref={ratingRef}>
                  <div className="text-3xl font-bold text-blue-400">{ratingCount}★</div>
                  <div className="text-sm text-white/70">Rating</div>
                </div>
                <div className="text-center" ref={supportRef}>
                  <div className="text-3xl font-bold text-blue-400">{supportCount}/7</div>
                  <div className="text-sm text-white/70">Support</div>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="absolute top-10 right-20 w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="absolute bottom-20 right-32 w-4 h-4 bg-indigo-400 rounded-full animate-bounce delay-1000"></div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="relative z-10">
                  {!imageLoaded && (
                    <div className="w-full max-w-[300px] h-[300px] bg-violet-100/20 rounded-full animate-pulse flex items-center justify-center">
                      <div className="w-16 h-16 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
                    </div>
                  )}

                  <img
                    src={dog}
                    alt="Happy dog wearing sunglasses"
                    width={300}
                    height={300}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setImageLoaded(true)}
                    className={`
                      max-w-[300px] max-h-[300px] w-full h-auto 
                      bg-violet-100/20 rounded-full object-cover
                      transition-all duration-500 will-change-transform
                      ${imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                      hover:scale-105
                    `}
                    style={{
                      filter: "drop-shadow(0 25px 25px rgba(0, 0, 0, 0.15))",
                    }}
                  />
                </div>

                <div
                  className="absolute top-1/2 left-1/2 w-[350px] h-[350px] border border-white/10 rounded-full pointer-events-none"
                  style={{
                    transform: "translate(-50%, -50%)",
                    animation: "spin 20s linear infinite",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  )
}
