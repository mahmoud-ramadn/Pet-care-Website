import { useMutation } from "@tanstack/react-query"
import type { ColumnDef } from "@tanstack/react-table"
import { CatIcon, Edit, MoreVerticalIcon, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import DataTable from "@/components/ui/data-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { DeletePet } from "@/apis/pet"
import { useMyPets } from "@/hooks/pet"

export default function UserPetsListing() {
  const { value: pet, loading, retry } = useMyPets()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  const { mutate: MakeDeletPet } = useMutation({
    mutationFn: async (id: string) => {
      if (!id) throw new Error("Pet ID is required")
      await DeletePet(id)
    },
    onSuccess: () => {
      toast.success("تم حذف الحيوان بنجاح ✅")
      retry()
    },
    onError: () => {
      toast.error("فشل حذف الحيوان ❌")
    },
  })

  const columns: ColumnDef<PetItem>[] = useMemo(
    () => [
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const pet = row.original

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0 hover:bg-blue-50 hover:border-blue-200 border border-transparent rounded-full transition-all duration-200 hover:shadow-sm group"
                >
                  <MoreVerticalIcon className="size-4 text-gray-500 group-hover:text-blue-600 transition-colors duration-200" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-48 rounded-xl shadow-xl border border-gray-200 p-2 bg-white/95 backdrop-blur-sm">
                <DropdownMenuItem className="flex items-center gap-3 cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-green-50 hover:text-green-700 transition-all duration-150 group">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-100 group-hover:bg-green-200">
                    <CatIcon className="size-4 text-green-600" />
                  </div>
                  <span className="font-medium">Add Pets</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex items-center gap-3 cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-blue-50 hover:text-blue-700 transition-all duration-150 group">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 group-hover:bg-blue-200">
                    <Edit className="size-4 text-blue-600" />
                  </div>
                  <span className="font-medium">Edit Pets</span>
                </DropdownMenuItem>

                <div className="my-1">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                </div>

                <DropdownMenuItem
                  onClick={() => MakeDeletPet(pet?._id ??'')}
                  className="flex items-center gap-3 cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-red-50 hover:text-red-700 group"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 group-hover:bg-red-200">
                    <Trash2 className="size-4 text-red-600" />
                  </div>
                  <span className="font-medium text-red-600">Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
      { accessorKey: "name", header: "Pet Name" },
      { accessorKey: "type", header: "Pet Type" },
      { accessorKey: "gender", header: "Gender" },
      { accessorKey: "weight", header: "Weight" },
      {
        accessorKey: "petImage",
        header: "Pet Image",
        cell: ({ row }) => {
          const pet = row.original
          if (!pet.petImage) return <span className="text-gray-400">لا يوجد</span>
          return (
            <img className="size-20 rounded-md object-cover border" src={pet.petImage} alt={pet?.id} loading="lazy" />
          )
        },
      },
    ],
    [MakeDeletPet]
  )

  // pagination
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = pet?.slice(startIndex, endIndex) || []
  const totalPages = pet ? Math.ceil(pet.length / itemsPerPage) : 1

  return (
    <div className="space-y-7">
      <DataTable columns={columns} loading={loading} data={paginatedData} />

      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="itemsPerPage">Show:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value))
              setCurrentPage(1)
            }}
            className="border rounded px-2 py-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center items-center gap-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}
