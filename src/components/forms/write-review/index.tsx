import { zodResolver } from "@hookform/resolvers/zod"
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

  async function onSubmit(values: WriteReviewFormSchemaType) {
    try {
      writeReview(values)
      toast.success("تم إرسال المراجعة بنجاح")
    } catch (error) {
      console.error(error)
      toast.error("حدث خطأ أثناء الإرسال")
    }
  }

  return (
    <div className="w-full my-10 max-w-md p-8 space-y-6 shadow-lg border rounded-2xl">
      <Form value={form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-xl font-semibold text-center text-gray-800">
            {isEdit ? "تعديل مراجعتك" : "اكتب مراجعتك"}
          </h2>

          <FormField
            control={form.control}
            name="review"
            render={({ field }) => (
              <FormItem>
                <FormLabel>محتوى المراجعة</FormLabel>
                <FormControl>
                  <Textarea placeholder="اكتب رأيك بكل صراحة..." className="min-h-[120px] resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>التقييم: {field.value} / 5</FormLabel>
                <FormControl>
                  <Slider
                    min={1}
                    max={5}
                    step={1}
                    value={[field.value]}
                    onValueChange={([val]) => field.onChange(val)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ButtonWithLoading type="submit" size="lg" className="w-full">
            تسجيل المراجعة
          </ButtonWithLoading>
        </form>
      </Form>
    </div>
  )
}
