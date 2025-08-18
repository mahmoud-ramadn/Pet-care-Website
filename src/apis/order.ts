import { apiClient } from "@/lib/api-client"


type CheckoutInputs = {
  shippingAddress: {
    details: string
    phone: string
    city: string
  }
  paymentMethodType: "cash" | "card"
}

export const CreateOrder = async (inputs: CheckoutInputs, id: string) => {
  const response = await apiClient<Order>({
    url: `order/cashorder?cartId=${id}`,
    method: "POST",
    data: inputs,
    auth: true,
  })
  return response
}
