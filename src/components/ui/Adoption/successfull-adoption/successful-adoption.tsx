import { adoptedPetsMock } from "@/Constants/main"

import SwiperWrapper from "../../SwiperWrapper"
import { Button } from "../../button"
import UiTitle from "../../ui-title"
import SuccessfullAdoptionCard from "./successfull-adoption-card"

export default function SuccessfulAdoptions() {
  return (
    <div className="  bg-primary my-20 py-14">
      <div className=" container text-center">
        <UiTitle className=" text-white">Successful Adoptions</UiTitle>
        <p className=" text-gray-300 py-5 text-2xl">Slide to see some of the animals we helped rehome in Egypt</p>
        <SwiperWrapper isNavigation preview={4} className=" my-10">
          {adoptedPetsMock.map((item) => (
            <SuccessfullAdoptionCard {...item} />
          ))}
        </SwiperWrapper>
        <Button className=" bg-white  hover:bg-white/70  rounded-full text-primary font-semibold text-lg">
          See More
        </Button>
      </div>
    </div>
  )
}
