// src/atoms/cartAtoms.ts
import { atom } from "jotai"

export const cartProductsAtom = atom<CartItem[]>([])

export const cartTotalAtom = atom((get) => {
  const products = get(cartProductsAtom)
  return products.reduce((sum, item) => sum + item.price * item.quantity, 0)
})
