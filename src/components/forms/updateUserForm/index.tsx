import { zodResolver } from "@hookform/resolvers/zod"
import { Camera, Check, Edit3, Mail, Phone, Save, Upload, User, X } from "lucide-react"
import { toast } from "sonner"

import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"

import { ButtonWithLoading } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { FormControl, FormField, FormItem, FormLabel, FormLoading, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { updateUserProfile } from "@/apis/user"

import { UpdateUserProfileFormSchema, type UpdateUserProfileFormSchemaType } from "./schema"

type forData = {
  _id?: string
  name?: string
  email?: string
  profileImage?: string
  phoneNumber?: string
  pets?: string[]
  role?: "user" | "admin"
  services_id?: string[]
  followers?: string[]
  following?: string[]
  favPet?: string[]
  favProduct?: string[]
  cards?: string[]
  __v?: number
  pet?: string[]
  id?: string
}

interface inputsValues {
  name: string
  email: string
  profileImage: string | File
  phoneNumber: string
}

type Props = {
  value?: forData
}

export default function UserProfileUpdateForm({ value }: Props) {
  const [loading, setLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<UpdateUserProfileFormSchemaType>({
    resolver: zodResolver(UpdateUserProfileFormSchema),
    defaultValues: {
      name: value?.name || "",
      phoneNumber: value?.phoneNumber || "0106795185",
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
      if (value.profileImage) {
        setPreviewImage(value.profileImage)
      }
    }
  }, [value, form])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("حجم الصورة كبير جداً. الحد الأقصى 5 ميجابايت")
        return
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("يجب أن يكون الملف صورة")
        return
      }

      setImageLoading(true)
      form.setValue("profileImage", file)

      const reader = new FileReader()
      reader.onload = () => {
        setPreviewImage(reader.result as string)
        setImageLoading(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      const file = files[0]
      if (file.size > 5 * 1024 * 1024) {
        toast.error("حجم الصورة كبير جداً. الحد الأقصى 5 ميجابايت")
        return
      }

      if (!file.type.startsWith("image/")) {
        toast.error("يجب أن يكون الملف صورة")
        return
      }

      setImageLoading(true)
      form.setValue("profileImage", file)

      const reader = new FileReader()
      reader.onload = () => {
        setPreviewImage(reader.result as string)
        setImageLoading(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const removeImage = () => {
    form.setValue("profileImage", "")
    setPreviewImage(null)
  }

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
                {/* Profile Image Section */}
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
                        <div className="space-y-4">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            ref={fileInputRef}
                            className="hidden"
                          />

                          {!previewImage && !field.value ? (
                            <div
                              onClick={triggerFileInput}
                              onDragEnter={handleDrag}
                              onDragLeave={handleDrag}
                              onDragOver={handleDrag}
                              onDrop={handleDrop}
                              className={`relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-all duration-300 ${
                                dragActive
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                              }`}
                            >
                              <div className="flex flex-col items-center space-y-4">
                                <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                                  <Upload className="w-10 h-10 text-blue-600" />
                                </div>
                                <div className="text-center">
                                  <p className="text-lg font-medium text-gray-900">اختر صورة أو اسحبها هنا</p>
                                  <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF حتى 5MB</p>
                                </div>
                              </div>
                              {dragActive && <div className="absolute inset-0 bg-blue-500/10 rounded-xl" />}
                            </div>
                          ) : (
                            <div className="relative group">
                              <div className="relative overflow-hidden rounded-xl">
                                {imageLoading ? (
                                  <div className="h-64 w-full bg-gray-100 rounded-xl flex items-center justify-center">
                                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent animate-spin rounded-full" />
                                  </div>
                                ) : (
                                  <img
                                    src={previewImage || (typeof field.value === "string" ? field.value : "")}
                                    alt="معاينة الصورة"
                                    className="h-64 w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                                  />
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                                  <div className="flex space-x-3 rtl:space-x-reverse">
                                    <button
                                      type="button"
                                      onClick={triggerFileInput}
                                      className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                                    >
                                      <Camera className="w-5 h-5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={removeImage}
                                      className="bg-red-500/90 hover:bg-red-500 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                                    >
                                      <X className="w-5 h-5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
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
                          <div className="relative">
                            <Input
                              placeholder="اسم المستخدم"
                              className="pl-10 rtl:pr-10 rtl:pl-3 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-200"
                              {...field}
                            />
                            <User className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          </div>
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
                          <div className="relative">
                            <Input
                              type="tel"
                              placeholder="رقم الهاتف"
                              className="pl-10 rtl:pr-10 rtl:pl-3 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-200"
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                            <Phone className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          </div>
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
                          <div className="relative">
                            <Input
                              placeholder="example@email.com"
                              className="pl-10 rtl:pr-10 rtl:pl-3 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-200"
                              {...field}
                            />
                            <Mail className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-gray-100">
                  <ButtonWithLoading
                    type="submit"
                    size="lg"
                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                    loading={loading}
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                      <Save className="w-5 h-5" />
                      <span>حفظ التغييرات</span>
                    </div>
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
          <div className="flex-shrink-0">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-blue-900">نصائح مفيدة</h3>
            <ul className="mt-2 text-sm text-blue-700 space-y-1">
              <li>• استخدم صورة واضحة وحديثة لملفك الشخصي</li>
              <li>• تأكد من أن بياناتك صحيحة ومحدثة</li>
              <li>• حجم الصورة يجب أن يكون أقل من 5 ميجابايت</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
