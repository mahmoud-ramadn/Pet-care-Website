import { Suspense, lazy } from "react"

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import Loader from "@/components/ui/loader"

const PetsForm = lazy(() => import("@/components/forms/petsForm"))

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  isEdit?: boolean
  onComplete?: (value?: PetApiResponse) => void
  pet?: PetItem
}

export default function PetAddEditDialog({ open, setOpen, isEdit = false, onComplete, pet }: Readonly<Props>) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader></DialogHeader>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full w-full">
              <Loader />
            </div>
          }
        >
          <PetsForm isEdit={isEdit} onComplete={onComplete} pet={pet} />
        </Suspense>
      </DialogContent>
    </Dialog>
  )
}
