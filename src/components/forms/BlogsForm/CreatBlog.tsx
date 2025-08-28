import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { useState } from "react"
import { useForm } from "react-hook-form"

import ImageUploadField from "@/components/ui/ImageUploadField"
import { ButtonWithLoading } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormLoading, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { creatblog } from "@/apis/blogs"

import { BlogFormSchema, type TypeBlogFormSchema } from "./shema"

type Props = {
  values?: TypeBlogFormSchema
  onSuccess?: () => void
}

export default function CreateBlogForm({ values, onSuccess }: Props) {
  const [loading, setLoading] = useState(false)

  const form = useForm<TypeBlogFormSchema>({
    resolver: zodResolver(BlogFormSchema),
    defaultValues: {
      link: values?.link || "",
      discription: values?.discription || "",
      blogImage: values?.blogImage || "",
    },
  })

  async function onSubmit(inputs: TypeBlogFormSchema) {
    try {
      setLoading(true)
      const formData = new FormData()

      formData.append("discription", inputs.discription)
      formData.append("link", inputs.link)

      if (inputs.blogImage instanceof File) {
        formData.append("plogImage", inputs.blogImage) // ✅ corrected key
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
      <Form value={form}>
        <FormLoading loading={loading}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="discription"
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
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="blogImage"
                  render={({ field }) => (
                    <ImageUploadField
                      label="صورة المدونة"
                      value={field.value}
                      onChange={(file) => field.onChange(file)}
                    />
                  )}
                />
              </div>
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
