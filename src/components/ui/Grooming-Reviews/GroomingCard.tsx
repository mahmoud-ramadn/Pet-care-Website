import { Star } from "lucide-react"

export default function GroomingCard({ image, altImage, serviceName, address, price, ratingNum }: GroomingCardType) {
  return (
    <div className="rounded-3xl border  overflow-hidden">
      <img className=" w-full  max-h-[200px]" src={image} alt={altImage} />
      <div className=" py-5 px-3">
        <div className="flex  items-center">
          {[...Array(ratingNum)].map((_, i) => (
            <Star key={i} className=" fill-yellow-500" />
          ))}
        </div>
        <p className=" font-medium py-2  text-gray-400">{serviceName}</p>

        <p className=" flex items-center  font-medium text-sm  justify-between">
          <span>{address}</span>
          <span> from ${price}</span>
        </p>
      </div>
    </div>
  )
}
