import { Heart, Minus, Plus, ShoppingCart, Star, Trash } from "lucide-react"

import { useState } from "react"

import { formatPriceEGP } from "@/lib/FormatPriceEGp"

import { Button } from "@/components/ui/button"

interface ProductCardProps extends ProductData {
  handleToggleFavorite?: () => void
  handleToggleCart?: () => void
  handleQuantityChange?: (newQuantity: number) => void
  isFav?: boolean
  isLoading?: boolean
  isLoadingCart?: boolean
  isCart?: boolean
  sourcePage?: "shope" | "fav" | "cart"
  showQuantityCounter?: boolean
  initialQuantity?: number
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
      className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200 group"
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-red-500 border-t-transparent animate-spin rounded-full" />
      ) : sourcePage === "fav" ? (
        <Trash className="text-red-500 group-hover:scale-110 transition-transform" />
      ) : (
        <Heart
          className={`w-5 h-5 transition-all ${isFav ? "text-red-500 fill-red-500" : "text-gray-600 group-hover:text-red-400"}`}
        />
      )}
    </button>
  )

  const renderCartButton = () => (
    <Button
      onClick={handleToggleCart}
      variant="ghost"
      size="icon"
      className="rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 shadow-sm hover:shadow-md transition-all"
      aria-label={isCart ? "Remove from cart" : "Add to cart"}
    >
      {isLoadingCart ? (
        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent animate-spin rounded-full" />
      ) : sourcePage === "cart" ? (
        <Trash className="text-red-500 hover:scale-110 transition-transform" />
      ) : (
        <ShoppingCart
          className={`w-5 h-5 transition-colors ${isCart ? "text-red-500 fill-red-500" : "text-blue-600"}`}
        />
      )}
    </Button>
  )

  const renderQuantityCounter = () => (
    <div className="flex items-center gap-3 mt-3">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-full border-gray-300 hover:border-blue-500 hover:text-blue-600"
        onClick={() => updateQuantity(quantity - 1)}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
      >
        <Minus className="h-3 w-3" />
      </Button>
      <span className="w-8 text-center font-medium text-gray-800">{quantity}</span>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-full border-gray-300 hover:border-blue-500 hover:text-blue-600"
        onClick={() => updateQuantity(quantity + 1)}
        aria-label="Increase quantity"
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  )

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 border border-gray-100 hover:border-gray-200 group">
      <div className="relative">
        <img
          src={productImage || "/placeholder-product.jpg"}
          alt={name}
          className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            ;(e.target as HTMLImageElement).src = "/placeholder-product.jpg"
          }}
        />
        {discount && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
        {sourcePage !== "cart" && renderFavoriteButton()}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">{name}</h3>
          <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
            <Star className="text-yellow-400 w-4 h-4" fill="currentColor" />
            <span className="ml-1 text-sm text-gray-700">4.5</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{desc}</p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {discount ? (
              <>
                <span className="text-gray-400 text-sm line-through">{formatPriceEGP(price ?? 0)}</span>
                <span className="font-bold text-blue-600 text-lg">
                  {formatPriceEGP(priceAfterDiscount ?? 0)}
                  {showQuantityCounter && quantity > 1 && <span className="text-xs ml-1">(each)</span>}
                </span>
              </>
            ) : (
              <span className="font-bold text-blue-600 text-lg">
                {formatPriceEGP(price ?? 0)}
                {showQuantityCounter && quantity > 1 && <span className="text-xs ml-1">(each)</span>}
              </span>
            )}
          </div>

          {(sourcePage === "shope" || sourcePage === "cart") && renderCartButton()}
        </div>

        {showQuantityCounter && (
          <div className="mt-4">
            {renderQuantityCounter()}
            <div className="mt-3 text-sm font-medium bg-blue-50 text-blue-700 py-2 px-3 rounded-lg">
              Total: {formatPriceEGP((priceAfterDiscount || price || 0) * quantity)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
