import { z } from "zod"

export const DoctorFormSchema = z.object({
  name: z.string().min(2, { message: "الاسم يجب أن يكون أطول من 2 حرف" }),

  doctorImage: z
    .union([z.string(), z.instanceof(File)])
    .refine(
      (value) => {
        if (typeof value === "string") return value.trim() !== ""
        if (value instanceof File) return value.size > 0
        return false
      },
      { message: "يجب إضافة صورة الطبيب" }
    )
    .optional(),

  description: z.string().min(2, { message: "الوصف يجب أن يكون أطول من 2 حرف" }),
  about: z.string().min(2, { message: "الوصف يجب أن يكون أطول من 2 حرف" }),

  rate: z.coerce
    .number()
    .min(1, { message: "التقييم يجب أن يكون بين 1 و 5" })
    .max(5, { message: "التقييم يجب أن يكون بين 1 و 5" }),

  phone: z.string({ required_error: "رقم الهاتف مطلوب" }).min(8, { message: "رقم الهاتف يجب أن يكون 8 أرقام أو أكثر" }),

  accepted_pet_types: z.array(z.string()).min(1, { message: "يجب اختيار نوع أو أكثر من الحيوانات" }),

  imagesProfile: z
    .array(
      z.union([z.string(), z.instanceof(File)]).refine(
        (value) => {
          if (typeof value === "string") return value.trim() !== ""
          if (value instanceof File) return value.size > 0
          return false
        },
        { message: "يجب إضافة صورة للطبيب" }
      )
    )
    .optional(),

  specialized_in: z.array(z.string()).min(1, { message: "يجب كتابة تخصص واحد على الأقل" }),
})

export type typeDoctorFormSchema = z.infer<typeof DoctorFormSchema>
