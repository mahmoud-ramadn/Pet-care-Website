import { Heart, Minus, Plus, ShoppingCart, Star, Trash } from "lucide-react"

import { formatPriceEGP } from "@/lib/FormatPriceEGp"

import { Button } from "@/components/ui/button"
import { useState } from "react"

interface ProductCardProps extends ProductData {
  handleToggleFavorite?: () => void
  handleToggleCart?: () => void
  handleQuantityChange?: (newQuantity: number) => void // New prop for quantity changes
  isFav?: boolean
  isLoading?: boolean
  isLoadingCart?: boolean
  isCart?: boolean
  sourcePage?: "shope" | "fav" | "cart"
  showQuantityCounter?: boolean // Flag to enable/disable counter
  initialQuantity?: number // Initial quantity value
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
  handleQuantityChange,
  isFav,
  isLoading = false,
  isLoadingCart = false,
  isCart,
  showQuantityCounter = false,
  initialQuantity = 1,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(initialQuantity)

  const updateQuantity = (newQuantity: number) => {
    const clampedQuantity = Math.max(1, newQuantity) 
    setQuantity(clampedQuantity)
    if (handleQuantityChange) {
      handleQuantityChange(clampedQuantity)
    }
  }

  const renderFavoriteButton = () => (
    <button
      onClick={handleToggleFavorite}
      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
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
      aria-label={isCart ? "Remove from cart" : "Add to cart"}
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

  const renderQuantityCounter = () => (
    <div className="flex items-center gap-2 mt-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-full"
        onClick={() => updateQuantity(quantity - 1)}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-8 text-center font-medium">{quantity}</span>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-full"
        onClick={() => updateQuantity(quantity + 1)}
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={productImage || "/placeholder-product.jpg"}
          alt={name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            ;(e.target as HTMLImageElement).src = "/placeholder-product.jpg"
          }}
        />
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
                <span className="text-gray-400 line-through mr-2">{formatPriceEGP(price ?? 0)}</span>
                <span className="font-bold text-blue-600">
                  {formatPriceEGP(priceAfterDiscount ?? 0)}
                  {showQuantityCounter && quantity > 1 && <span className="text-xs ml-1">(each)</span>}
                </span>
              </>
            ) : (
              <span className="font-bold text-blue-600">
                {formatPriceEGP(price ?? 0)}
                {showQuantityCounter && quantity > 1 && <span className="text-xs ml-1">(each)</span>}
              </span>
            )}
          </div>

          {(sourcePage === "shope" || sourcePage === "cart") && renderCartButton()}
        </div>

        {showQuantityCounter && (
          <>
            {renderQuantityCounter()}
            <div className="mt-2 text-sm font-medium">
              Total: {formatPriceEGP((priceAfterDiscount || price || 0) * quantity)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
