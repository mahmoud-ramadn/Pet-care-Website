import { Link } from "react-router"

import { useSuccessfulAdoption } from "@/hooks/pet"

import SwiperWrapper from "../../SwiperWrapper"
import UiTitle from "../../ui-title"
import SuccessfullAdoptionCard from "./successfull-adoption-card"

export default function SuccessfulAdoptions() {
  const { value: adoptions } = useSuccessfulAdoption()

  const adoptionList = adoptions?.data?.slice(0, 10) ?? []

  return (
    <div className="bg-primary my-20 py-14">
      <div className="container text-center">
        <UiTitle className="text-white">Successful Adoptions</UiTitle>
        <p className="text-gray-300 py-5 text-2xl">Slide to see some of the animals we helped rehome in Egypt</p>

        {adoptionList.length > 0 ? (
          <SwiperWrapper isNavigation preview={4} className="my-10">
            {adoptionList.map((item) => (
              <SuccessfullAdoptionCard key={item._id} {...item} />
            ))}
          </SwiperWrapper>
        ) : (
          <p className="text-white py-10">No successful adoptions yet.</p>
        )}

        <Link
          to={"SuccessfulAdopted"}
          className="bg-white hover:bg-white/70 px-10 rounded-full text-primary font-semibold text-lg"
        >
          See More
        </Link>
      </div>
    </div>
  )
}
