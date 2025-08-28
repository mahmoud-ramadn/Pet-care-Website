import { Upload, X } from "lucide-react"

import { useEffect, useRef, useState } from "react"

import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type Props = {
  label?: string
  value?: File | string
  onChange: (file?: File) => void
}

export default function ImageUploadField({ label = "الصورة الرئيسية", value, onChange }: Props) {
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof value === "string") {
      setPreview(value)
    } else if (value instanceof File) {
      const url = URL.createObjectURL(value)
      setPreview(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setPreview(null)
    }
  }, [value])

  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      onChange(file)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const removeImage = () => {
    onChange(undefined)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <FormItem className="mb-6 sm:mb-8 ">
      <FormLabel className="text-base sm:text-lg font-medium">{label}</FormLabel>
      <FormControl>
        <div>
          <Input type="file" accept="image/*" onChange={handleInputChange} ref={fileInputRef} className="hidden" />

          {!preview ? (
            <div
              className={`border-2  border-dashed rounded-xl  p-6 sm:p-8 text-center cursor-pointer transition-all duration-300 ${
                isDragOver
                  ? "border-blue-400 bg-blue-50 scale-105"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }`}
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragOver(true)
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="p-4 bg-gray-100 rounded-full">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
                <div className="text-gray-600">
                  <p className="text-lg font-medium">اسحب الصورة هنا أو اضغط للاختيار</p>
                  <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF حتى 10MB</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative group">
              <div className="relative w-full max-w-sm mx-auto">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-64 object-cover rounded-xl border-4 border-gray-200 shadow-lg"
                />
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-xl flex items-center justify-center">
                  <button
                    type="button"
                    onClick={removeImage}
                    className="opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-blue-600 hover:text-blue-700 underline text-sm font-medium"
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
  )
}
