import { CalendarCheck, Heart } from "lucide-react"

import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"

import HeroImage from "@/assets/images/background/cat-dog-hero.webp"

export default function Hero() {
  const { t } = useTranslation()

  return (
    <div className=" bg-gradient-to-tl from-primary to-secondary">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Text Content */}
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">{t("mainHeroText")}</h1>

            <p className="text-xl text-white/90 font-medium">{t("mainHeroParagraph")}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                <Heart className="w-5 h-5 mr-2" />
                {t("bookNow")}
              </Button>
              <Button variant="outline" size="lg" className=" text-primary border-white hover:bg-white/10">
                <CalendarCheck className="w-5 h-5 mr-2" />
                {t("learnMore")}
              </Button>
            </div>
          </div>

          <div className="md:w-1/2">
            <img src={HeroImage} alt="Happy pets" className="w-full max-w-md mx-auto " />
          </div>
        </div>
      </div>
    </div>
  )
}
