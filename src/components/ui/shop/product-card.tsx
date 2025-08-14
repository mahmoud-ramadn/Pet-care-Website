import { Eye, Heart, Minus, Plus, Share2, ShoppingCart, Star, Trash } from "lucide-react"

import { useState } from "react"

import { formatPriceEGP } from "@/lib/FormatPriceEGp"

import { Button } from "@/components/ui/button"

interface ProductCardProps extends ProductData {
  name?: string
  desc?: string
  price?: number
  priceAfterDiscount?: number
  discount?: number
  productImage?: string
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
  rating?: number
  reviewCount?: number
  inStock?: boolean
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
  rating,
  reviewCount,
  inStock,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(initialQuantity)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const updateQuantity = (newQuantity: number) => {
    const clampedQuantity = Math.max(1, Math.min(99, newQuantity))
    setQuantity(clampedQuantity)
    if (handleQuantityChange) {
      handleQuantityChange(clampedQuantity)
    }
  }

  const renderFavoriteButton = () => (
    <button
      onClick={handleToggleFavorite}
      className="absolute top-3 right-3 p-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 group border border-white/20"
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-red-500 border-t-transparent animate-spin rounded-full" />
      ) : sourcePage === "fav" ? (
        <Trash className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
      ) : (
        <Heart
          className={`w-5 h-5 transition-all duration-300 ${
            isFav
              ? "text-red-500 fill-red-500 scale-110"
              : "text-gray-600 group-hover:text-red-500 group-hover:scale-110"
          }`}
        />
      )}
    </button>
  )

  const renderQuickActions = () => (
    <div
      className={`absolute top-3 left-3 flex flex-col gap-2 transition-all duration-300 ${
        isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
      }`}
    >
      <button className="p-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 group">
        <Eye className="w-4 h-4 text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-all" />
      </button>
      <button className="p-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 group">
        <Share2 className="w-4 h-4 text-gray-600 group-hover:text-green-600 group-hover:scale-110 transition-all" />
      </button>
    </div>
  )

  const renderCartButton = () => (
    <Button
      onClick={handleToggleCart}
      variant="ghost"
      size="icon"
      className={`rounded-full shadow-md hover:shadow-lg transition-all duration-300 ${
        isCart
          ? "bg-red-50 hover:bg-red-100 text-red-600"
          : "bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-600"
      }`}
      aria-label={isCart ? "Remove from cart" : "Add to cart"}
      disabled={inStock === false}
    >
      {isLoadingCart ? (
        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent animate-spin rounded-full" />
      ) : sourcePage === "cart" ? (
        <Trash className="w-5 h-5 text-red-500 hover:scale-110 transition-transform" />
      ) : (
        <ShoppingCart
          className={`w-5 h-5 transition-all duration-300 ${isCart ? "text-red-500 fill-red-500" : "text-blue-600"}`}
        />
      )}
    </Button>
  )

  const renderQuantityCounter = () => (
    <div className="flex items-center justify-center gap-3 mt-4 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100">
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-full border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
        onClick={() => updateQuantity(quantity - 1)}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <div className="flex flex-col items-center">
        <span className="text-lg font-bold text-gray-800 min-w-[2rem] text-center">{quantity}</span>
        <span className="text-xs text-gray-500">qty</span>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-full border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
        onClick={() => updateQuantity(quantity + 1)}
        disabled={quantity >= 99}
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )

  const renderStockStatus = () => (
    <div
      className={`absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
        inStock
          ? "bg-green-100 text-green-700 border border-green-200"
          : "bg-red-100 text-red-700 border border-red-200"
      } ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
    >
      {inStock ? "In Stock" : "Out of Stock"}
    </div>
  )

  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 group relative transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <div
          className={`w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 transition-opacity duration-300 ${
            imageLoaded ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-4 border-gray-400 border-t-transparent animate-spin rounded-full" />
          </div>
        </div>

        <img
          src={productImage || "/placeholder-product.jpg"}
          alt={name}
          className={`absolute inset-0 w-full h-64 object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            ;(e.target as HTMLImageElement).src = "/placeholder-product.jpg"
            setImageLoaded(true)
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Discount Badge */}
        {discount && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
            -{discount}%
          </div>
        )}

        {/* Action Buttons */}
        {sourcePage !== "cart" && (
          <>
            {renderFavoriteButton()}
            {renderQuickActions()}
            {renderStockStatus()}
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-xl text-gray-900 line-clamp-2 flex-1 mr-3 leading-tight">{name}</h3>
          {rating && reviewCount && (
            <div className="flex items-center bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-1.5 rounded-full border border-yellow-200 shrink-0">
              <Star className="text-yellow-500 w-4 h-4 fill-current" />
              <span className="ml-1.5 text-sm font-semibold text-gray-800">{rating}</span>
              <span className="ml-1 text-xs text-gray-500">({reviewCount})</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{desc}</p>

        {/* Price and Cart Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            {discount ? (
              <>
                <span className="text-gray-400 text-sm line-through mb-1">{formatPriceEGP(price ?? 0)}</span>
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 text-xl">
                  {formatPriceEGP(priceAfterDiscount ?? 0)}
                  {showQuantityCounter && quantity > 1 && <span className="text-xs ml-2 text-gray-500">(each)</span>}
                </span>
              </>
            ) : (
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 text-xl">
                {formatPriceEGP(price ?? 0)}
                {showQuantityCounter && quantity > 1 && <span className="text-xs ml-2 text-gray-500">(each)</span>}
              </span>
            )}
          </div>

          {(sourcePage === "shope" || sourcePage === "cart") && renderCartButton()}
        </div>

        {/* Quantity Counter */}
        {showQuantityCounter && (
          <>
            {renderQuantityCounter()}
            <div className="mt-4 text-center p-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl border border-blue-100">
              <div className="text-sm text-gray-600 mb-1">Total Amount</div>
              <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {formatPriceEGP((priceAfterDiscount || price || 0) * quantity)}
              </div>
            </div>
          </>
        )}

        {/* Stock indicator for main content */}
        {inStock === false && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm font-medium text-center">Currently out of stock</p>
          </div>
        )}
      </div>
    </div>
  )
}
