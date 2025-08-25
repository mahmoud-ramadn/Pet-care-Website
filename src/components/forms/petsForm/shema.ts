import { z } from "zod"

export const PetsFormSchema = z.object({
  name: z.string().min(2, { message: "الاسم يجب أن يكون أطول من 2 حرف" }),

  petImage: z
    .union([z.string(), z.instanceof(File)])
    .refine(
      (value) => {
        if (typeof value === "string") {
          return value.trim() !== "" // لازم الرابط مايكونش فاضي
        }
        if (value instanceof File) {
          return value.size > 0 // لازم يكون فيه ملف مرفوع
        }
        return false
      },
      { message: "يجب إضافة صورة الحيوان" }
    )
    .optional(), // 👈 كده خليه اختياري

  type: z.string().min(1, {
    message: "نوع الحيوان لازم يكون قطة أو كلب فقط",
  }),

  gender: z.string().min(1, {
    message: "الجنس لازم يكون ذكر أو أنثى فقط",
  }),

  weight: z.number({
    invalid_type_error: "الكمية يجب أن تكون رقم",
  }),
})

export type typePetFormSchema = z.infer<typeof PetsFormSchema>
