import { Grid3X3, Heart, List, Search, ShoppingBag, Sparkles, Star, Zap } from "lucide-react"
import { toast } from "sonner"

import { useEffect, useState } from "react"

// import { Link } from "react-router" // Simulated for demo

import Empty from "@/components/ui/animations/empty"
import { ProductCardSkeleton } from "@/components/ui/feedbacks/product-card-skeleton"
import ProductCard from "@/components/ui/shop/product-card"

import { addFavoriteProduct } from "@/apis/product"
import { useFavoriteProducts } from "@/hooks/product"

export default function Fav() {
  const { value, loading } = useFavoriteProducts()
  const [products, setProducts] = useState<Product[]>([])
  const [loadingIds, setLoadingIds] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "price" | "date">("date")

  useEffect(() => {
    if (value) setProducts(value)
  }, [value])

  // Filter and sort products based on search and sort criteria
  const filteredProducts = products
    ?.filter(
      (product) =>
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.desc?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    ?.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return (a.name || "").localeCompare(b.name || "")
        case "price":
          return (a.price || 0) - (b.price || 0)
        case "date":
        default:
          return 0 // Default order
      }
    })

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="p-4 animate-pulse">
                <ProductCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!products?.length) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="relative max-w-2xl mx-auto px-6">
          {/* Animated background elements */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

          <div className="relative bg-background/80 backdrop-blur-sm rounded-3xl p-12 text-center shadow-2xl border border-border/20">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-2xl opacity-20 scale-150"></div>
              <div className="relative w-32 h-32 mx-auto bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full flex items-center justify-center">
                <Empty className="text-foreground/40 w-16 h-16" />
                <Heart className="absolute -top-2 -right-2 w-8 h-8 text-pink-500 animate-pulse" />
              </div>
            </div>

            <h3 className="text-3xl font-bold text-foreground mb-4">No Favorites Yet</h3>
            <p className="text-foreground/80 mb-8 text-lg max-w-md mx-auto">
              Start building your wishlist by adding products you love to your favorites!
            </p>

            <div className="space-y-4">
              <a
                href="/shop"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
              >
                <ShoppingBag className="w-5 h-5" />
                Discover Products
                <Sparkles className="w-5 h-5" />
              </a>

              <div className="flex items-center justify-center gap-6 text-sm text-foreground/70 mt-6">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-pink-500" />
                  <span>Save favorites</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Easy access</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span>Quick purchase</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-background/80 backdrop-blur-sm border border-border/20 rounded-3xl p-8 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur-lg opacity-30"></div>
                  <div className="relative p-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-foreground">Your Favorites</h1>
                  <p className="text-foreground/70 mt-1">
                    {filteredProducts?.length} {filteredProducts?.length === 1 ? "product" : "products"} in your
                    wishlist
                  </p>
                </div>
              </div>

              {/* Search and Controls */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/60 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search favorites..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-3 bg-background/60 backdrop-blur-sm border border-border rounded-xl text-foreground focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all w-full sm:w-64"
                  />
                </div>

                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "name" | "price" | "date")}
                    className="px-4 py-3 bg-background/60 backdrop-blur-sm border border-border rounded-xl text-foreground focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="name">Sort by Name</option>
                    <option value="price">Sort by Price</option>
                  </select>

                  <button
                    onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                    className="p-3 bg-background/60 backdrop-blur-sm border border-border rounded-xl hover:bg-background/80 transition-all"
                  >
                    {viewMode === "grid" ? <List className="w-5 h-5" /> : <Grid3X3 className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div
          className={`grid gap-8 ${
            viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"
          }`}
        >
          {filteredProducts?.map((product, index) => (
            <div
              key={product._id}
              className="group relative animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-2 shadow-lg transform group-hover:scale-110 transition-transform duration-200">
                <Heart className="w-4 h-4 text-white fill-current" />
              </div>

              <div className="relative bg-background rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-border hover:border-blue-300/40 transform hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600/5 via-purple-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <ProductCard
                  sourcePage="fav"
                  handleToggleFavorite={async () => {
                    setLoadingIds((prev) => [...prev, product._id ?? ""])
                    try {
                      await addFavoriteProduct(product._id ?? "")
                      setProducts((prev) => prev.filter((p) => p._id !== product._id))
                      toast.success("Product removed from favorites")
                    } catch (error) {
                      console.error("Failed to update favorites:", error)
                      toast.error("Failed to remove from favorites")
                    } finally {
                      setLoadingIds((prev) => prev.filter((id) => id !== product._id))
                    }
                  }}
                  {...product}
                  isLoading={loadingIds.includes(product._id ?? "")}
                  isLoadingCart={false}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Footer Section */}
        {filteredProducts?.length > 0 && (
          <div className="mt-16 text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 to-purple-600/10 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Love More Products?</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Continue exploring our collection to find more amazing products you'll love.
                </p>
                <a
                  href="/shop"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transform hover:scale-105 transition-all duration-200 shadow-xl"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Browse More Products
                  <Sparkles className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
