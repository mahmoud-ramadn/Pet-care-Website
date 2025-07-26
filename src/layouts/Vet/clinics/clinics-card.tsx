import { Link } from "react-router"

import { Button } from "@/components/ui/button"

export default function ClinicsCard({ vetImage, vetName, bio, _id }: Readonly<VetDataItem>) {
  return (
    <div className=" flex  flex-col gap-y-4 items-center  justify-center">
      <div className=" border-dashed border-2 rounded-full  p-0.5 border-white">
        <img className=" size-64   border-dashed rounded-full" src={vetImage} alt="item" />
      </div>
      <h3 className=" font-bold text-2xl ">{vetName}</h3>
      <p className=" text-gray-300 text-lg">{bio}</p>
      <Button asChild className="mt-2 rounded-full py-5">
        <Link to={`${_id}`}>View Clinic</Link>
      </Button>
    </div>
  )
}
