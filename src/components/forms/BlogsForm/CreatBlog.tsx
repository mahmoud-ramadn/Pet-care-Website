import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";



import { useRef, useState } from "react";
import { useForm } from "react-hook-form";



import { ButtonWithLoading } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormLoading, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";



import { creatblog } from "@/apis/blogs";



import { BlogFormSchema, type TypeBlogFormSchema } from "./shema";





type Props = {
  values?: TypeBlogFormSchema
  onSuccess?: () => void
}

export default function CreateBlogForm({ values, onSuccess }: Props) {
  const [loading, setLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<TypeBlogFormSchema>({
    resolver: zodResolver(BlogFormSchema),
    defaultValues: {
      link: values?.link || "",
      description: values?.description || "",
      blogImage: values?.blogImage || "",
    },
  })

  const handleImageChange = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      form.setValue("blogImage", file)
      setPreviewImage(URL.createObjectURL(file))
    } else {
      toast.error("يرجى اختيار ملف صورة صالح")
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleImageChange(file)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) handleImageChange(files[0])
  }

  const handleDropZoneClick = () => {
    fileInputRef.current?.click()
  }

  const removeImage = () => {
    form.setValue("blogImage", "")
    setPreviewImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  async function onSubmit(inputs: TypeBlogFormSchema) {
    try {
      setLoading(true)
      const formData = new FormData()

      formData.append("discription", inputs.description)
      formData.append("link", inputs.link)

      if (inputs.blogImage instanceof File) {
        formData.append("plogImage", inputs.blogImage)
      }

      await creatblog(formData as Blog)

      toast.success("تم إضافة المدونة بنجاح")
      onSuccess?.()
    } catch (error) {
      console.error(error)
      toast.error("فشل إضافة المدونة، خطأ غير متوقع")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Form  value={form}>
        <FormLoading loading={loading}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الوصف</FormLabel>
                    <FormControl>
                      <Input placeholder="الوصف" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الرابط</FormLabel>
                    <FormControl>
                      <Input placeholder="رابط المدونة" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="blogImage"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>صورة المدونة</FormLabel>
                    <FormControl>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileInputChange}
                          ref={(e) => {
                            fileInputRef.current = e
                            field.ref(e)
                          }}
                          onBlur={field.onBlur}
                          className="hidden"
                        />

                        {!previewImage && !field.value ? (
                          <div
                            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                              isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={handleDropZoneClick}
                          >
                            <div className="flex flex-col items-center justify-center space-y-2">
                              <svg
                                className="w-12 h-12 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 48 48"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                />
                              </svg>
                              <div className="text-gray-600">
                                <p className="font-medium">اسحب الصورة هنا أو اضغط للاختيار</p>
                                <p className="text-sm text-gray-500">PNG, JPG, GIF حتى 10MB</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="relative">
                            <div className="relative w-full max-w-xs mx-auto">
                              <img
                                src={previewImage || (typeof field.value === "string" ? field.value : "")}
                                alt="صورة المدونة"
                                className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                              />
                              <button
                                type="button"
                                onClick={removeImage}
                                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold transition-colors"
                              >
                                ×
                              </button>
                            </div>
                            <div className="mt-2 text-center">
                              <button
                                type="button"
                                onClick={handleDropZoneClick}
                                className="text-sm text-blue-600 hover:text-blue-700 underline"
                              >
                                تغيير الصورة
                              </button>
                            </div>
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
              {values ? "تحديث المدونة" : "إضافة مدونة"}
            </ButtonWithLoading>
          </form>
        </FormLoading>
      </Form>
    </div>
  )
}