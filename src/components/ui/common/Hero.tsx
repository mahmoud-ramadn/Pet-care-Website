import { ChevronDown, Sparkles, Star } from "lucide-react"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import SwiperWrapper from "../SwiperWrapper"
import SquareNavigation from "../common/squer-nav"

type HeroLayoutType = {
  imageHero: string
  cardUrl?: string
  MainTitle?: string
  array?: AdoptionNavigationLink[]
  className?: string
  preview?: number
  browser?: boolean
}

export default function Hero({
  imageHero,
  cardUrl,
  MainTitle,
  array,
  preview,
  browser = false,
}: Readonly<HeroLayoutType>) {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const { t } = useTranslation()

  useEffect(() => {
    setIsVisible(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative h-[100vh] min-h-[800px] w-full overflow-hidden group">
      {/* Enhanced Background with Parallax Effect */}
      
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed transition-all duration-1000 scale-105 group-hover:scale-110"
        style={{
          backgroundImage: `url(${imageHero})`,
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        {/* Multi-layer Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-purple-900/20" />

        {/* Animated Particles */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              <Star className="w-1 h-1 text-white/40 animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="absolute top-20 left-10 opacity-20">
          <div className="w-32 h-32 border border-white/30 rounded-full animate-spin-slow"></div>
        </div>
        <div className="absolute top-32 right-16 opacity-20">
          <div className="w-20 h-20 border border-white/30 rounded-full animate-pulse"></div>
        </div>

        <div
          className={`transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white/90 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>مرحباً بكم</span>
          </div>

          <h1 className="relative text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white drop-shadow-2xl leading-tight">
            <span className="relative inline-block">
              {MainTitle && t(MainTitle)}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent w-0 group-hover:w-32 transition-all duration-700 rounded-full" />
                <div className="h-0.5 bg-gradient-to-r from-transparent via-white to-transparent w-24 mt-1 animate-pulse" />
              </div>
            </span>

            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 bg-clip-text text-transparent animate-pulse" />
          </h1>

          <p className="mt-8  text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-medium">
            {t("adoption.description")}
          </p>


          

          {browser && (
            <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
              <button className="group/btn px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 hover:from-amber-600 hover:to-orange-600">
                <span className="flex  md:justify-center  justify-center items-center gap-2">
                  ابدأ الآن
                  <div className="w-0 group-hover/btn:w-5 transition-all duration-300 overflow-hidden">
                    <ChevronDown className="w-5 h-5 rotate-[-90deg]" />
                  </div>
                </span>
              </button>
              <button className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl backdrop-blur-md hover:bg-white/10 hover:border-white/50 transition-all duration-300">
                اعرف المزيد
              </button>
            </div>
          )}

          {array && (
            <div className="absolute  md:bottom-[-474px]  bottom-[-317px]  left-0 right-0 z-20">
              <div className="container mx-auto px-4 pb-8">
                <SwiperWrapper preview={preview} className="py-4">
                  {array.map((item, index) => (
                    <div key={index}>
                      <SquareNavigation
                        path={item.path}
                        className={`
                        relative overflow-hidden flex flex-col items-center justify-center gap-6 md:p-8
                        transition-all duration-300 hover:shadow-2xl rounded-2xl
                        ${
                          cardUrl === item.path
                            ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white  "
                            : "bg-white/90 backdrop-blur-md hover:bg-white border border-white/20 hover:border-white/40"
                        }
                        before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-300
                      `}
                        title={item.label ? t(item.label) : ""}
                        image={item.image}
                        imageClassName="rounded-xl shadow-md group-hover:shadow-xl transition-shadow duration-300"
                      />

                      {/* Card Glow Effect */}
                      {cardUrl === item.path && (
                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl blur opacity-30 z-10" />
                      )}
                    </div>
                  ))}
                </SwiperWrapper>
              </div>
            </div>
          )}





        </div>





        {browser && (
          <div className="absolute md:bottom-32 bottom-10 animate-bounce">
            <div className="flex flex-col items-center gap-2 text-white/70">
              <span className="text-sm font-medium">تصفح المزيد</span>
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
