import {
  Eye,
  Filter,
  Grid,
  Heart,
  List,
  Package,
  Search,
  ShoppingBagIcon,
  ShoppingCart,
  Star,
  TrendingUp,
} from "lucide-react"
import { toast } from "sonner"

import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

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
  const { t, i18n } = useTranslation()
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
      setCart(response.cartItems?.map((item) => item.product._id ?? "") || [])
    } catch (error) {
      console.error("Error fetching favorites", error)
    }
  }

  useEffect(() => {
    fetchFavorites()
    fetchCarts()

    // Set initial document direction based on current language
    const currentLang = i18n.language || "en"
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = currentLang
  }, [i18n.language])

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
    { value: "medicine", label: t("shop.filters.medicine"), icon: "💊", color: "from-red-500 to-pink-500" },
    { value: "food", label: t("shop.filters.food"), icon: "🍖", color: "from-orange-500 to-yellow-500" },
    { value: "toys", label: t("shop.filters.toys"), icon: "🧸", color: "from-blue-500 to-cyan-500" },
    { value: "grooming", label: t("shop.filters.grooming"), icon: "✂️", color: "from-purple-500 to-indigo-500" },
    { value: "accessories", label: t("shop.filters.accessories"), icon: "🎀", color: "from-pink-500 to-rose-500" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 -translate-y-48 blur-3xl animate-pulse" />
          <div
            className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full -translate-x-32 translate-y-32 blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/3 left-1/2 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-20 left-10 w-4 h-4 bg-white/30 rounded-full animate-bounce"
            style={{ animationDelay: "0s", animationDuration: "3s" }}
          />
          <div
            className="absolute top-32 right-20 w-3 h-3 bg-white/40 rounded-full animate-bounce"
            style={{ animationDelay: "1s", animationDuration: "3s" }}
          />
          <div
            className="absolute bottom-40 left-1/4 w-5 h-5 bg-white/20 rounded-full animate-bounce"
            style={{ animationDelay: "2s", animationDuration: "3s" }}
          />
          <div
            className="absolute top-2/3 right-1/3 w-2 h-2 bg-white/50 rounded-full animate-bounce"
            style={{ animationDelay: "0.5s", animationDuration: "3s" }}
          />
        </div>

        <div className="container relative z-10 py-24">
       
          <div className="text-center space-y-8 max-w-5xl mx-auto">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/15 backdrop-blur-xl rounded-full border border-white/30 text-white/95 text-sm font-semibold mb-6 shadow-xl">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <ShoppingBagIcon className="w-5 h-5" />
              <span>{t("shop.hero.badge")}</span>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            </div>

            {/* Main Title with Enhanced Typography */}
            <div className="space-y-4">
              <UiTitle className="text-6xl lg:text-7xl xl:text-8xl font-black text-white drop-shadow-2xl leading-tight">
                {t("shop.hero.title")}
                <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
                  {t("shop.hero.titleEmphasis")}
                </span>
              </UiTitle>

              <p className="text-xl lg:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed font-medium">
                {t("shop.hero.subtitle")}
              </p>
            </div>

            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
              <div className="group bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-500">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-black text-white mb-2">{products?.data?.length || 0}+</div>
                <div className="text-purple-200 font-semibold">{t("shop.hero.stats.products")}</div>
              </div>

              <div className="group bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-500">
                  <Star className="w-8 h-8 text-white fill-white" />
                </div>
                <div className="text-4xl font-black text-white mb-2">5.0</div>
                <div className="text-purple-200 font-semibold">{t("shop.hero.stats.rating")}</div>
              </div>

              <div className="group bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-500">
                  <Heart className="w-8 h-8 text-white fill-white" />
                </div>
                <div className="text-4xl font-black text-white mb-2">10K+</div>
                <div className="text-purple-200 font-semibold">{t("shop.hero.stats.customers")}</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Button className="group bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-1">
                <ShoppingCart className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                {t("shop.hero.cta.browse")}
              </Button>
              <Button
                variant="outline"
                className="group border-2 border-white/30 text-white hover:bg-white/10 px-10 py-4 rounded-2xl font-bold text-lg backdrop-blur-xl transition-all duration-300"
              >
                <Eye className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                {t("shop.hero.cta.learnMore")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-16">
        {/* Enhanced Search and Filter Section */}
        <div className="bg-background/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/50 p-10 mb-16 -mt-32 relative z-10">
         
          {/* Search Bar with Enhanced Design */}
          <div className="relative max-w-3xl mx-auto mb-10">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative bg-background rounded-2xl border-2 border-border shadow-lg">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-foreground/60" />
                <Input
                  type="search"
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder={t("shop.search.placeholder")}
                  className="w-full pl-16 pr-6 py-6 text-lg rounded-2xl border-0 focus:ring-2 focus:ring-purple-500/20 focus:outline-none font-medium bg-background text-foreground"
                />
              </div>
            </div>
          </div>

          {/* Enhanced Filters and Controls */}
          <div className="flex flex-col xl:flex-row gap-8 items-center justify-between">
            {/* Category Pills with Gradients */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-foreground font-bold text-lg flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Filter className="w-5 h-5 text-white" />
                </div>
                {t("shop.filters.categories")}
              </span>

              <Button
                variant={!query.category ? "default" : "outline"}
                size="lg"
                onClick={() => mutate({ category: "", page: 1 })}
                className={`rounded-2xl font-semibold px-6 py-3 transition-all duration-300 ${
                  !query.category
                    ? "bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg hover:shadow-xl"
                    : "hover:bg-gray-50 border-2"
                }`}
              >
                {t("shop.filters.allCategories")}
              </Button>

              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={query.category === cat.value ? "default" : "outline"}
                  size="lg"
                  onClick={() => mutate({ category: cat.value, page: 1 })}
                  className={`rounded-2xl font-semibold px-6 py-3 transition-all duration-300 ${
                    query.category === cat.value
                      ? `bg-gradient-to-r ${cat.color} text-white shadow-lg hover:shadow-xl scale-105`
                      : "hover:bg-gray-50 hover:scale-105 border-2"
                  }`}
                >
                  <span className="text-lg mr-2">{cat.icon}</span>
                  {cat.label}
                </Button>
              ))}
            </div>

            {/* Enhanced View Mode Toggle */}
            <div className="flex items-center gap-4">
              <span className="text-foreground font-bold text-lg">{t("shop.filters.viewMode")}</span>
              <div className="flex items-center gap-2 bg-foreground/10 p-2 rounded-2xl">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="lg"
                  onClick={() => setViewMode("grid")}
                  className={`p-4 rounded-xl transition-all duration-300 ${
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105"
                      : "hover:bg-background/80"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="lg"
                  onClick={() => setViewMode("list")}
                  className={`p-4 rounded-xl transition-all duration-300 ${
                    viewMode === "list"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105"
                      : "hover:bg-background/80"
                  }`}
                >
                  <List className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced Search Results Info */}
          {searchValue && (
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <p className="text-blue-800 font-semibold text-lg">
                  {t("shop.search.results")}{" "}
                  <span className="text-2xl font-black text-purple-600">{products?.data?.length || 0}</span>{" "}
                  {t("shop.search.products")} "<span className="text-purple-700 font-black">{searchValue}</span>"
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Featured Products Section */}
        {!loading && products && !searchValue && (
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-black text-foreground">{t("shop.featured.title")}</h2>
              <div className="flex-1 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-20" />
            </div>

            <div className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 rounded-3xl p-8 border-2 border-orange-200/30 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {products.data.slice(0, 3).map((product, index) => (
                  <div
                    key={product._id}
                    className="group flex items-center gap-6 p-6 bg-background/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border/50"
                  >
                    <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-black text-xl group-hover:scale-110 transition-transform duration-300">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground text-lg mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="text-sm font-semibold text-foreground/80">
                            {t("shop.featured.rating")}: 4.8
                          </span>
                        </div>
                        <span className="text-orange-600 font-black text-lg">${product.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Products Grid */}
        <div
          className={`mb-16 ${
            viewMode === "grid"
              ? "grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8"
              : "grid md:grid-cols-2  grid-cols-1 gap-8"
          }`}
        >
          {loading &&
            [...Array(query.limit)].map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="transform transition-all duration-700 opacity-0 animate-fadeIn"
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: "forwards" }}
              >
                <ProductCardSkeleton />
              </div>
            ))}

          {!loading && (!products || products.data.length === 0) && (
            <div className="col-span-full">
              <div className="text-center py-24">
                <div className="w-40 h-40 bg-gradient-to-r from-foreground/10 to-foreground/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <Package className="w-20 h-20 text-foreground/50" />
                </div>
                <h3 className="text-3xl font-black text-foreground mb-4">
                  {searchValue ? t("shop.featured.noSearchResults") : t("shop.featured.noProducts")}
                </h3>
                <p className="text-foreground/80 max-w-lg mx-auto text-lg leading-relaxed">
                  {searchValue ? t("shop.featured.noSearchResultsDesc") : t("shop.featured.noProductsDesc")}
                </p>
                {searchValue && (
                  <Button
                    onClick={() => {
                      handleSearchChange("")
                      mutate({ search: "", page: 1 })
                    }}
                    className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl px-8 py-4 font-bold text-lg shadow-xl"
                  >
                    {t("shop.search.clearSearch")}
                  </Button>
                )}
              </div>
            </div>
          )}

          {!loading &&
            products?.data?.map((item, index) => (
              <div
                key={item?._id}
                className="transform transition-all duration-700 opacity-0 animate-fadeIn hover:scale-[1.02] group"
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: "forwards" }}
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
        <div className="bg-background/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/50 p-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            {/* Items Per Page */}
            <div className="flex items-center gap-4">
              <span className="text-foreground font-bold text-lg">{t("shop.pagination.itemsPerPage")}</span>
              <div className="min-w-[150px]">
                <SelectList
                  placeholder={t("shop.pagination.selectCount")}
                  selectedValue={String(query.limit || 8)}
                  handleValueChange={(value: string) => mutate({ limit: Number(value), page: 1 })}
                  selectList={["2", "4", "8", "12", "24", "32"]}
                />
              </div>
            </div>

            {/* Enhanced Pagination */}
            <Pagination>
              <PaginationContent className="gap-2">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (query.page > 1) mutate({ page: query.page - 1 })
                    }}
                    className={`rounded-2xl px-6 py-3 font-semibold transition-all duration-300 ${
                      query.page === 1
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white hover:shadow-lg"
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
                      className="rounded-2xl px-4 py-3 font-semibold hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300"
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
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 rounded-2xl px-4 py-3 font-bold shadow-lg"
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
                      className="rounded-2xl px-4 py-3 font-semibold hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300"
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
                    className={`rounded-2xl px-6 py-3 font-semibold transition-all duration-300 ${
                      !hasMoreProducts
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white hover:shadow-lg"
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

            {/* Results Info */}
            <div className="text-foreground/80 font-semibold">
              {t("shop.pagination.page")} <span className="text-purple-600 font-black">{query.page}</span>{" "}
              {t("shop.pagination.of")}{" "}
              <span className="text-purple-600 font-black">
                {Math.ceil((products?.data?.length || 0) / query.limit)}
              </span>{" "}
              {t("shop.pagination.pages")}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* RTL Support */
        [dir="rtl"] .rtl-flip {
          transform: scaleX(-1);
        }
        
        [dir="rtl"] .rtl-text-right {
          text-align: right;
        }
        
        [dir="rtl"] .rtl-text-left {
          text-align: left;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out;
        }

        /* Custom scrollbar */

        /* Glass morphism effect */
        .glass {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Gradient text animation */
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
          background-size: 400% 400%;
          animation: gradient-shift 15s ease infinite;
        }

        /* Floating animation */
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        /* Pulse glow effect */
        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
          }
          50% {
            box-shadow:
              0 0 40px rgba(139, 92, 246, 0.6),
              0 0 60px rgba(236, 72, 153, 0.3);
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        /* Card hover effects */
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        /* Button ripple effect */
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }

        .ripple {
          position: relative;
          overflow: hidden;
        }

        .ripple:before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          transform: translate(-50%, -50%);
          transition:
            width 0.6s,
            height 0.6s;
        }

        .ripple:active:before {
          width: 300px;
          height: 300px;
        }
      `}</style>
    </div>
  )
}
