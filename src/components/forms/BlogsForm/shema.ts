import { z } from "zod"

export const BlogFormSchema = z.object({
  link: z.string().min(2, { message: "الرابط يجب أن يكون أطول من 2 حرف" }),

  discription: z.string().min(2, { message: "الوصف يجب أن يكون أطول من 2 حرف" }),

  blogImage: z.union([z.string(), z.instanceof(File)]).refine(
    (value) => {
      if (typeof value === "string") {
        return value.trim() !== "" // الرابط ما يكونش فاضي
      }
      if (value instanceof File) {
        return value.size > 0 // لازم يبقى فيه ملف مرفوع
      }
      return false
    },
    { message: "يجب إضافة صورة للمدونة" }
  ),
})

export type TypeBlogFormSchema = z.infer<typeof BlogFormSchema>
