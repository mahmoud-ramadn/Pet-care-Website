import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { z } from "zod"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router"

import { ButtonWithLoading } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { FormControl, FormField, FormItem, FormLabel, FormLoading, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

import { CreateOrder } from "@/apis/order"

const checkoutSchema = z.object({
  shippingAddress: z.object({
    details: z.string().min(10, "يجب أن تكون تفاصيل العنوان 10 أحرف على الأقل"),
    phone: z
      .string()
      .min(11, "رقم الهاتف يجب أن يكون 11 رقم على الأقل")
      .regex(/^01[0-9]{9}$/, "رقم الهاتف يجب أن يبدأ بـ 01 ويتكون من 11 رقم"),
    city: z.string().min(2, "اسم المدينة مطلوب"),
  }),
  paymentMethodType: z.enum(["cash", "card"], {
    required_error: "يجب اختيار طريقة الدفع",
  }),
})

export type CheckoutSchema = z.infer<typeof checkoutSchema>

interface Props {
  onSuccess?: (orderData: Order) => void
}

export default function CheckoutForm({ onSuccess }: Props) {
  const id: string | undefined = useParams().id
  const [loading, setLoading] = useState(false)

  const form = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
      paymentMethodType: "cash",
    },
  })

  async function onSubmit(input: CheckoutSchema) {
    try {
      setLoading(true)

      if (!id) {
        toast.error("معرف السلة غير موجود")
        return
      }

      const orderData = await CreateOrder(input, id)

      toast.success("تم إنشاء الطلب بنجاح")

      form.reset()
      if (onSuccess) {
        onSuccess(orderData)
      }
    } catch (error) {
      toast.error("فشل في إنشاء الطلب، حاول مرة أخرى")
      console.error("Order creation failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const cities = [
    "القاهرة",
    "الجيزة",
    "الإسكندرية",
    "الشرقية",
    "المنوفية",
    "القليوبية",
    "البحيرة",
    "الغربية",
    "كفر الشيخ",
    "الدقهلية",
    "دمياط",
    "بورسعيد",
    "الإسماعيلية",
    "السويس",
    "شمال سيناء",
    "جنوب سيناء",
    "المنيا",
    "بني سويف",
    "الفيوم",
    "أسيوط",
    "سوهاج",
    "قنا",
    "الأقصر",
    "أسوان",
    "البحر الأحمر",
    "الوادي الجديد",
    "مطروح",
  ]

  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-2xl bg-gradient-to-br from-white to-gray-50/50 p-6 md:p-8 shadow-xl border border-gray-100/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">إتمام الطلب</h2>
            <p className="text-sm text-gray-600">املأ البيانات المطلوبة لإتمام عملية الشراء</p>
          </div>
        </div>

        <Form value={form}>
          <FormLoading loading={loading}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Shipping Address Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-800">عنوان التوصيل</h3>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="shippingAddress.city"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                          المدينة
                        </FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="w-full h-12 px-4 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200 text-right bg-white/70 backdrop-blur-sm appearance-none"
                          >
                            <option value="">اختر المدينة</option>
                            {cities.map((city) => (
                              <option key={city} value={city.toLowerCase()}>
                                {city}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shippingAddress.phone"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          رقم الهاتف
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="01234567890"
                            dir="ltr"
                            className="h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-white/70 backdrop-blur-sm text-center"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="shippingAddress.details"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        تفاصيل العنوان
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="اكتب العنوان التفصيلي (الشارع، رقم المبنى، الدور، الشقة، علامات مميزة...)"
                          className="min-h-[100px] rounded-xl border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200 text-right bg-white/70 backdrop-blur-sm resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Payment Method Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-800">طريقة الدفع</h3>
                </div>

                <FormField
                  control={form.control}
                  name="paymentMethodType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-3">
                          <div className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 transition-all duration-200 hover:border-green-300 hover:shadow-md">
                            <RadioGroupItem
                              value="cash"
                              id="cash"
                              className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                            />
                            <label htmlFor="cash" className="flex-1 cursor-pointer select-none">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                  <svg
                                    className="w-5 h-5 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-800">الدفع نقداً عند الاستلام</p>
                                  <p className="text-sm text-gray-600">ادفع المبلغ عند استلام الطلب</p>
                                </div>
                              </div>
                            </label>
                          </div>

                          <div className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 transition-all duration-200 hover:border-blue-300 hover:shadow-md">
                            <RadioGroupItem
                              value="card"
                              id="card"
                              className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                            />
                            <label htmlFor="card" className="flex-1 cursor-pointer select-none">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                  <svg
                                    className="w-5 h-5 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-800">الدفع بالبطاقة الائتمانية</p>
                                  <p className="text-sm text-gray-600">دفع آمن عبر الإنترنت</p>
                                </div>
                              </div>
                            </label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-200">
                <ButtonWithLoading
                  type="submit"
                  size="lg"
                  className="w-full h-14 rounded-xl bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                  loading={loading}
                >
                  <span className="flex items-center justify-center gap-3">
                    {!loading && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                    <span className="text-lg">تأكيد الطلب</span>
                  </span>
                </ButtonWithLoading>

                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span>معاملة آمنة ومشفرة</span>
                </div>
              </div>
            </form>
          </FormLoading>
        </Form>
      </div>
    </div>
  )
}
