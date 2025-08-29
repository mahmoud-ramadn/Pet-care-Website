import { HomNavigationLink } from "@/Constants/main"

import SwiperWrapper from "../SwiperWrapper"
import SquareNavigation from "../common/squer-nav"
import { useTranslation } from "react-i18next"

export default function SquiresNav() {
  const {t}=useTranslation()
  return (
    <div className=" container my-20 p p-10">
      <SwiperWrapper preview={4} className="rounded-lg p-3">
        {HomNavigationLink.map((item) => (
          <SquareNavigation
            key={item.id}
            path={item.path}
            className={` flex items-center  text-primary m-1    flex-col p-10 gap-10      }`}
            title={t(item.label)}
            image={item.image}
          />
        ))}
      </SwiperWrapper>
    </div>
  )
}
