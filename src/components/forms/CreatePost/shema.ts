import z from "zod"

export const createPostSchema = z.object({
  description: z.string().min(1, "Description is required").max(500, "Description too long"),
  onlyMe: z.boolean(),
  postImage: z.union([z.instanceof(File), z.string()]).optional(),
})

export type CreatePostSchema = z.infer<typeof createPostSchema>
