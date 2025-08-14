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
  const [isDragOver, setIsDragOver] = useState(false)
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.type.startsWith("image/")) {
        form.setValue("postImage", file)
        setPreviewImage(URL.createObjectURL(file))
      }
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
    <div className="rounded-2xl bg-gradient-to-br from-white to-gray-50/50 p-8 mb-10 shadow-xl border border-gray-100/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
      {/* Header with icon */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{values ? "تحديث المنشور" : "إنشاء منشور جديد"}</h2>
      </div>

      <Form value={form}>
        <FormLoading loading={loading}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      وصف المنشور
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="اكتب وصفاً مميزاً للمنشور..."
                        className="h-12 rounded-xl border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200 text-right bg-white/70 backdrop-blur-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="onlyMe"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      حالة المنشور
                    </FormLabel>
                    <div className="flex items-center space-x-3 p-4 rounded-xl bg-gray-50/70 border border-gray-200 transition-all duration-200 hover:bg-gray-100/70">
                      <Checkbox
                        id="onlyMe"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                      />
                      <label htmlFor="onlyMe" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
                        خاص بي فقط
                      </label>
                      {field.value && (
                        <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          خاص
                        </div>
                      )}
                    </div>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="postImage"
                render={({ field }) => (
                  <FormItem className="md:col-span-2 space-y-2">
                    <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      صورة المنشور (اختياري)
                    </FormLabel>
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
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`
                              flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 
                              transition-all duration-300 group hover:border-blue-400 hover:bg-blue-50/30
                              ${isDragOver ? "border-blue-400 bg-blue-50/50 scale-105" : "border-gray-300"}
                            `}
                          >
                            <div className="relative">
                              <svg
                                className={`h-16 w-16 transition-colors duration-300 ${
                                  isDragOver ? "text-blue-500" : "text-gray-400 group-hover:text-blue-500"
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="mt-4 text-center">
                              <p
                                className={`text-lg font-medium transition-colors duration-300 ${
                                  isDragOver ? "text-blue-600" : "text-gray-700 group-hover:text-blue-600"
                                }`}
                              >
                                {isDragOver ? "اتركها هنا!" : "انقر أو اسحب الصورة هنا"}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">PNG, JPG, GIF حتى 10MB</p>
                            </div>
                          </div>
                        ) : (
                          <div className="relative group">
                            <img
                              src={previewImage || (typeof field.value === "string" ? field.value : "")}
                              alt="Preview"
                              className="h-64 w-full rounded-2xl object-cover shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-2xl transition-all duration-300"></div>
                            <button
                              type="button"
                              onClick={removeImage}
                              className="absolute right-3 top-3 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg transition-all duration-200 hover:scale-110 flex items-center justify-center opacity-80 hover:opacity-100"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-xs font-medium text-gray-700">
                              صورة المنشور
                            </div>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-4 border-t border-gray-200">
              <ButtonWithLoading
                type="submit"
                size="lg"
                className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                loading={loading}
              >
                <span className="flex items-center justify-center gap-2">
                  {!loading && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  )}
                  {values ? "تحديث المنشور" : "نشر الآن"}
                </span>
              </ButtonWithLoading>
            </div>
          </form>
        </FormLoading>
      </Form>
    </div>
  )
}
