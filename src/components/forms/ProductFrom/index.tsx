import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { useState } from "react"
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue("productImage", file)
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  async function onSubmit(inputs: TypeProductFormSchema) {
    try {
      setLoading(true)

      const formData = new FormData()

      // Append all fields to FormData
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
                  <FormItem>
                    <FormLabel>صورة المنتج</FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          ref={field.ref}
                          onBlur={field.onBlur}
                        />
                        {previewImage && (
                          <div className="mt-2">
                            <img src={previewImage} alt="Preview" className="h-20 w-20 object-cover rounded" />
                          </div>
                        )}
                        {typeof field.value === "string" && !previewImage && field.value && (
                          <div className="mt-2">
                            <img src={field.value} alt="Current" className="h-20 w-20 object-cover rounded" />
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
