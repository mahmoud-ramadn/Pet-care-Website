interface ProductData {
  handleToggleFavorite?: () => void
  handleToggleCart?: () => void
  _id?: string
  name?: string
  desc?: string
  price?: number
  discount?: number
  priceAfterDiscount?: number
  quantity?: number
  category?: string
  productImage?: string
  user?: string
  createdAt?: string
  updatedAt?: string
  __v?: number
}

 interface ProducTTable {
  _id: string
  name: string
  desc: string
  category: string
  price: number
  discount: number
  priceAfterDiscount: number
  quantity: number
  productImage: string
  user: string
  createdAt: string // ISO Date String
  updatedAt: string // ISO Date String
  __v: number
}
