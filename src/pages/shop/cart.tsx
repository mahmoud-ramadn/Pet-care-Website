import { useAtom } from "jotai"
import { ArrowRight, Gift, Shield, ShoppingCart, Star, Truck } from "lucide-react"
import { toast } from "sonner"

import { useEffect, useState } from "react"

// import { Link } from "react-router-dom" // Simulated for demo

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="container px-4 py-8">
        {/* Enhanced Header Section */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-30"></div>
                  <div className="relative p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
                    <ShoppingCart className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="lg:text-4xl text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Shopping Cart
                  </h1>
                  <p className="text-gray-500 mt-1">Review your selected items</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg">
                  {products.length} {products.length === 1 ? "Item" : "Items"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-12">
          {/* Cart Items Section */}
          <div className="lg:col-span-3 space-y-8">
            {!products.length ? (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-blue-50 rounded-3xl blur-xl opacity-50"></div>
                <div className="relative bg-white/90 backdrop-blur-sm border-2 border-dashed border-gray-200 rounded-3xl p-16 text-center shadow-xl">
                  <div className="mx-auto w-48 h-48 mb-8">
                    <Empty className="text-gray-300 w-full h-full" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h3>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto text-lg">
                    Discover amazing products and start building your perfect collection!
                  </p>
                  <Button
                    asChild
                    className="px-10 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-xl"
                  >
                    <a href="/shop" className="text-white flex items-center gap-2">
                      Start Shopping
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {products.map((item, index) => (
                  <ProductCard
                    key={index}
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
                ))}
              </div>
            )}
          </div>

          {/* Enhanced Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Order Summary Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-2xl"></div>
                <div className="relative bg-white/90 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-2xl">
                  <h2 className="text-2xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-100 flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                      <ShoppingCart className="w-5 h-5 text-white" />
                    </div>
                    Order Summary
                  </h2>

                  <div className="space-y-6 mb-8">
                    <div className="flex justify-between items-center py-4 border-b border-gray-50">
                      <span className="text-gray-600 flex items-center gap-2">
                        <Gift className="w-4 h-4" />
                        Subtotal
                      </span>
                      <span className="font-semibold text-lg">{formatPriceEGP(totalPrice)}</span>
                    </div>

                    <div className="flex justify-between items-center py-4 border-b border-gray-50">
                      <span className="text-gray-600 flex items-center gap-2">
                        <Truck className="w-4 h-4" />
                        Shipping
                      </span>
                      <span className="text-emerald-600 font-semibold flex items-center gap-1">
                        <span className="text-xs bg-emerald-100 px-2 py-1 rounded-full">FREE</span>
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-4 border-b border-gray-50">
                      <span className="text-gray-600 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Tax
                      </span>
                      <span className="font-semibold">{formatPriceEGP(0)}</span>
                    </div>

                    <div className="pt-6 border-t-2 border-gray-200 flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-800">Total</span>
                      <div className="text-right">
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {formatPriceEGP(totalPrice)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
                    size="lg"
                    disabled={products.length === 0}
                    onClick={() => (window.location.href = "/shop/checkout")}
                  >
                    <div className="flex items-center justify-center w-full gap-3">
                      Proceed to Checkout
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </Button>

                  {products.length > 0 && (
                    <div className="mt-6 text-center">
                      <a
                        href="/shop"
                        className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2 group transition-all duration-200"
                      >
                        Continue Shopping
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Why Shop With Us?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="p-1 bg-emerald-100 rounded-full">
                      <Truck className="w-3 h-3 text-emerald-600" />
                    </div>
                    Free shipping on all orders
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="p-1 bg-blue-100 rounded-full">
                      <Shield className="w-3 h-3 text-blue-600" />
                    </div>
                    Secure payment protection
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="p-1 bg-yellow-100 rounded-full">
                      <Star className="w-3 h-3 text-yellow-600" />
                    </div>
                    30-day money-back guarantee
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
