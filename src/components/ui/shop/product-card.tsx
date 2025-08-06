import { Heart, ShoppingCart, Star, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"

interface ProductCardProps extends ProductData {
  handleToggleFavorite?: () => void
  handleToggleCart?: () => void
  isFav?: boolean
  isLoading?: boolean
  isLoadingCart?: boolean
  isCart?: boolean
  sourcePage?: "shope" | "fav" | "cart"
}

export default function ProductCard({
  name,
  desc,
  price,
  priceAfterDiscount,
  discount,
  productImage,
  sourcePage,
  handleToggleFavorite,
  handleToggleCart,
  isFav,
  isLoading = false,
  isLoadingCart = false,
  isCart,
}: ProductCardProps) {
  const renderFavoriteButton = () => (
    <button
      onClick={handleToggleFavorite}
      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-red-500 border-t-transparent animate-spin rounded-full" />
      ) : sourcePage === "fav" ? (
        <Trash className="text-red-400" />
      ) : (
        <Heart className={`w-5 h-5 ${isFav ? "text-red-400 fill-red-400" : "text-gray-600"}`} />
      )}
    </button>
  )

  const renderCartButton = () => (
    <Button
      onClick={handleToggleCart}
      variant="ghost"
      size="icon"
      className="rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
    >
      {isLoadingCart ? (
        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent animate-spin rounded-full" />
      ) : sourcePage === "cart" ? (
        <Trash className="text-red-500" />
      ) : (
        <ShoppingCart className={`w-5 h-5 ${isCart ? "text-red-400 fill-red-400" : "text-gray-600"}`} />
      )}
    </Button>
  )

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img src={productImage || "/placeholder-product.jpg"} alt={name} className="w-full h-48 object-cover" />
        {sourcePage !== "cart" && renderFavoriteButton()}
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

          {(sourcePage === "shope" || sourcePage === "cart") && renderCartButton()}
        </div>
      </div>
    </div>
  )
}
