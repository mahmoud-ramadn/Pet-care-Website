import { Link } from "react-router"

import { Button } from "@/components/ui/button"

export default function CircleCard({ doctorImage, name, description, _id, viewBtm = true }: Readonly<Doctor>) {
  return (
    <div className="flex flex-col gap-y-4 items-center justify-center">
      <div className="border-dashed border-2 rounded-full p-0.5 border-white">
        <img className="size-64 border-dashed rounded-full object-cover" src={doctorImage} alt={`Dr. ${name}`} />
      </div>
      <h3 className="font-bold text-2xl text-center">{name}</h3>
      <p className="text-gray-300 text-lg text-center">{description}</p>
      {viewBtm && (
        <Button asChild className="mt-2 rounded-full py-5">
          <Link to={`${_id}`}>View Doctor</Link>
        </Button>
      )}
    </div>
  )
}
