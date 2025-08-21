import type { ColumnDef } from "@tanstack/react-table"

import { useMemo } from "react"

import { formatPriceEGP } from "@/lib/FormatPriceEGp"

import { AddItemDialog } from "@/components/ui/AddItem"
import DataTable from "@/components/ui/data-table"

import { useProducts } from "@/hooks/product"

export default function ProductListing() {
  const { value: products, loading } = useProducts()

  const columns: ColumnDef<ProductData>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Product Name	",
      },
      {
        accessorKey: "desc",
        header: "Product Descriptions",
      },
      {
        accessorKey: "quantity",
        header: "quantity",
      },
      {
        accessorKey: "priceAfterDiscount",
        header: "Product Discount	",
      },
      {
        accessorKey: "price",

        header: "price",
        cell: ({ row }) => {
          const TotalPirc = row?.original.price
          if (!TotalPirc) return <span className="text-gray-400"> zero</span>

          return <span>{formatPriceEGP(TotalPirc)}</span>
        },
      },
      {
        accessorKey: "category",
        header: "category",
      },
      {
        accessorKey: "productImage",
        header: "Product Image",
        cell: ({ row }) => {
          const product = row.original
          if (!product?.productImage) return <span className=" text-gray-400"> لايوجد </span>

          return (
            <img className="size-20 rounded-md object-cover border" src={product?.productImage} alt={product?._id} />
          )
        },
        id: "product-image",
      },
    ],
    []
  )

  return (
    <div className=" space-y-7">
      <AddItemDialog />
      <DataTable columns={columns} loading={loading} data={products?.data ?? []} totalPages={products?.totalPages} />
    </div>
  )
}
