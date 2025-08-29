import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";





type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  isEdit?: boolean
    petId?: string | null
  onComplete?: (value?: PetApiResponse) => void
}

export default function PetEditDialog({ open, setOpen, petId }: Readonly<Props>) {
console.log(petId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader></DialogHeader>
        <h1>Edit</h1>
        {/* <PetsForm isEdit={isEdit} onComplete={onComplete} pet={pet} /> */}
      </DialogContent>
    </Dialog>
  )
}