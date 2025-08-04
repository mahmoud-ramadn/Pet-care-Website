import { z } from "zod"

export const ProductFormSchema = z.object({
  name: z.string().min(2, { message: "العنوان العربي يجب أن يكون أطول من 2 حرف" }),
  desc: z.string().min(2, { message: "العنوان الإنجليزي يجب أن يكون أطول من 2 حرف" }),
  quantity: z.number({ invalid_type_error: "الكمية يجب أن تكون رقم" }),
  discount: z.number({ invalid_type_error: "الخصم يجب أن يكون رقم" }),
  category: z.string().min(1, { message: "يجب اختيار تصنيف المنتج" }),
  productImage: z.union([z.string(), z.instanceof(File)]).optional(),
})

export type TypeProductFormSchema = z.infer<typeof ProductFormSchema>
