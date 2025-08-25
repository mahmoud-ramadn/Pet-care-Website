import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";



import { useRef, useState } from "react";
import { useForm } from "react-hook-form";



import { ButtonWithLoading } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormLoading, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";



import { PetsFormSchema, type typePetFormSchema } from "./shema";





type props = {
  isEdit?: boolean
  onComplete?: (value?: PetApiResponse) => void
  pet?: PetItem
  loading?: boolean
  values?: PetItem
}

export default function PetsForm({ isEdit = false, onComplete, values, loading = false }: props) {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<typePetFormSchema>({
    resolver: zodResolver(PetsFormSchema),
    values: {
      name: values?.name ?? "",
      petImage: values?.petImage ?? "",
      gender: values?.gender ?? "",
      weight: values?.weight ?? 0,
      type: values?.type ?? "",
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
      let response
    console.log(inputs);
    
      toast.success(response)
      onComplete?.()
    } catch (error) {
      console.log(error)
      toast.error("حدث خطأ أثناء الحفظ")
    }
  }

  const title = (isEdit ? "تعديل" : "إضافة") + " حيوان"

  return (
    <div>
      <Form value={form}>
        <FormLoading loading={loading}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-6">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم الحيوان</FormLabel>
                  <FormControl>
                    <Input placeholder="اكتب اسم الحيوان" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Pet Image */}
            <FormField
              control={form.control}
              name="petImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>صورة الحيوان</FormLabel>
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
  <p className="text-gray-600">اسحب الصورة هنا أو اضغط للاختيار</p>
</div>




                      ) : (
                        <div className="relative w-full max-w-xs mx-auto">
                          <img
                            src={previewImage || (typeof field.value === "string" ? field.value : "")}
                            alt="صورة الحيوان"
                            className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </div>
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
                  <FormLabel>النوع</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع الحيوان" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cat">قطة</SelectItem>
                        <SelectItem value="dog">كلب</SelectItem>
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
                  <FormLabel>الجنس</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الجنس" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">ذكر</SelectItem>
                        <SelectItem value="female">أنثى</SelectItem>
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
                <FormItem>
                  <FormLabel>الوزن (كجم)</FormLabel>
                  <FormControl>
<Input
  type="number"
  placeholder="وزن الحيوان"
  {...field}
  onChange={(e) => field.onChange(e.target.valueAsNumber)}
/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ButtonWithLoading type="submit" size="lg" className="mt-6" loading={form.formState.isSubmitting}>
              {title}
            </ButtonWithLoading>
          </form>
        </FormLoading>
      </Form>
    </div>
  )
}