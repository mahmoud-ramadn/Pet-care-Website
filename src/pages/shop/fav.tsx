import { Heart, ShoppingCart, Star } from "lucide-react"

import { useEffect, useState } from "react"
import { Link } from "react-router"

import { ProductCardSkeleton } from "@/components/ui/feedbacks/product-card-skeleton"

import { addFavoriteProduct } from "@/apis/product"
import { useFavoriteProducts } from "@/hooks/product"

export default function Fav() {
  const { value, loading } = useFavoriteProducts()
  const [products, setProducts] = useState<Product[]>([])
  const [loadingIds, setLoadingIds] = useState<string[]>([]) // IDs of products being removed

  useEffect(() => {
    if (value) setProducts(value)
  }, [value])

  if (loading) {
    return (
      <div className=" container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(products?.length || 8)].map((_, index) => (
          <div key={index} className="p-4">
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
    )
  }

  if (!products?.length) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4 flex justify-center">
          <Heart className="text-gray-300 w-12 h-12" />
        </div>
        <h3 className="text-xl font-medium text-gray-700 mb-2">No favorite products yet</h3>
        <p className="text-gray-500 mb-6">You haven't added any products to your favorites list.</p>
        <Link to={"/shop"} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Favorite Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <img
                src={product.productImage || "/placeholder-product.jpg"}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={async () => {
                  setLoadingIds((prev) => [...prev, product?._id ?? ""])
                  try {
                    await addFavoriteProduct(product._id ?? "")
                    setProducts((prev) => prev.filter((p) => p._id !== product._id))
                  } catch (error) {
                    console.error("Failed to update favorites:", error)
                  } finally {
                    setLoadingIds((prev) => prev.filter((id) => id !== product._id))
                  }
                }}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                {loadingIds.includes(product?._id ?? "") ? (
                  <div className="w-5 h-5 border-2 border-red-500 border-t-transparent animate-spin rounded-full" />
                ) : (
                  <Heart className="text-red-500 w-5 h-5" fill="currentColor" />
                )}
              </button>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <div className="flex items-center">
                  <Star className="text-yellow-400 w-4 h-4" fill="currentColor" />
                  <span className="ml-1 text-sm">4.5</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.desc}</p>

              <div className="flex items-center justify-between">
                <div>
                  {product.discount ? (
                    <>
                      <span className="text-gray-400 line-through mr-2">${product.price?.toFixed(2)}</span>
                      <span className="font-bold text-blue-600">${product.priceAfterDiscount?.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="font-bold text-blue-600">${product.price?.toFixed(2)}</span>
                  )}
                </div>

                <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
