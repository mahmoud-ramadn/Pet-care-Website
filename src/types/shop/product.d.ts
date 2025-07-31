type Product = {
  _id?: string
  name?: string
  desc?: string
  category?: string
  price?: number
  discount?: number
  priceAfterDiscount?: number
  productImage?: string
  quantity?: number
  user?: string
  createdAt?: string
  updatedAt?: string
  __v?: number
}

type ProductsResponse = {
  status?: "success" | "error"
  data?: Product[]
}


type AddToFavoriteResponse = {
  status: "success" | "error"
  message: string
  data: string[] 
}
