import { zodResolver } from "@hookform/resolvers/zod"
import { Camera, Check, Edit3, Mail, Phone, Save, User } from "lucide-react"
import { toast } from "sonner"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import ImageUpload from "@/components/ui/ImageUploadField"
import { ButtonWithLoading } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormLoading, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { updateUserProfile } from "@/apis/user"

import { UpdateUserProfileFormSchema, type UpdateUserProfileFormSchemaType } from "./schema"

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
  const [loading, setLoading] = useState(false)

  const form = useForm<UpdateUserProfileFormSchemaType>({
    resolver: zodResolver(UpdateUserProfileFormSchema),
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
      toast.success("تم تحديث الملف الشخصي بنجاح", {
        description: "تم حفظ جميع التغييرات",
        duration: 4000,
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("حدث خطأ أثناء التحديث", {
        description: "يرجى المحاولة مرة أخرى",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg mb-4">
          <Edit3 className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">تحديث الملف الشخصي</h1>
        <p className="text-gray-600">قم بتحديث معلوماتك الشخصية وصورة الملف الشخصي</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <User className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">المعلومات الشخصية</h2>
          </div>
        </div>

        <div className="p-8">
          <Form value={form}>
            <FormLoading loading={loading}>
              <div className="space-y-8">
                {/* Profile Image */}
                <FormField
                  control={form.control}
                  name="profileImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium text-gray-900 flex items-center gap-2">
                        <Camera className="w-5 h-5" />
                        صورة الملف الشخصي
                      </FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value}
                          onChange={(file) => field.onChange(file)}
                          label="اختر صورة أو اسحبها هنا"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Form Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium text-gray-900 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          اسم المستخدم
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="اسم المستخدم"
                            className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
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
                        <FormLabel className="text-base font-medium text-gray-900 flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          رقم الهاتف
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="رقم الهاتف"
                            className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
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
                        <FormLabel className="text-base font-medium text-gray-900 flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          البريد الإلكتروني
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="example@email.com"
                            className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit */}
                <div className="pt-6 border-t border-gray-100">
                  <ButtonWithLoading
                    type="submit"
                    size="lg"
                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                    loading={loading}
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    <Save className="w-5 h-5 mr-2" />
                    حفظ التغييرات
                  </ButtonWithLoading>
                </div>
              </div>
            </FormLoading>
          </Form>
        </div>
      </div>

      {/* Help Text */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-blue-900">نصائح مفيدة</h3>
            <ul className="mt-2 text-sm text-blue-700 space-y-1">
              <li>• استخدم صورة واضحة وحديثة</li>
              <li>• تأكد من أن بياناتك صحيحة ومحدثة</li>
              <li>• حجم الصورة يجب أن يكون أقل من 5 ميجابايت</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
