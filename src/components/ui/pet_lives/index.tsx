import { useTranslation } from "react-i18next"

import imagePetLive from "@/assets/images/background/home-section.webp"

export default function PetLives() {
  const { t } = useTranslation()

  return (
    <div className=" mt-20 container flex items-center lg:flex-row  flex-col  md:gap-16 gap-10  justify-between">
      <div className=" md:basis-1/2 overflow-hidden">
        <img className="w-full object-cover" src={imagePetLive} alt="PetLive" />
      </div>
      <div className=" md:basis-1/2  space-y-6">
        <h2 className=" font-bold text-4xl">{t("petLives.title")}</h2>
        <p className="  text-xl   text-black/70">{t("petLives.desc1")}</p>
        <p className=" text-xl   text-black/70">{t("petLives.desc2")}</p>
      </div>
    </div>
  )
}
