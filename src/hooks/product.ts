import { parseAsInteger, parseAsString, useQueryStates } from "nuqs"

import { useAsyncRetry } from "react-use"

import { getParamsEncodedQuery } from "@/lib/map"

import { getAllProduct, getCartProducts, getFavoriteProducts } from "@/apis/product"

export const useQuestionsQueryFilterState = () => {
  const [query, setQuery] = useQueryStates({
    category: parseAsString.withDefault(""),
    search: parseAsString.withDefault(""),
    page: parseAsInteger.withDefault(2),
    limit: parseAsInteger.withDefault(8),
  })

  const mutate = (input: Partial<typeof query>) => {
    setQuery({
      ...query,
      ...input,
    })
  }
  return { query, mutate }
}
export const useProducts = () => {
  const { query } = useQuestionsQueryFilterState()

  return useAsyncRetry(async () => {
    const apiParams = {
      category: query.category,
      search: query.search,
      page: query.page,
      limit: query.limit,
    }

    const response = await getAllProduct(getParamsEncodedQuery(apiParams))
    return response.data
  }, [query])
}

export const useFavoriteProducts = () => {
  return useAsyncRetry(async () => {
    const response = await getFavoriteProducts()
    return response
  })
}

export const useCartProducts = () => {
  return useAsyncRetry(async () => {
    const response = await getCartProducts()
    return response
  })
}
