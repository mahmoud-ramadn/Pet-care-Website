import { Heart, ShoppingCart } from "lucide-react"

import { useState } from "react"

import { formatPriceEGP } from "@/lib/FormatPriceEGp"

import { Button } from "../button"

export default function ProductCard({ productImage, name, price, discount, desc }: Readonly<ProductData>) {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <div className="bg-white relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <button
        onClick={toggleFavorite}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-gray-100 transition-colors"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 stroke-red-500" : "stroke-gray-400"}`} size={20} />
      </button>

      <img src={productImage} alt={name} className="w-full h-48 object-cover" />

      <div className="p-4">
        <h5 className="text-lg font-semibold mb-2 line-clamp-1">{name}</h5>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{desc}</p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-primary">{formatPriceEGP(price ?? 0)}</span>
          {discount && <span className="text-sm text-gray-500 line-through">{formatPriceEGP(discount)}</span>}
        </div>

        <Button className="w-full gap-2">
          <ShoppingCart size={18} />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
