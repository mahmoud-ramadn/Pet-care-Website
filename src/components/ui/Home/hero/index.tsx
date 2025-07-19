import { useTranslation } from "react-i18next"

import HeroImage from "@/assets/images/background/cat-dog-hero.webp"

export default function Hero() {
  const { t } = useTranslation()
  return (
    <div className=" bg-primary  pt-12">
      <div className=" md:container flex md:flex-row flex-col items-center justify-between">
        <div className="px-4 ">
          <h1 className=" text-white font-semibold  text-6xl">{t("mainHeroText")}</h1>
          <p className="font-medium  text-2xl text-white py-5">{t("mainHeroParagraph")}</p>
        </div>
        <img className=" md:aspect-auto" src={HeroImage} alt="Hero"  />
      </div>
    </div>
  )
}
