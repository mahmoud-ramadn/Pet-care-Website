import type { ColumnDef } from "@tanstack/react-table"

import { useMemo } from "react"

import DataTable from "@/components/ui/data-table"

import Pagination from "@/components/common/Pagination"
import { useDoctors } from "@/hooks/doctors"

import { AddDoctorDialog } from "./AddDoctorDialog"

export default function DoctorsListing() {
  const { value: doctor, loading } = useDoctors()

  const columns: ColumnDef<Doctor>[] = useMemo(
    () => [
      {
        accessorKey: "phone",
        header: "Phone",
      },
      {
        accessorKey: "rate",
        header: "Rating",
      },
      {
        accessorKey: "specialized_in",
        header: "Specialized",
        cell: ({ row }) => {
          const product = row.original

          if (!product?.specialized_in || product.specialized_in.length === 0) {
            return <span className="text-gray-400">لا يوجد</span>
          }

          return (
            <div className="flex   justify-center   flex-wrap gap-2">
              {product.specialized_in.map((spec, index) => (
                <span key={index} className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                  {spec}
                </span>
              ))}
            </div>
          )
        },
      },
      {
        accessorKey: "imagesProfile",
        header: "Profile Images",
        cell: ({ row }) => {
          const images = row.original.imagesProfile

          if (!images || images.length === 0) {
            return <span className="text-gray-400">لايوجد</span>
          }

          return (
            <div className="flex gap-2">
              {images.slice(0, 3).map((img: string, idx: number) => (
                <img
                  key={idx}
                  src={img}
                  alt={`profile-${idx}`}
                  className="w-10 h-10 object-cover rounded-full border"
                />
              ))}
              {images.length > 3 && <span className="text-xs text-gray-500">+{images.length - 3}</span>}
            </div>
          )
        },
      },

      {
        accessorKey: "doctorImage",
        header: "Doctor Image",
        cell: ({ row }) => {
          const product = row.original
          if (!product?.doctorImage) return <span className=" text-gray-400"> لايوجد </span>

          return (
            <img className="size-20 rounded-md object-cover border" src={product?.doctorImage} alt={product?._id} />
          )
        },
        id: "product-image",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
    ],
    []
  )

  return (
    <div className=" space-y-7">
      <AddDoctorDialog />

      <DataTable columns={columns} loading={loading} data={doctor || []} />
      <Pagination totalItems={doctor?.length || 0} />
    </div>
  )
}
