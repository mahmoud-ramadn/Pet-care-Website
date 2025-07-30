import { z } from "zod"

export const WriteReviewFormSchema = z.object({
  rating: z
    .number()
    .min(1, { message: "التقييم يجب أن يكون بين 1 و 5" })
    .max(5, { message: "التقييم يجب أن يكون بين 1 و 5" }),
  review: z.string({ required_error: "المراجعة مطلوبة" }).trim().min(1, { message: "المراجعة لا يمكن أن تكون فارغة" }),
})

export type WriteReviewFormSchemaType = z.infer<typeof WriteReviewFormSchema>
