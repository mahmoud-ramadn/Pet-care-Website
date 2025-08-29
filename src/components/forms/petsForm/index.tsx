import { zodResolver } from "@hookform/resolvers/zod"
import { Heart, Image, PawPrint, Scale } from "lucide-react"
import { toast } from "sonner"

import { useState } from "react"
import { useForm } from "react-hook-form"

import ImageUpload from "@/components/ui/ImageUploadField"
import { ButtonWithLoading } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormLoading, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


import { AddPet } from "@/apis/pet"

import { PetsFormSchema, type typePetFormSchema } from "./shema"

type props = {
  isEdit?: boolean
  onComplete?: (value?: PetApiResponse) => void
  pet?: PetItem
  values?: PetItem
}

export default function PetsForm({ isEdit = false, onComplete, values }: props) {
  const [loading, setLoading] = useState(false)

  const form = useForm<typePetFormSchema>({
    resolver: zodResolver(PetsFormSchema),
    values: {
      name: values?.name || "",
      petImage: values?.petImage ?? "",
      gender: values?.gender || "",
      weight: values?.weight || 0,
      type: values?.type || "",
    },
  })

  async function onSubmit(inputs: typePetFormSchema) {
    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("name", inputs.name)
      formData.append("gender", inputs.gender)
      formData.append("weight", inputs.weight.toString())
      formData.append("type", inputs.type)

      if (inputs.petImage instanceof File) {
        formData.append("petImage", inputs.petImage)
      }

      await AddPet((formData as unknown as PetItem) ?? "")
      toast.success("تم اضافة حيوان")
      onComplete?.()
    } catch (error) {
      console.log(error)
      toast.error("حدث خطأ أثناء الحفظ")
    } finally {
      setLoading(false)
    }
  }

  const title = (isEdit ? "تعديل" : "إضافة") + " حيوان"

  return (
    <div>
      <Card className="shadow-xl border-0   light:bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
            <PawPrint className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {title}
          </CardTitle>
          <p className="text-gray-600 mt-2">أضف معلومات حيوانك الأليف الجديد</p>
        </CardHeader>

        <CardContent className="px-6 md:px-8 pb-12">
          <Form value={form}>
            <FormLoading loading={loading}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Pet Image Upload - now uses ImageUpload component */}
                <FormField
                  control={form.control}
                  name="petImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                        <Image className="h-5 w-5 text-blue-500" />
                        صورة الحيوان
                      </FormLabel>
                      <FormControl>
                        <ImageUpload value={field.value} onChange={(file) => field.onChange(file)} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="lg:col-span-2">
                        <FormLabel className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                          <Heart className="h-5 w-5 text-pink-500" />
                          اسم الحيوان
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="اكتب اسم حيوانك الأليف"
                            className="h-12 text-lg rounded-xl border-2 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Type */}
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                          <PawPrint className="h-5 w-5 text-green-500" />
                          النوع
                        </FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="h-12 text-lg rounded-xl border-2 focus:ring-2 focus:ring-blue-500/20">
                              <SelectValue placeholder="اختر نوع الحيوان" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                              <SelectItem value="cat" className="text-lg py-3">
                                🐱 قطة
                              </SelectItem>
                              <SelectItem value="dog" className="text-lg py-3">
                                🐶 كلب
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Gender */}
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                          <Heart className="h-5 w-5 text-purple-500" />
                          الجنس
                        </FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="h-12 text-lg rounded-xl border-2 focus:ring-2 focus:ring-blue-500/20">
                              <SelectValue placeholder="اختر الجنس" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                              <SelectItem value="male" className="text-lg py-3">
                                ♂️ ذكر
                              </SelectItem>
                              <SelectItem value="female" className="text-lg py-3">
                                ♀️ أنثى
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Weight */}
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem className="lg:col-span-2">
                        <FormLabel className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                          <Scale className="h-5 w-5 text-orange-500" />
                          الوزن (كجم)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="وزن الحيوان بالكيلوجرام"
                            className="h-12 text-lg rounded-xl border-2 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                            {...field}
                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <ButtonWithLoading
                    type="submit"
                    size="lg"
                    className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    loading={form.formState.isSubmitting}
                  >
                    <PawPrint className="mr-2 h-5 w-5" />
                    {title}
                  </ButtonWithLoading>
                </div>
              </form>
            </FormLoading>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
