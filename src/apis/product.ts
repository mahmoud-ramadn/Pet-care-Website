import { apiClient } from "@/lib/api-client"

export const getAllProduct = async (queryString?: string) => {
  let url = "/product/getallproduct"

  if (queryString) {
    const hasSearch = queryString.includes("search")
    const isCategoryAll = queryString.includes("category=All")

    if (hasSearch) {
      // البحث دايمًا بيكون على /getproduct
      url = `/product/getproduct?${queryString}`
    } else if (!isCategoryAll) {
      // لو في فلاتر غير category=All استخدم getallproduct مع الاستعلامات
      url = `/product/getallproduct?${queryString}`
    }
    // لو category=All فقط، استخدم URL الأساسي بدون أي query
  }

  const response = await apiClient<ApiResponse<ProductData>>({
    url,
    method: "GET",
    auth: false,
  })

  return response
}

export const addFavoriteProduct = async (productId: string) => {
  const response = await apiClient<AddToFavoriteResponse>({
    url: `fav/addfav?productId=${productId}`,
    method: "PATCH",
    auth: true,
  })

  return response
}
export const addCartProduct = async (productId: string) => {
  const response = await apiClient<AddToCartResponse>({
    url: `cart/addproduct?productId=${productId}`,
    method: "PATCH",
    auth: true,
  })

  return response
}

export const getFavoriteProducts = async () => {
  const response = await apiClient<ProductsResponse>({
    url: `fav/getfavproduct`,
    method: "GET",
    auth: true,
  })

  return response.data
}
export const getCartProducts = async () => {
  const response = await apiClient<CartProductResponse>({
    url: `cart/getcart`,
    method: "GET",
    auth: true,
  })

  return response.data.cartItems
}
