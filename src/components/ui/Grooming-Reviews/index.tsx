import { useTranslation } from "react-i18next"

import { GroomingReviewsMock } from "@/Constants/main"

import SwiperWrapper from "../SwiperWrapper"
import UiTitle from "../ui-title"
import GroomingCard from "./GroomingCard"

export default function GroomingReviews() {
  const { t } = useTranslation()
  return (
    <div className=" container my-20">
      <UiTitle className=" my-4">{t("groomingReview")}</UiTitle>
      <SwiperWrapper isNavigation preview={4}>
        {GroomingReviewsMock.map((item, ) => (
          <GroomingCard  {...item} />
        ))}
      </SwiperWrapper>
    </div>
  )
}
