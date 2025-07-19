import {  HomNavigationLink } from "@/Constants/main";
import SwiperWrapper from "../SwiperWrapper";
import SquareNavigation from "../common/squer-nav";

export default function SquiresNav() {
  return (
    <div className=" container my-20">
      <SwiperWrapper preview={5} className=" p-3">
        {HomNavigationLink.map((item) => (
          <SquareNavigation
            key={item.id}
            path={item.path}
            className={` flex items-center  text-primary m-1    flex-col p-10 gap-10  bg-white   shadow-lg }`}
            title={item.path}
            image={item.image}
          />
        ))}
      </SwiperWrapper>
    </div>
  )
}
