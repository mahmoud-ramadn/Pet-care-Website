import { HomNavigationLink } from "@/Constants/main"

import SwiperWrapper from "../SwiperWrapper"
import SquareNavigation from "../common/squer-nav"

export default function SquiresNav() {
  return (
    <div className=" container my-20 p p-10">
      <SwiperWrapper preview={4} className="rounded-lg p-3">
        {HomNavigationLink.map((item) => (
          <SquareNavigation
            key={item.id}
            path={item.path}
            className={` flex items-center  text-primary m-1    flex-col p-10 gap-10      }`}
            title={item.path}
            image={item.image}
          />
        ))}
      </SwiperWrapper>
    </div>
  )
}
