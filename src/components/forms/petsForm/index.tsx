import { zodResolver } from "@hookform/resolvers/zod"
import { Heart, Image, PawPrint, Scale, Upload, X } from "lucide-react"
import { toast } from "sonner"

import { useRef, useState } from "react"
import { useForm } from "react-hook-form"

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
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<typePetFormSchema>({
    resolver: zodResolver(PetsFormSchema),
    values: {
      name: values?.name || "",
      petImage: values?.petImage ?? "",
      gender: values?.gender || "",
      weight: values?.weight|| 0,
      type: values?.type || "",
    },
  })

  const handleImageChange = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      form.setValue("petImage", file)
      setPreviewImage(URL.createObjectURL(file))
    } else {
      toast.error("يرجى اختيار ملف صورة صالح")
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleImageChange(file)
  }

  const handleDropZoneClick = () => {
    fileInputRef.current?.click()
  }

  const removeImage = () => {
    form.setValue("petImage", "")
    setPreviewImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

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
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
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
                {/* Pet Image Upload */}
                <div className="space-y-6">
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
                          <div className="w-full">
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
                                className={`group relative overflow-hidden border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 ${
                                  isDragOver
                                    ? "border-blue-500 bg-blue-50 scale-105 shadow-lg"
                                    : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 hover:scale-105"
                                }`}
                                onClick={handleDropZoneClick}
                                onDragOver={(e) => {
                                  e.preventDefault()
                                  setIsDragOver(true)
                                }}
                                onDragLeave={() => setIsDragOver(false)}
                                onDrop={(e) => {
                                  e.preventDefault()
                                  setIsDragOver(false)
                                  const file = e.dataTransfer.files?.[0]
                                  if (file) handleImageChange(file)
                                }}
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <Upload className="mx-auto h-16 w-16 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                                <p className="mt-4 text-xl font-medium text-gray-700">اسحب الصورة هنا</p>
                                <p className="mt-2 text-sm text-gray-500">أو اضغط للاختيار من جهازك</p>
                                <p className="mt-2 text-xs text-gray-400">PNG, JPG حتى 10MB</p>
                              </div>
                            ) : (
                              <div className="relative w-full max-w-md mx-auto group">
                                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                                  <img
                                    src={previewImage || (typeof field.value === "string" ? field.value : "")}
                                    alt="صورة الحيوان"
                                    className="w-full h-64 sm:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                                  />
                                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <button
                                  type="button"
                                  onClick={removeImage}
                                  className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
                                >
                                  <X className="h-5 w-5" />
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
