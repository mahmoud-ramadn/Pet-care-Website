import { ArrowRight, Sparkles } from "lucide-react"

import { Link } from "react-router"

import { cn } from "@/lib/utils"

import SwiperWrapper from "@/components/ui/SwiperWrapper"
import { Button } from "@/components/ui/button"
import UiTitle from "@/components/ui/ui-title"

import CircleCard from "../circel-card"

type MeetOurType = {
  title: string
  ButtonText: string
  subTitle: string
  className?: string
  array: CircleCardType[]
  variant?: "default" | "destructive" | "outline" | "ghost" | "link" | "secondary"
  path: string
}

export default function MeetOur({
  title,
  ButtonText,
  subTitle,
  className,
  array,
  variant = "default",
  path,
}: Readonly<MeetOurType>) {
  return (
    <section className={cn("relative my-20 py-32 flex items-center justify-center overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

      <div className="absolute top-10 left-10 opacity-20">
        <Sparkles className="w-8 h-8 text-primary animate-pulse" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20">
        <Sparkles className="w-6 h-6 text-secondary animate-pulse delay-1000" />
      </div>

      <div className="container relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center p-1 mb-6 bg-primary/10 rounded-full">
            <span className="px-4 py-2 text-sm font-medium text-primary bg-white rounded-full shadow-sm">
              ✨ Meet Our Team
            </span>
          </div>

          <UiTitle className="mb-6 bg-gradient-to-r from-gray-900 via-primary to-gray-900 bg-clip-text text-transparent">
            {title}
          </UiTitle>

          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">{subTitle}</p>
        </div>

        <div className="mb-16">
          <SwiperWrapper className="my-12 pb-8" preview={4}>
            {array.map((item, index) => (
              <div
                key={item.id}
                className="transform  transition-all duration-300 hover:scale-100    "
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <CircleCard viewBtm={false} name={item.name} doctorImage={item.image} description={item.specific} />
              </div>
            ))}
          </SwiperWrapper>
        </div>
        <div className="text-center">
          <Link to={path} className="inline-block group">
            <Button
              variant={variant}
              className={cn(
                "relative overflow-hidden bg-white hover:bg-gray-50 text-primary",
                "border-2 border-primary/20 hover:border-primary/40",
                "rounded-full px-8 py-4 text-lg font-semibold",
                "shadow-lg hover:shadow-xl transform transition-all duration-300",
                "hover:scale-105 active:scale-95",
                "before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/10 before:to-secondary/10",
                "before:translate-x-[-100%] hover:before:translate-x-0 before:transition-transform before:duration-500"
              )}
            >
              <span className="relative z-10 flex items-center gap-2">
                {ButtonText}
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Button>
          </Link>

          <div className="mt-8 flex items-center justify-center">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-32" />
          </div>
        </div>
      </div>
    </section>
  )
}
