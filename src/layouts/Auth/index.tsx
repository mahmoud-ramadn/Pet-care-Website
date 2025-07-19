import { Outlet } from "react-router"

import authImg from "@/assets/images/background/auth.jpg"

export default function AuthLayout() {
  return (
    <div className=" flex  md:flex-row flex-col  h-dvh">
      <div className=" w-full md:h-full sm:h-full   h-fit md:basis-1/2 overflow-hidden">
        <img className=" h-full w-full object-cover" src={authImg} alt="auth" />
      </div>
      <main className=" md:basis-1/2 h-full flex relative items-center   w-full justify-center">
        <img className=" absolute left-1/2 -translate-x-1/2 size-14 top-[5%]" src="/logo.webp" alt="logo" />
        <Outlet  />
      </main>
    </div>
  )
}
