import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"

import PetsForm from "@/components/forms/petsForm"

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
        <DialogHeader>
        </DialogHeader>
        <PetsForm isEdit={isEdit} onComplete={onComplete} pet={pet} />
      </DialogContent>
    </Dialog>
  )
}
