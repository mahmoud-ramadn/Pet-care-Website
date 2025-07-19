import { Star } from "lucide-react"

import { Button } from "../button"


export default function ShelterCard({ image, title, address, time, rate }: Readonly<ShelterCardType>) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-stretch gap-6 p-6">
      <div className="flex-shrink-0 w-32 h-32 overflow-hidden rounded-lg">
        <img
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          src={image}
          alt={title}
        />
      </div>

      <div className="flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-2xl font-semibold mb-2 line-clamp-1">{title}</h3>

          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className={i < rate ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
            ))}
            <span className="text-sm text-gray-500 ml-1">({rate}.0)</span>
          </div>

          <p className="text-gray-500 mb-4">
            <span className="font-medium">Opens {time}</span> • {address}
          </p>
        </div>

        <Button className="rounded-full w-fit px-6 hover:bg-primary/90 transition-colors">View Pets</Button>
      </div>
    </div>
  )
}
