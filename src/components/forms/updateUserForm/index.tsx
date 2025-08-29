import { zodResolver } from "@hookform/resolvers/zod"
import { Camera, Check, Edit3, Mail, Phone, Save, User } from "lucide-react"
import { toast } from "sonner"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

import ImageUpload from "@/components/ui/ImageUploadField"
import { ButtonWithLoading } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormLoading, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { updateUserProfile } from "@/apis/user"

import { type UpdateUserProfileFormSchemaType, createUpdateUserProfileFormSchema } from "./schema"

interface inputsValues {
  name: string
  email: string
  profileImage: string | File
  phoneNumber: string
}

type forData = {
  _id?: string
  name?: string
  email?: string
  profileImage?: string
  phoneNumber?: string
  role?: "user" | "admin"
}

type Props = {
  value?: forData
}

export default function UserProfileUpdateForm({ value }: Props) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)

  const form = useForm<UpdateUserProfileFormSchemaType>({
    resolver: zodResolver(createUpdateUserProfileFormSchema(t)),
    defaultValues: {
      name: value?.name || "",
      phoneNumber: value?.phoneNumber || "",
      email: value?.email || "",
      profileImage: value?.profileImage || "",
    },
  })

  useEffect(() => {
    if (value) {
      form.reset({
        name: value.name || "",
        phoneNumber: value.phoneNumber || "",
        email: value.email || "",
        profileImage:
          value.profileImage ||
          "https://res.cloudinary.com/dhddxcwcr/image/upload/v1700416252/6558f05c2841e64561ce75d1_Cover.jpg",
      })
    }
  }, [value, form])

  async function onSubmit(inputs: UpdateUserProfileFormSchemaType) {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("name", inputs.name)
      formData.append("email", inputs.email)
      if (inputs.phoneNumber) {
        formData.append("phoneNumber", inputs.phoneNumber.toString())
      }
      if (inputs.profileImage instanceof File) {
        formData.append("profileImage", inputs.profileImage)
      }

      await updateUserProfile(formData as unknown as inputsValues)
      toast.success(t("updateUserForm.profileUpdated"), {
        description: t("updateUserForm.profileUpdatedDesc"),
        duration: 4000,
      })
    } catch {
      toast.error(t("updateUserForm.updateError"), {
        description: t("updateUserForm.updateErrorDesc"),
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header Section */}
      <div className="text-center mb-8 relative">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg mb-4">
          <Edit3 className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{t("updateUserForm.title")}</h1>
        <p className="text-muted-foreground">{t("updateUserForm.subtitle")}</p>
      </div>

      <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
        <div className="bg-gradient-to-r from-accent/20 via-primary/10 to-secondary/10 p-6 border-b border-border">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <User className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">{t("updateUserForm.personalInfo")}</h2>
          </div>
        </div>

        <div className="p-8">
          <Form value={form}>
            <FormLoading loading={loading}>
              <div className="space-y-8">
                <FormField
                  control={form.control}
                  name="profileImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium text-foreground flex items-center gap-2">
                        <Camera className="w-5 h-5" />
                        {t("updateUserForm.profileImage")}
                      </FormLabel>
                      <FormControl>
                        <ImageUpload value={field.value} onChange={(file) => field.onChange(file)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium text-foreground flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {t("updateUserForm.username")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("updateUserForm.usernamePlaceholder")}
                            className="h-12 border-2 border-input focus:border-primary bg-background text-foreground rounded-xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium text-foreground flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {t("updateUserForm.phoneNumber")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder={t("updateUserForm.phoneNumberPlaceholder")}
                            className="h-12 border-2 border-input focus:border-primary bg-background text-foreground rounded-xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-base font-medium text-foreground flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {t("updateUserForm.email")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("updateUserForm.emailPlaceholder")}
                            className="h-12 border-2 border-input focus:border-primary bg-background text-foreground rounded-xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-6 border-t border-border">
                  <ButtonWithLoading
                    type="submit"
                    size="lg"
                    className="w-full h-14 bg-gradient-to-r from-primary to-secondary hover:from-primary hover:to-secondary text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                    loading={loading}
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    <Save className="w-5 h-5 mr-2" />
                    {t("updateUserForm.saveChanges")}
                  </ButtonWithLoading>
                </div>
              </div>
            </FormLoading>
          </Form>
        </div>
      </div>

      <div className="mt-6 p-4 bg-accent/20 border border-accent rounded-xl">
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground">{t("updateUserForm.helpfulTips")}</h3>
            <ul className="mt-2 text-sm text-muted-foreground space-y-1">
              <li>• {t("updateUserForm.tip1")}</li>
              <li>• {t("updateUserForm.tip2")}</li>
              <li>• {t("updateUserForm.tip3")}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
