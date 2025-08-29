import { z } from "zod"

// Function to create schema with translations
export const createUpdateUserProfileFormSchema = (t: (key: string) => string) => {
  return z.object({
    name: z
      .string({
        required_error: t("updateUserForm.validation.nameRequired"),
      })
      .trim()
      .min(1, {
        message: t("updateUserForm.validation.nameEmpty"),
      }),

    email: z
      .string({
        required_error: t("updateUserForm.validation.emailRequired"),
      })
      .email({
        message: t("updateUserForm.validation.emailInvalid"),
      }),

    phoneNumber: z
      .string({
        required_error: t("updateUserForm.validation.phoneRequired"),
      })
      .min(8, {
        message: t("updateUserForm.validation.phoneMinLength"),
      }),

    profileImage: z
      .union([
        z.string().url({
          message: t("updateUserForm.validation.imageUrlInvalid"),
        }),
        z.instanceof(File, {
          message: t("updateUserForm.validation.imageFileInvalid"),
        }),
      ])
      .optional(),
  })
}

export const UpdateUserProfileFormSchema = z.object({
  name: z.string({ required_error: "Name is required" }).trim().min(1, { message: "Name cannot be empty" }),

  email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email address" }),

  phoneNumber: z
    .string({ required_error: "Phone number is required" })
    .min(8, { message: "Phone number must be 8 digits or more" }),

  profileImage: z
    .union([z.string().url({ message: "Invalid image URL" }), z.instanceof(File, { message: "Invalid image file" })])
    .optional(),
})

export type UpdateUserProfileFormSchemaType = z.infer<typeof UpdateUserProfileFormSchema>
