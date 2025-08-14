import { zodResolver } from "@hookform/resolvers/zod"
import { Edit3, MessageSquare, Send, Star } from "lucide-react"
import { toast } from "sonner"

import { useForm } from "react-hook-form"

import { ButtonWithLoading } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"

import { WriteReviewFormSchema, type WriteReviewFormSchemaType } from "./schema"

type WriteReviewProps = {
  writeReview: (values: WriteReviewFormSchemaType) => void
  initialValues?: Partial<WriteReviewFormSchemaType>
  isEdit?: boolean
}

export default function WriteReview({ writeReview, initialValues, isEdit = false }: WriteReviewProps) {
  const form = useForm<WriteReviewFormSchemaType>({
    resolver: zodResolver(WriteReviewFormSchema),
    defaultValues: {
      rating: initialValues?.rating ?? 3,
      review: initialValues?.review ?? "",
    },
  })

  const currentRating = form.watch("rating")

  async function onSubmit(values: WriteReviewFormSchemaType) {
    try {
      writeReview(values)
      toast.success("تم إرسال المراجعة بنجاح")
    } catch (error) {
      console.error(error)
      toast.error("حدث خطأ أثناء الإرسال")
    }
  }
  const getRatingText = (rating: number) => {
    const texts: Record<number, string> = {
      1: "ضعيف جداً",
      2: "ضعيف",
      3: "متوسط",
      4: "جيد",
      5: "ممتاز",
    }
    return texts[rating] || "متوسط"
  }

  const getRatingColor = (rating: number) => {
    if (rating <= 2) return "text-red-500"
    if (rating === 3) return "text-yellow-500"
    return "text-green-500"
  }

  return (
    <div className="w-full max-w-lg mx-auto my-10">
      <div className="relative bg-gradient-to-br from-white to-gray-50 md:p-8 p-3 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-full -translate-y-16 translate-x-16 opacity-60" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-50 to-transparent rounded-full translate-y-12 -translate-x-12 opacity-60" />

        <Form value={form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 relative">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-2">
                {isEdit ? <Edit3 className="w-8 h-8 text-white" /> : <MessageSquare className="w-8 h-8 text-white" />}
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{isEdit ? "تعديل مراجعتك" : "اكتب مراجعتك"}</h2>
              <p className="text-gray-500 text-sm">شاركنا تجربتك وساعد الآخرين في اتخاذ قرارهم</p>
            </div>

            {/* Review Text Field */}
            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    محتوى المراجعة
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        placeholder="شاركنا رأيك الصادق... ما الذي أعجبك؟ ما الذي يمكن تحسينه؟"
                        className="min-h-[140px] resize-none border-2 border-gray-200 rounded-2xl p-4 text-right focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-inner"
                        {...field}
                      />
                      <div className="absolute bottom-3 left-3 text-xs text-gray-400">
                        {field.value.length} / 500 حرف
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Rating Field */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    التقييم
                  </FormLabel>

                  {/* Interactive Star Display */}
                  <div className="flex items-center justify-center gap-2 py-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="p-1 transition-transform duration-200 hover:scale-110"
                        onClick={() => field.onChange(star)}
                      >
                        <Star
                          className={`w-8 h-8 transition-all duration-200 ${
                            star <= currentRating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300 hover:text-yellow-200"
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  {/* Rating Text and Value */}
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getRatingColor(currentRating)} mb-1`}>
                      {currentRating} / 5
                    </div>
                    <div className={`text-lg font-medium ${getRatingColor(currentRating)}`}>
                      {getRatingText(currentRating)}
                    </div>
                  </div>

                  <FormControl>
                    <div className="px-2">
                      <Slider
                        min={1}
                        max={5}
                        step={1}
                        value={[field.value]}
                        onValueChange={([val]) => field.onChange(val)}
                        className="w-full [&>span]:bg-gradient-to-r [&>span]:from-blue-500 [&>span]:to-purple-600"
                        dir="rtl"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <ButtonWithLoading
              type="submit"
              size="lg"
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-3"
            >
              <Send className="w-5 h-5" />
              {isEdit ? "حفظ التعديلات" : "نشر المراجعة"}
            </ButtonWithLoading>

            {/* Footer note */}
            <p className="text-xs text-gray-400 text-center leading-relaxed">
              مراجعتك ستساعد المجتمع في اتخاذ قرارات أفضل
              <br />
              نحن نقدر صدقك وأمانتك في المشاركة
            </p>
          </form>
        </Form>
      </div>
    </div>
  )
}
