import { Heart, ShoppingCart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"

interface ProductCardProps extends Product {
  handleToggleFavorite: () => void
  isLoading?: boolean
}

export default function ProductCard({
  name,
  desc,
  price,
  priceAfterDiscount,
  discount,
  productImage,
  handleToggleFavorite,
  isLoading,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img src={productImage || "/placeholder-product.jpg"} alt={name} className="w-full h-48 object-cover" />
        <button
          onClick={handleToggleFavorite}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
        >
          {isLoading ? (
            <div className="w-5 h-5 animate-spin border-2 border-red-500 border-t-transparent rounded-full" />
          ) : (
            <Heart className=" text-gray-500 w-5 h-5" fill="currentColor" />
          )}
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{name}</h3>
          <div className="flex items-center">
            <Star className="text-yellow-400 w-4 h-4" fill="currentColor" />
            <span className="ml-1 text-sm">4.5</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{desc}</p>

        <div className="flex items-center justify-between">
          <div>
            {discount ? (
              <>
                <span className="text-gray-400 line-through mr-2">${price?.toFixed(2)}</span>
                <span className="font-bold text-blue-600">${priceAfterDiscount?.toFixed(2)}</span>
              </>
            ) : (
              <span className="font-bold text-blue-600">${price?.toFixed(2)}</span>
            )}
          </div>
          <Button variant="ghost" size="icon" className="rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200">
            <ShoppingCart className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
