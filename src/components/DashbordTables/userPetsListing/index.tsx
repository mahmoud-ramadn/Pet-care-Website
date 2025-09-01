import { useMutation } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { CatIcon, MoreVerticalIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";



import { Suspense, lazy, useMemo, useState } from "react";



import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";



import { DeletePet } from "@/apis/pet";
import { useMyPets } from "@/hooks/pet";
import { usePagination } from "@/hooks/usePagination";
import Pagination from "@/components/common/Pagination";





const PetAddEditDialog = lazy(() => import("./PetAddEditDialog"))

export default function UserPetsListing() {
  const { value: pet, loading, retry } = useMyPets()

  const totalItems = Array.isArray(pet) ? pet.length : 0

  const pagination = usePagination({
    totalItems,
    defaultItemsPerPage: 5,
      defaultPage: 1,
    })
  
    
  const [open, setOpen] = useState(false)

  const [petItem, setPet] = useState<PetItem>()

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
                <DropdownMenuItem
                  onClick={() => MakeDeletPet(pet?._id ?? "")}
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


  const paginatedData = Array.isArray(pet) ? pet.slice(pagination.startIndex, pagination.endIndex) : []


  return (
    <div className="space-y-6">
      <Button
        onClick={() => {
          setOpen(true)
        }}
        className="flex items-center gap-3 cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 group"
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-lg ">
          <CatIcon className="size-4 " />
        </div>
        <span className="font-medium">Add Pets</span>
      </Button>
      <DataTable columns={columns} loading={loading} data={paginatedData} />
      <Suspense>
        <PetAddEditDialog
          pet={petItem}
          open={open}
          setOpen={setOpen}
          onComplete={() => {
            retry()
            setPet(undefined)
            setOpen(false)
          }}
        />
      </Suspense>
<Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        itemsPerPage={pagination.itemsPerPage}
        totalItems={totalItems}
        startIndex={pagination.startIndex}
        endIndex={pagination.endIndex}
        canGoNext={pagination.canGoNext}
        canGoPrevious={pagination.canGoPrevious}
        onPageChange={pagination.setCurrentPage}
        onItemsPerPageChange={pagination.setItemsPerPage}
        onNextPage={pagination.goToNextPage}
        onPreviousPage={pagination.goToPreviousPage}
        getVisiblePages={pagination.getVisiblePages}
      />
    </div>
  )
}