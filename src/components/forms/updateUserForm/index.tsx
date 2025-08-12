import { zodResolver } from "@hookform/resolvers/zod"
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
  value?: forData | null
}

export default function UserProfileUpdateForm({ value }: Props) {
  const [loading, setLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
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
        profileImage: value.profileImage || "",
      })
      if (value.profileImage) {
        setPreviewImage(value.profileImage)
      }
    }
  }, [value, form])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue("profileImage", file)
      setPreviewImage(URL.createObjectURL(file))
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
      toast.success("updated successfully")
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className=" max-w-[500px] mx-auto ">
      <Form value={form}>
        <FormLoading loading={loading}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المستخدم</FormLabel>
                    <FormControl>
                      <Input placeholder="اسم المستخدم" {...field} />
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
                    <FormLabel>رقم الهاتف</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="رقم الهاتف"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
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
                  <FormItem>
                    <FormLabel>البريد الإلكتروني</FormLabel>
                    <FormControl>
                      <Input placeholder="example@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="profileImage"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>صورة المستخدم</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
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
                            className="flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed p-6 hover:bg-gray-50"
                          >
                            <svg
                              className="h-12 w-12 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <p className="mt-2 text-sm text-gray-600">انقر لرفع صورة</p>
                          </div>
                        ) : (
                          <div className="relative">
                            <img
                              src={previewImage || (typeof field.value === "string" ? field.value : "")}
                              alt="Preview"
                              className="h-48 w-full rounded-md object-cover"
                            />
                            <button
                              type="button"
                              onClick={removeImage}
                              className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                            >
                              ✕
                            </button>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <ButtonWithLoading type="submit" size="lg" className="mt-6" loading={loading}>
              update Profile
            </ButtonWithLoading>
          </form>
        </FormLoading>
      </Form>
    </div>
  )
}
