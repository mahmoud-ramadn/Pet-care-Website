import { Heart } from "lucide-react"

import { useEffect, useState } from "react"
import { Link } from "react-router"

import { ProductCardSkeleton } from "@/components/ui/feedbacks/product-card-skeleton"
import ProductCard from "@/components/ui/shop/product-card"

import { addFavoriteProduct } from "@/apis/product"
import { useFavoriteProducts } from "@/hooks/product"

export default function Fav() {
  const { value, loading } = useFavoriteProducts()
  const [products, setProducts] = useState<Product[]>([])
  const [loadingIds, setLoadingIds] = useState<string[]>([])

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
          <ProductCard
            handleToggleFavorite={async () => {
              setLoadingIds((prev) => [...prev, product._id ?? ""])
              try {
                await addFavoriteProduct(product._id ?? "")
                setProducts((prev) => prev.filter((p) => p._id !== product._id))
              } catch (error) {
                console.error("Failed to update favorites:", error)
              } finally {
                setLoadingIds((prev) => prev.filter((id) => id !== product._id))
              }
            }}
            isFav={true}
            {...product}
            isLoading={loadingIds.includes(product._id ?? "")}
            key={product._id}
          />
        ))}
      </div>
    </div>
  )
}
