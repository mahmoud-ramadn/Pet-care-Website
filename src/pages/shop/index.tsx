import { ShoppingBagIcon } from "lucide-react"
import { toast } from "sonner"

import { useEffect, useMemo, useState } from "react"

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

import { addFavoriteProduct, getFavoriteProducts } from "@/apis/product"
import { useProducts, useQuestionsQueryFilterState } from "@/hooks/product"
import { useDebouncedInput } from "@/hooks/useDebounceInput"

export default function Shop() {
  const { value: products, loading } = useProducts()
  const { query, mutate } = useQuestionsQueryFilterState()
  const [fav, setFav] = useState<string[]>([])

  const fetchFavorites = async () => {
    try {
      const response = await getFavoriteProducts()
      setFav(response.map((item) => item._id ?? "") as string[])
    } catch (error) {
      console.error("Error fetching favorites", error)
    }
  }

  useEffect(() => {
    fetchFavorites()
  }, [fav.length])

  const {
    value: searchValue,
    handleChange: handleSearchChange,
    setValue: setSearchValue,
  } = useDebouncedInput(300, query.search ?? "")

  const [loadingProductId, setLoadingProductId] = useState<string | null>(null)

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

  const hasMoreProducts = products && products.length >= query.limit

  return (
    <div className="container py-8">
      <section className="text-center mb-12">
        <UiTitle className="mb-4">Discover Amazing Products</UiTitle>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Find exactly what you need from our curated collection of premium items
        </p>

        <div className="relative max-w-2xl my-5 mx-auto">
          <Input
            type="search"
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search for products, brands, or categories..."
            className="w-full pl-10 pr-4 py-6 text-base rounded-lg"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <SelectList
          placeholder="Categories"
          selectedValue={query.category}
          handleValueChange={(value: string) => mutate({ category: value, page: 1 })}
          selectList={["medicine", "food", "toys", "grooming", "accessories"]}
        />
      </section>

      <div className="grid mb-10 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
        {loading && [...Array(query.limit)].map((_, index) => <ProductCardSkeleton key={`skeleton-${index}`} />)}

        {!loading && (!products || products.length === 0) && (
          <div className="col-span-full flex flex-col items-center justify-center py-12 space-y-6">
            <ShoppingBagIcon className="size-48 text-gray-300 animate-pulse" />
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-gray-800">No Products Found</h3>
              <p className="text-gray-500">We couldn't find any matching products</p>
            </div>
          </div>
        )}

        {!loading &&
          products?.map((item) => (
            <ProductCard
              key={item._id}
              {...item}
              isLoading={loadingProductId === item._id}
              isFav={fav.includes(item._id ?? "")}
              handleToggleFavorite={async () => {
                try {
                  setLoadingProductId(item?._id ?? "")
                  await addFavoriteProduct(item?._id ?? "")
                  await fetchFavorites()
                  toast.success("Product updated in favorites")
                } catch (error) {
                  // eslint-disable-next-line no-console
                  console.error("Failed to update favorites:", error)
                } finally {
                  setLoadingProductId(null)
                }
              }}
            />
          ))}
      </div>

      {/* Pagination Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <SelectList
          placeholder="Items per page"
          selectedValue={String(query.limit || 8)}
          handleValueChange={(value: string) => mutate({ limit: Number(value), page: 1 })}
          selectList={["2", "4", "8", "12", "24", "32"]}
        />

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (query.page > 1) mutate({ page: query.page - 1 })
                }}
                className={query.page === 1 ? "opacity-50 cursor-not-allowed" : ""}
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
                >
                  1
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink href="#" isActive onClick={(e) => e.preventDefault()}>
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
                className={!hasMoreProducts ? "opacity-50 cursor-not-allowed" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
