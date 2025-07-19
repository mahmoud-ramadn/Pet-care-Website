import { z } from "zod"

export const SignUpFormSchema = z
  .object({
    name: z.string({ required_error: "الاسم مطلوب" }).trim().min(1, { message: "الاسم لا يمكن أن يكون فارغًا" }),
    email: z.string().email({ message: "البريد الإلكتروني غير صالح" }),
    password: z.string().min(8, { message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل" }),
    confirmPassword: z.string({ required_error: "تأكيد كلمة المرور مطلوب" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "كلمة المرور غير متطابقة",
  })

export type SignUpFormSchemaType = z.infer<typeof SignUpFormSchema>
