import { ShoppingCart } from "lucide-react"
import { toast } from "sonner"

import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router"

import { formatPriceEGP } from "@/lib/FormatPriceEGp"

import Empty from "@/components/ui/animations/empty"
import { Button } from "@/components/ui/button"
import { ProductCardSkeleton } from "@/components/ui/feedbacks/product-card-skeleton"
import ProductCard from "@/components/ui/shop/product-card"

import { addCartProduct } from "@/apis/product"
import { useCartProducts } from "@/hooks/product"

export default function Cart() {
  const { value, loading } = useCartProducts()
  const [products, setProducts] = useState<CartItem[]>([])
  const [loadingIds, setLoadingIds] = useState<string[]>([])

  const totalPrice = useMemo(() => {
    return products?.reduce((sum, item) => sum + item.price, 0)
  }, [products])

  useEffect(() => {
    if (value) setProducts(value)
  }, [value])

  if (loading) {
    return (
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="p-4">
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <ShoppingCart className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <span className="ml-auto bg-gray-100 px-3 py-1 rounded-full text-sm">
          {products.length} {products.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Products Column */}
        <div className="lg:col-span-3 space-y-6">
          {!products.length ? (
            <div className="border-2 border-dashed rounded-xl p-12 text-center">
              <div className="mx-auto w-32 h-32 mb-6">
                <Empty className="text-gray-300 w-full h-full" />
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">Your Cart is Empty</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                You haven't added any products to your cart yet. Start shopping to find amazing products!
              </p>
              <Button asChild>
                <Link to="/shop" className="text-white">
                  Browse Products
                </Link>
              </Button>
            </div>
          ) : (
            products.map((product) => (
              <ProductCard
                handleToggleCart={async () => {
                  setLoadingIds((prev) => [...prev, product._id])
                  try {
                    await addCartProduct(product.product._id ?? "")
                    setProducts((prev) => prev.filter((p) => p._id !== product._id))
                    toast.success("تمت إزالة المنتج من قائمة السلة بنجاح")
                  } catch (error) {
                    console.error("Failed to update favorites:", error)
                    toast.error("Failed to remove product")
                  } finally {
                    setLoadingIds((pre) => pre.filter((id) => id !== product._id))
                  }
                }}
                {...product.product}
                key={product._id}
                isLoadingCart={loadingIds.includes(product._id ?? "")}
                sourcePage="cart"
                initialQuantity={product.quantity}
                showQuantityCounter={true}
              />
            ))
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-xl p-6 sticky top-4">
            <h2 className="text-2xl font-bold text-primary mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPriceEGP(totalPrice)}</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">{formatPriceEGP(0)}</span>
              </div>

              <div className="pt-4 border-t flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span className="text-xl font-bold text-primary">{formatPriceEGP(totalPrice)}</span>
              </div>
            </div>

            <Button className="w-full" size="lg" disabled={products.length === 0}>
              Proceed to Checkout
            </Button>

            {products.length > 0 && (
              <p className="text-sm text-gray-500 mt-4 text-center">
                or{" "}
                <Link to="/shop" className="text-primary hover:underline font-medium">
                  Continue Shopping
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
