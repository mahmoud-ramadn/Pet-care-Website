import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { useRef, useState } from "react"
import type { DragEvent } from "react"
import { useForm } from "react-hook-form"

import { ButtonWithLoading } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { FormControl, FormField, FormItem, FormLabel, FormLoading, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { CreateProducts } from "@/apis/product"

import { ProductFormSchema, type TypeProductFormSchema } from "./shema"

type Props = {
  values?: TypeProductFormSchema
  categories?: { label: string; value: string }[]
  onSuccess?: () => void
}

export default function ProductForm({ values, categories, onSuccess }: Props) {
  const [loading, setLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<TypeProductFormSchema>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      name: values?.name || "",
      desc: values?.desc || "",
      quantity: values?.quantity || 0,
      price: values?.price || 0,
      discount: values?.discount || 0,
      category: values?.category || "",
      productImage: values?.productImage || "",
    },
  })

  const handleImageChange = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      form.setValue("productImage", file)
      setPreviewImage(URL.createObjectURL(file))
    } else {
      toast.error("يرجى اختيار ملف صورة صالح")
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageChange(file)
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      handleImageChange(file)
    }
  }

  const handleDropZoneClick = () => {
    fileInputRef.current?.click()
  }

  const removeImage = () => {
    form.setValue("productImage", "")
    setPreviewImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  async function onSubmit(inputs: TypeProductFormSchema) {
    try {
      setLoading(true)

      const formData = new FormData()

      formData.append("name", inputs.name)
      formData.append("desc", inputs.desc)
      formData.append("price", inputs.price.toString())
      formData.append("quantity", inputs.quantity.toString())
      formData.append("discount", inputs.discount.toString())
      formData.append("category", inputs.category)

      if (inputs.productImage instanceof File) {
        formData.append("productImage", inputs.productImage)
      }

      await CreateProducts((formData as unknown as CreateProductInputs) ?? "")

      toast.success("تم اضافة المنتج بنجاح")
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error(error)
      toast.error("فشل اضافة المنتج خطا غير متوقع")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Form value={form}>
        <FormLoading loading={loading}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم المنتج</FormLabel>
                    <FormControl>
                      <Input placeholder="اسم المنتج" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="desc"
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
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الكمية</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="الكمية"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>السعر</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="السعر"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الخصم</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="الخصم"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>التصنيف</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر تصنيف المنتج" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="productImage"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>صورة المنتج</FormLabel>
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
                            className={`
                              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                              ${isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"}
                            `}
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
                                alt="صورة المنتج"
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
              {values ? "تحديث المنتج" : "إضافة منتج"}
            </ButtonWithLoading>
          </form>
        </FormLoading>
      </Form>
    </div>
  )
}
