import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";



import PetsForm from "@/components/forms/petsForm";





type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  isEdit?: boolean
  onComplete?: (value?: PetApiResponse) => void
  pet?:PetItem
}

export default function PetAddEditDialog({ open, setOpen, isEdit = false,onComplete ,pet }: Readonly<Props>) {
  const title = (isEdit ? "تعديل" : " إضافة "  ) + "pet"

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <PetsForm isEdit={isEdit} onComplete={onComplete} pet={pet} />
      </DialogContent>
    </Dialog>
  )
}