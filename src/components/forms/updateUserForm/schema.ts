import { z } from "zod"

export const UpdateUserProfileFormSchema = z.object({
  name: z.string({ required_error: "الاسم مطلوب" }).trim().min(1, { message: "الاسم لا يمكن أن يكون فارغًا" }),

  email: z.string({ required_error: "البريد الإلكتروني مطلوب" }).email({ message: "البريد الإلكتروني غير صالح" }),

  phoneNumber: z
    .string({ required_error: "رقم الهاتف مطلوب" })
    .min(8, { message: "رقم الهاتف يجب أن يكون 8 أرقام أو أكثر" }),

  profileImage: z
    .union([z.string().url({ message: "رابط الصورة غير صالح" }), z.instanceof(File, { message: "ملف صورة غير صالح" })])
    .optional(),
})

export type UpdateUserProfileFormSchemaType = z.infer<typeof UpdateUserProfileFormSchema>
