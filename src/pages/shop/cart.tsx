import { useAtom } from "jotai"
import { ShoppingCart } from "lucide-react"
import { toast } from "sonner"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// Fixed import

import { formatPriceEGP } from "@/lib/FormatPriceEGp"

import Empty from "@/components/ui/animations/empty"
import { Button } from "@/components/ui/button"
import { ProductCardSkeleton } from "@/components/ui/feedbacks/product-card-skeleton"
import ProductCard from "@/components/ui/shop/product-card"

import { addCartProduct } from "@/apis/product"
import { cartProductsAtom, cartTotalAtom } from "@/atoms/cart"
import { useCartProducts } from "@/hooks/product"

export default function Cart() {
  const { value, loading } = useCartProducts()
  const [products, setProducts] = useAtom(cartProductsAtom)
  const [totalPrice] = useAtom(cartTotalAtom)
  const [loadingIds, setLoadingIds] = useState<string[]>([])

  useEffect(() => {
    if (value) setProducts(value)
  }, [value, setProducts])

  if (loading) {
    return (
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
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
        <div className="p-3 bg-primary/10 rounded-full">
          <ShoppingCart className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Your Shopping Cart</h1>
        <span className="ml-auto bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
          {products.length} {products.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          {!products.length ? (
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center bg-gray-50">
              <div className="mx-auto w-40 h-40 mb-6">
                <Empty className="text-gray-300 w-full h-full" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Your Cart is Empty</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Looks like you haven't added anything to your cart yet. Let's find something special!
              </p>
              <Button asChild className="px-8 py-4 text-lg">
                <Link to="/shop" className="text-white">
                  Start Shopping
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {products.map((item) => (
                <div key={item._id} className="hover:shadow-sm transition-shadow duration-200">
                  <ProductCard
                    {...item.product}
                    initialQuantity={item.quantity}
                    showQuantityCounter={true}
                    sourcePage="cart"
                    isLoadingCart={loadingIds.includes(item._id)}
                    handleToggleCart={async () => {
                      setLoadingIds((prev) => [...prev, item._id])
                      try {
                        await addCartProduct(item.product._id)
                        setProducts((prev) => prev.filter((p) => p._id !== item._id))
                        toast.success("Product removed from cart")
                      } catch {
                        toast.error("Failed to remove product")
                      } finally {
                        setLoadingIds((prev) => prev.filter((id) => id !== item._id))
                      }
                    }}
                    handleQuantityChange={(newQty) => {
                      setProducts((prev) => prev.map((p) => (p._id === item._id ? { ...p, quantity: newQty } : p)))
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm sticky top-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPriceEGP(totalPrice)}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">{formatPriceEGP(0)}</span>
              </div>
              <div className="pt-4 border-t border-gray-200 flex justify-between">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <span className="text-xl font-bold text-primary">{formatPriceEGP(totalPrice)}</span>
              </div>
            </div>

            <Button
              className="w-full py-6 text-lg font-medium shadow-md hover:shadow-lg transition-shadow"
              size="lg"
              disabled={products.length === 0}
            >
              <Link to="/shop/checkout" className="flex items-center justify-center w-full">
                Proceed to Checkout
              </Link>
            </Button>

            {products.length > 0 && (
              <div className="mt-4 text-center">
                <Link
                  to="/shop"
                  className="text-sm text-primary hover:text-primary/80 font-medium inline-flex items-center"
                >
                  Continue Shopping
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
