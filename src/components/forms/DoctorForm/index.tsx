import { zodResolver } from "@hookform/resolvers/zod"
import { Camera, FileText, Heart, ImagePlus, Phone, Plus, Star, Stethoscope, User, X } from "lucide-react"
import { toast } from "sonner"

import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"

import ImageUploadField from "@/components/ui/ImageUploadField"
import { Badge } from "@/components/ui/badge"
import { ButtonWithLoading } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormLoading, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { CreateDoctor } from "@/apis/doctors"

import { DoctorFormSchema, type typeDoctorFormSchema } from "./shecma"

// Predefined options

const PET_TYPES_OPTIONS = [
  { value: "dogs", label: "كلاب", emoji: "🐕" },
  { value: "cats", label: "قطط", emoji: "🐱" },
  { value: "birds", label: "طيور", emoji: "🐦" },
  { value: "rabbits", label: "أرانب", emoji: "🐰" },
  { value: "fish", label: "أسماك", emoji: "🐠" },
  { value: "reptiles", label: "زواحف", emoji: "🦎" },
  { value: "hamsters", label: "هامستر", emoji: "🐹" },
  { value: "horses", label: "خيول", emoji: "🐴" },
]

const SPECIALIZATIONS_OPTIONS = [
  { value: "general", label: "طب عام", emoji: "🏥" },
  { value: "surgery", label: "جراحة", emoji: "🔪" },
  { value: "dentistry", label: "طب أسنان", emoji: "🦷" },
  { value: "cardiology", label: "أمراض القلب", emoji: "❤️" },
  { value: "dermatology", label: "أمراض جلدية", emoji: "🩺" },
  { value: "orthopedics", label: "عظام", emoji: "🦴" },
  { value: "ophthalmology", label: "عيون", emoji: "👁️" },
  { value: "emergency", label: "طوارئ", emoji: "🚨" },
  { value: "nutrition", label: "تغذية", emoji: "🥗" },
  { value: "behavior", label: "سلوك", emoji: "🧠" },
]

type Props = {
  values?: typeDoctorFormSchema
  onSuccess?: () => void
}

export default function DoctorForm({ values, onSuccess }: Props) {
  const [loading, setLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [imagesPreview, setImagesPreview] = useState<{ file: File; preview: string }[]>([])
  const [isMultiDragOver, setIsMultiDragOver] = useState(false)
  const [newPetType, setNewPetType] = useState("")
  const [newSpecialization, setNewSpecialization] = useState("")

  const multiFilesInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<typeDoctorFormSchema>({
    resolver: zodResolver(DoctorFormSchema),
    defaultValues: {
      name: values?.name || "",
      doctorImage: values?.doctorImage || undefined,
      description: values?.description || "",
      about: values?.about || "",
      rate: values?.rate || 1,
      phone: values?.phone || "",
      accepted_pet_types: values?.accepted_pet_types || [],
      imagesProfile: values?.imagesProfile || [],
      specialized_in: values?.specialized_in || [],
    },
  })

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (previewImage && previewImage.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage)
      }
      imagesPreview.forEach((img) => {
        if (img.preview.startsWith("blob:")) {
          URL.revokeObjectURL(img.preview)
        }
      })
    }
  }, [])

  // Initialize preview image if values exist
  useEffect(() => {
    if (values?.doctorImage && typeof values.doctorImage === "string") {
      setPreviewImage(values.doctorImage)
    }
  }, [values?.doctorImage])

  // Single image handlers

  // Multiple images handlers
  const handleMultiImagesChange = (files: FileList) => {
    const validFiles: { file: File; preview: string }[] = []

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        validFiles.push({
          file,
          preview: URL.createObjectURL(file),
        })
      }
    })

    if (validFiles.length > 0) {
      const newImages = [...imagesPreview, ...validFiles]
      setImagesPreview(newImages)
      form.setValue(
        "imagesProfile",
        newImages.map((img) => img.file)
      )
    } else {
      toast.error("يرجى اختيار ملفات صور صالحة")
    }
  }

  const handleMultiFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) handleMultiImagesChange(files)
  }

  const handleMultiDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsMultiDragOver(true)
  }

  const handleMultiDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsMultiDragOver(false)
  }

  const handleMultiDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsMultiDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) handleMultiImagesChange(files)
  }

  const removeMultiImage = (index: number) => {
    // Clean up object URL
    const imageToRemove = imagesPreview[index]
    if (imageToRemove?.preview.startsWith("blob:")) {
      URL.revokeObjectURL(imageToRemove.preview)
    }

    const newImages = imagesPreview.filter((_, i) => i !== index)
    setImagesPreview(newImages)
    form.setValue(
      "imagesProfile",
      newImages.map((img) => img.file)
    )
  }

  // Multi-select handlers
  const togglePetType = (petType: string) => {
    const currentTypes = form.getValues("accepted_pet_types")
    const newTypes = currentTypes.includes(petType)
      ? currentTypes.filter((type) => type !== petType)
      : [...currentTypes, petType]
    form.setValue("accepted_pet_types", newTypes)
  }

  const addCustomPetType = () => {
    if (newPetType.trim() && !form.getValues("accepted_pet_types").includes(newPetType.trim())) {
      const currentTypes = form.getValues("accepted_pet_types")
      form.setValue("accepted_pet_types", [...currentTypes, newPetType.trim()])
      setNewPetType("")
    }
  }

  const toggleSpecialization = (specialization: string) => {
    const currentSpecs = form.getValues("specialized_in")
    const newSpecs = currentSpecs.includes(specialization)
      ? currentSpecs.filter((spec) => spec !== specialization)
      : [...currentSpecs, specialization]
    form.setValue("specialized_in", newSpecs)
  }

  const addCustomSpecialization = () => {
    if (newSpecialization.trim() && !form.getValues("specialized_in").includes(newSpecialization.trim())) {
      const currentSpecs = form.getValues("specialized_in")
      form.setValue("specialized_in", [...currentSpecs, newSpecialization.trim()])
      setNewSpecialization("")
    }
  }

  async function onSubmit(inputs: typeDoctorFormSchema) {
    try {
      setLoading(true)
      const formData = new FormData()

      formData.append("name", inputs.name)
      formData.append("description", inputs.description)
      formData.append("about", inputs.about)
      formData.append("phone", inputs.phone)
      formData.append("rate", String(inputs.rate))

      // Send as comma-separated strings instead of arrays
      formData.append("accepted_pet_types", inputs.accepted_pet_types.join(","))
      formData.append("specialized_in", inputs.specialized_in.join(","))

      if (inputs.doctorImage instanceof File) {
        formData.append("doctorImage", inputs.doctorImage)
      }

      if (Array.isArray(inputs.imagesProfile)) {
        inputs.imagesProfile.forEach((img) => {
          if (img instanceof File) {
            formData.append("imagesProfile", img)
          }
        })
      }

      await CreateDoctor(formData as Doctor)
      toast.success("تم إضافة الدكتور بنجاح")
      onSuccess?.()
    } catch (error) {
      console.error(error)
      toast.error("فشل إضافة الدكتور، خطأ غير متوقع")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full ">
      <Form value={form}>
        <FormLoading loading={loading}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
            {/* Basic Information Card */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  المعلومات الأساسية
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                          <User className="w-3 h-3 sm:w-4 sm:h-4" />
                          اسم الدكتور
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="د. أحمد محمد" className="h-10 sm:h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                          <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                          رقم الهاتف
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="+201234567890" className="h-10 sm:h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="lg:col-span-2">
                    <FormField
                      control={form.control}
                      name="rate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                            التقييم
                          </FormLabel>
                          <FormControl>
                            <div className="flex flex-wrap gap-2">
                              {[1, 2, 3, 4, 5].map((rate) => (
                                <button
                                  key={rate}
                                  type="button"
                                  onClick={() => field.onChange(rate)}
                                  className={`p-2 rounded-lg transition-all ${
                                    field.value >= rate
                                      ? "bg-yellow-100 text-yellow-600"
                                      : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                                  }`}
                                >
                                  <Star
                                    className={`w-5 h-5 sm:w-6 sm:h-6 ${field.value >= rate ? "fill-current" : ""}`}
                                  />
                                </button>
                              ))}
                              <span className="flex items-center ml-2 text-sm text-gray-600">{field.value}/5</span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:gap-6 mt-6">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                          <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                          الوصف المختصر
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="وصف مختصر عن الطبيب وخبراته..."
                            className="min-h-[80px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="about"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-sm sm:text-base">
                          <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                          نبذة تفصيلية
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="نبذة تفصيلية عن الطبيب، مؤهلاته، وسنوات خبرته..."
                            className="min-h-[120px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pet Types Card */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                  أنواع الحيوانات المقبولة
                </h3>

                <FormField
                  control={form.control}
                  name="accepted_pet_types"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-4">
                        {/* Selected badges */}
                        {field.value.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {field.value.map((type) => {
                              const option = PET_TYPES_OPTIONS.find((opt) => opt.value === type)
                              return (
                                <Badge
                                  key={type}
                                  variant="default"
                                  className="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm cursor-pointer hover:bg-red-100 hover:text-red-700 transition-colors"
                                  onClick={() => togglePetType(type)}
                                >
                                  {option?.emoji} {option?.label || type}
                                  <X className="w-3 h-3 ml-1" />
                                </Badge>
                              )
                            })}
                          </div>
                        )}

                        {/* Available options */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                          {PET_TYPES_OPTIONS.filter((option) => !field.value.includes(option.value)).map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => togglePetType(option.value)}
                              className="flex items-center gap-2 p-2 sm:p-3 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-right"
                            >
                              <span className="text-base sm:text-lg">{option.emoji}</span>
                              <span className="text-xs sm:text-sm font-medium truncate">{option.label}</span>
                            </button>
                          ))}
                        </div>

                        {/* Custom input */}
                        <div className="flex flex-col sm:flex-row gap-2 mt-4">
                          <Input
                            placeholder="أضف نوع حيوان جديد..."
                            value={newPetType}
                            onChange={(e) => setNewPetType(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCustomPetType())}
                            className="flex-1"
                          />
                          <button
                            type="button"
                            onClick={addCustomPetType}
                            disabled={!newPetType.trim()}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                          >
                            <Plus className="w-4 h-4" />
                            إضافة
                          </button>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Specializations Card */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5" />
                  التخصصات الطبية
                </h3>

                <FormField
                  control={form.control}
                  name="specialized_in"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-4">
                        {/* Selected badges */}
                        {field.value.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {field.value.map((spec) => {
                              const option = SPECIALIZATIONS_OPTIONS.find((opt) => opt.value === spec)
                              return (
                                <Badge
                                  key={spec}
                                  variant="secondary"
                                  className="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm cursor-pointer hover:bg-red-100 hover:text-red-700 transition-colors"
                                  onClick={() => toggleSpecialization(spec)}
                                >
                                  {option?.emoji} {option?.label || spec}
                                  <X className="w-3 h-3 ml-1" />
                                </Badge>
                              )
                            })}
                          </div>
                        )}

                        {/* Available options */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                          {SPECIALIZATIONS_OPTIONS.filter((option) => !field.value.includes(option.value)).map(
                            (option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => toggleSpecialization(option.value)}
                                className="flex items-center gap-2 p-2 sm:p-3 border-2 border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors text-right"
                              >
                                <span className="text-base sm:text-lg">{option.emoji}</span>
                                <span className="text-xs sm:text-sm font-medium truncate">{option.label}</span>
                              </button>
                            )
                          )}
                        </div>

                        {/* Custom input */}
                        <div className="flex flex-col sm:flex-row gap-2 mt-4">
                          <Input
                            placeholder="أضف تخصص جديد..."
                            value={newSpecialization}
                            onChange={(e) => setNewSpecialization(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCustomSpecialization())}
                            className="flex-1"
                          />
                          <button
                            type="button"
                            onClick={addCustomSpecialization}
                            disabled={!newSpecialization.trim()}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                          >
                            <Plus className="w-4 h-4" />
                            إضافة
                          </button>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Images Card */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                  الصور
                </h3>

                {/* Single Image */}

                <FormField
                  control={form.control}
                  name="doctorImage"
                  render={({ field }) => (
                    <ImageUploadField
                      label="الصورة الرئيسية"
                      value={field.value}
                      onChange={(file) => field.onChange(file)}
                    />
                  )}
                />

                {/* Multiple Images */}
                <FormField
                  control={form.control}
                  name="imagesProfile"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-base sm:text-lg font-medium">صور إضافية</FormLabel>
                      <FormControl>
                        <div>
                          <Input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleMultiFileInputChange}
                            ref={multiFilesInputRef}
                            className="hidden"
                          />

                          <div
                            className={`border-2 border-dashed rounded-xl p-4 sm:p-6 text-center cursor-pointer transition-all duration-300 ${
                              isMultiDragOver
                                ? "border-green-400 bg-green-50 scale-105"
                                : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                            }`}
                            onDragOver={handleMultiDragOver}
                            onDragLeave={handleMultiDragLeave}
                            onDrop={handleMultiDrop}
                            onClick={() => multiFilesInputRef.current?.click()}
                          >
                            <div className="flex flex-col items-center justify-center space-y-3">
                              <div className="p-3 bg-gray-100 rounded-full">
                                <ImagePlus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                              </div>
                              <div className="text-gray-600">
                                <p className="text-sm sm:text-base font-medium">اسحب الصور هنا أو اضغط للاختيار</p>
                                <p className="text-xs sm:text-sm text-gray-500 mt-1">يمكنك اختيار عدة صور</p>
                              </div>
                            </div>
                          </div>

                          {imagesPreview.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6">
                              {imagesPreview.map((image, index) => (
                                <div key={index} className="relative group">
                                  <img
                                    src={image.preview}
                                    alt={`preview-${index}`}
                                    className="w-full h-24 sm:h-32 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                                  />
                                  <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 rounded-lg flex items-center justify-center">
                                    <button
                                      type="button"
                                      onClick={() => removeMultiImage(index)}
                                      className="opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center transition-all duration-300"
                                    >
                                      <X className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center pt-4 sm:pt-6">
              <ButtonWithLoading
                type="submit"
                size="lg"
                className="w-full sm:w-auto sm:min-w-[300px] h-11 sm:h-12 text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                loading={loading}
              >
                {values ? "تحديث بيانات الطبيب" : "إضافة طبيب جديد"}
              </ButtonWithLoading>
            </div>
          </form>
        </FormLoading>
      </Form>
    </div>
  )
}
