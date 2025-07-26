import { Heart } from "lucide-react"

export default function TopCollectionsCard({ petImage, name, type }: Readonly<PetItem>) {
  return (
    <div className=" rounded-lg overflow-hidden  shadow-2xl relative">
      <button className=" absolute top-2 right-2">
        <Heart className=" fill-red-400" />
      </button>
      <img className=" w-full h-[200px]  object-cover " src={petImage} alt="Animal-Pic" />
      <div className="p-3">
        <h3 className=" text-primary text-xl">{name}</h3>
        <p className="  text-sm text-gray-500">{type}</p>
      </div>
    </div>
  )
}
