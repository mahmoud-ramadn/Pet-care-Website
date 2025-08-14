import { Filter, Grid, List, Package, Search, ShoppingBagIcon, Star, TrendingUp } from "lucide-react"
import { toast } from "sonner"

import { useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import SelectList from "@/components/ui/common/select"
import { ProductCardSkeleton } from "@/components/ui/feedbacks/product-card-skeleton"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import ProductCard from "@/components/ui/shop/product-card"
import UiTitle from "@/components/ui/ui-title"

import { addCartProduct, addFavoriteProduct, getCartProducts, getFavoriteProducts } from "@/apis/product"
import { useProducts, useQuestionsQueryFilterState } from "@/hooks/product"
import { useDebouncedInput } from "@/hooks/useDebounceInput"

export default function Shop() {
  const { value: products, loading } = useProducts()
  const { query, mutate } = useQuestionsQueryFilterState()
  const [fav, setFav] = useState<string[]>([])
  const [cart, setCart] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const fetchFavorites = async () => {
    try {
      const response = await getFavoriteProducts()
      setFav(response?.map((item) => item?._id ?? "") || [])
    } catch (error) {
      console.error("Error fetching favorites", error)
    }
  }

  const fetchCarts = async () => {
    try {
      const response = await getCartProducts()
      setCart(response?.map((item) => item.product._id ?? "") || [])
    } catch (error) {
      console.error("Error fetching favorites", error)
    }
  }

  useEffect(() => {
    fetchFavorites()
    fetchCarts()
  }, [])

  const {
    value: searchValue,
    handleChange: handleSearchChange,
    setValue: setSearchValue,
  } = useDebouncedInput(300, query.search ?? "")

  const [loadingProductId, setLoadingProductId] = useState<string | null>(null)
  const [loadingCartProductId, setLoadingCartProductId] = useState<string | null>(null)

  useEffect(() => {
    if (query.search !== searchValue) {
      setSearchValue(query.search ?? "")
    }
  }, [query.search, searchValue, setSearchValue])

  useMemo(() => {
    if (searchValue !== query.search) {
      mutate({ search: searchValue, page: 1 })
    }
  }, [searchValue, query.search, mutate])

  const hasMoreProducts = products && products.data.length >= query.limit

  const categories = [
    { value: "medicine", label: "أدوية", icon: "💊" },
    { value: "food", label: "طعام", icon: "🍖" },
    { value: "toys", label: "ألعاب", icon: "🧸" },
    { value: "grooming", label: "عناية", icon: "✂️" },
    { value: "accessories", label: "إكسسوارات", icon: "🎀" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 -translate-y-48 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 translate-y-32 blur-3xl" />
        </div>

        <div className="container relative z-10 py-20">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white/90 text-sm font-medium mb-4">
              <ShoppingBagIcon className="w-4 h-4" />
              <span>متجر الحيوانات الأليفة</span>
            </div>

            <UiTitle className="text-5xl lg:text-6xl font-bold text-white drop-shadow-xl">اكتشف منتجات مذهلة</UiTitle>

            <p className="text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
              اعثر على كل ما تحتاجه لحيوانك الأليف من مجموعتنا المختارة من المنتجات المميزة
            </p>

            {/* Featured Stats */}
            <div className="flex justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{products?.data?.length || 0}</div>
                <div className="text-indigo-200 text-sm">منتج</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">5.0</div>
                <div className="text-indigo-200 text-sm">تقييم</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">2K+</div>
                <div className="text-indigo-200 text-sm">عميل سعيد</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        {/* Enhanced Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-12 -mt-20 relative z-10">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="ابحث عن المنتجات، العلامات التجارية، أو الفئات..."
                className="w-full pl-12 pr-4 py-4 text-base rounded-xl border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-lg"
              />
            </div>
          </div>

          {/* Filters and Controls */}
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Category Pills */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-gray-700 font-medium flex items-center gap-2">
                <Filter className="w-4 h-4" />
                الفئات:
              </span>
              <Button
                variant={!query.category ? "default" : "outline"}
                size="sm"
                onClick={() => mutate({ category: "", page: 1 })}
                className="rounded-full transition-all duration-300"
              >
                الكل
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={query.category === cat.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => mutate({ category: cat.value, page: 1 })}
                  className={`rounded-full transition-all duration-300 ${
                    query.category === cat.value
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg"
                      : "hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200"
                  }`}
                >
                  <span className="mr-2">{cat.icon}</span>
                  {cat.label}
                </Button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium">عرض:</span>
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-white/50"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-white/50"
                  }`}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Search Results Info */}
          {searchValue && (
            <div className="mt-6 p-4 bg-indigo-50 rounded-xl">
              <p className="text-indigo-700">
                تم العثور على <span className="font-semibold">{products?.data?.length || 0}</span> منتج يحتوي على "
                {searchValue}"
              </p>
            </div>
          )}
        </div>

        {/* Featured Products Section */}
        {!loading && products && !searchValue && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-900">المنتجات الأكثر مبيعاً</h2>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.data.slice(0, 3).map((product, index) => (
                  <div
                    key={product._id}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-center w-10 h-10 bg-orange-500 text-white rounded-full font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="text-sm text-gray-600">4.8</span>
                        </div>
                        <span className="text-orange-600 font-bold">${product.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div
          className={`mb-10 ${
            viewMode === "grid" ? "grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8" : "space-y-4"
          }`}
        >
          {loading &&
            [...Array(query.limit)].map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="transform transition-all duration-500 opacity-0 animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
              >
                <ProductCardSkeleton />
              </div>
            ))}

          {!loading && (!products || products.data.length === 0) && (
            <div className="col-span-full">
              <div className="text-center py-20">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {searchValue ? "لم نجد منتجات تطابق بحثك" : "لا توجد منتجات متاحة"}
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  {searchValue
                    ? "جرب استخدام كلمات مختلفة أو تصفح الفئات المتاحة"
                    : "سنقوم بإضافة منتجات جديدة قريباً. تابع معنا للحصول على أحدث المنتجات"}
                </p>
                {searchValue && (
                  <Button
                    onClick={() => {
                      handleSearchChange("")
                      mutate({ search: "", page: 1 })
                    }}
                    className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
                  >
                    مسح البحث
                  </Button>
                )}
              </div>
            </div>
          )}

          {!loading &&
            products?.data?.map((item, index) => (
              <div
                key={item?._id}
                className="transform transition-all duration-500 opacity-0 animate-fadeIn hover:scale-105"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
              >
                <ProductCard
                  {...item}
                  sourcePage="shope"
                  isLoading={loadingProductId === item?._id}
                  isLoadingCart={loadingCartProductId === item?._id}
                  isFav={fav.includes(item?._id ?? "")}
                  isCart={cart.includes(item?._id ?? "")}
                  handleToggleFavorite={async () => {
                    try {
                      setLoadingProductId(item?._id ?? "")
                      await addFavoriteProduct(item?._id ?? "")
                      await fetchFavorites()
                      toast.success("تم تحديث المنتج في المفضلة")
                    } catch (error) {
                      console.error("Failed to update favorites:", error)
                      toast.error("فشل في تحديث المفضلة")
                    } finally {
                      setLoadingProductId(null)
                    }
                  }}
                  handleToggleCart={async () => {
                    try {
                      setLoadingCartProductId(item._id ?? "")
                      await addCartProduct(item?._id ?? "")
                      await fetchCarts()
                      toast.success("تم تحديث المنتج في السلة")
                    } catch (error) {
                      console.error("Failed to update cart:", error)
                      toast.error("فشل في تحديث السلة")
                    } finally {
                      setLoadingCartProductId(null)
                    }
                  }}
                />
              </div>
            ))}
        </div>

        {/* Enhanced Pagination Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            {/* Items Per Page */}
            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium">عدد العناصر في الصفحة:</span>
              <div className="min-w-[120px]">
                <SelectList
                  placeholder="اختر العدد"
                  selectedValue={String(query.limit || 8)}
                  handleValueChange={(value: string) => mutate({ limit: Number(value), page: 1 })}
                  selectList={["2", "4", "8", "12", "24", "32"]}
                />
              </div>
            </div>

            {/* Pagination */}
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (query.page > 1) mutate({ page: query.page - 1 })
                    }}
                    className={`rounded-xl transition-all duration-300 ${
                      query.page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                  />
                </PaginationItem>

                {query.page > 1 && (
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        mutate({ page: 1 })
                      }}
                      className="rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300"
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive
                    onClick={(e) => e.preventDefault()}
                    className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl"
                  >
                    {query.page}
                  </PaginationLink>
                </PaginationItem>

                {hasMoreProducts && (
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        mutate({ page: query.page + 1 })
                      }}
                      className="rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300"
                    >
                      {query.page + 1}
                    </PaginationLink>
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (hasMoreProducts) mutate({ page: query.page + 1 })
                    }}
                    className={`rounded-xl transition-all duration-300 ${
                      !hasMoreProducts ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

            {/* Results Info */}
            <div className="text-sm text-gray-600">
              صفحة {query.page} من {Math.ceil((products?.data?.length || 0) / query.limit)} صفحات
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}
