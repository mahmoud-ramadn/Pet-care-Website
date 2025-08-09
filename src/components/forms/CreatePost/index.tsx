import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { useRef, useState } from "react"
import { useForm } from "react-hook-form"

import { ButtonWithLoading } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form } from "@/components/ui/form"
import { FormControl, FormField, FormItem, FormLabel, FormLoading, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { CreatePostCommunity } from "@/apis/user"

import { type CreatePostSchema, createPostSchema } from "./shema"

interface Props {
  values?: CreatePostSchema
  onSuccess?: () => void
}

export default function CreatePostForm({ values, onSuccess }: Props) {
  const [loading, setLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      postImage: values?.postImage || "",
      description: values?.description || "",
      onlyMe: values?.onlyMe || false,
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue("postImage", file)
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const removeImage = () => {
    form.setValue("postImage", "")
    setPreviewImage(null)
  }

  async function onSubmit(input: CreatePostSchema) {
    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("description", input.description)
      formData.append("onlyMe", String(input.onlyMe))

      if (input.postImage instanceof File) {
        formData.append("postImage", input.postImage)
      }

      await CreatePostCommunity(formData as unknown as CreatePostInputs)

      toast.success("تم اضافة المنشور بنجاح")

      form.reset()
      setPreviewImage(null)
      if (onSuccess) {
        onSuccess()
      }
    } catch {
      toast.error("فشل اضافة المنشور، خطأ غير متوقع")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <Form value={form}>
        <FormLoading loading={loading}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>وصف المنشور</FormLabel>
                    <FormControl>
                      <Input placeholder="اكتب وصفاً للمنشور" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="onlyMe"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-2">
                    <FormLabel>حالة المنشور</FormLabel>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="onlyMe" checked={field.value} onCheckedChange={field.onChange} />
                      <label htmlFor="onlyMe" className="text-sm font-medium leading-none">
                        خاص بي فقط
                      </label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="postImage"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>صورة المنشور (اختياري)</FormLabel>
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
                            <p className="mt-2 text-sm text-gray-600">انقر لرفع صورة أو اسحبها هنا</p>
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

            <ButtonWithLoading type="submit" size="lg" className="mt-6 w-full" loading={loading}>
              {values ? "تحديث المنشور" : "إنشاء منشور"}
            </ButtonWithLoading>
          </form>
        </FormLoading>
      </Form>
    </div>
  )
}
