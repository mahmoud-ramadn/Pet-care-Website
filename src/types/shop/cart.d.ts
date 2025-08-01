// نوع المنتج داخل السلة
type Product = {
  _id: string
  name: string
  desc: string
  quantity: number
  price: number
  discount: number
  productImage: string
  category: string
  user: string
  createdAt: string // ISO timestamp
  updatedAt: string // ISO timestamp
  priceAfterDiscount: number
  __v: number
}

// عنصر السلة (product + quantity + price)
type CartItem = {
  _id: string
  product: Product
  quantity: number
  price: number
}

// نوع السلة الكاملة
type Cart = {
  _id: string
  cartItems: CartItem[]
  user: string
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

// بيانات السلة نفسها
type CartData = {
  _id: string
  cartItems: CartItem[] // ممكن تكون فاضية
  user: string
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

// استجابة API عند عرض السلة
type CartProductResponse = {
  status: "success"
  numOfCartItems: number
  data: Cart
}

// استجابة API عند إضافة منتج للسلة
type AddToCartResponse = {
  status: "success"
  message: string // "Product added to cart successfully"
  numOfCartItems: number
  data: CartData
}
