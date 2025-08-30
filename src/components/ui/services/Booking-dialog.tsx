
import { Suspense, lazy } from "react"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const BookingServicesForm = lazy(() => import("@/components/forms/BookingServicesForm"))

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  isEdit?: boolean
  onComplete?: (value?: PetApiResponse) => void
  pet?: PetItem
}

export function BookingDialog({ open, setOpen }: Readonly<Props>) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book a Service</DialogTitle>
          <DialogDescription>Select a service and choose a date</DialogDescription>
        </DialogHeader>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full w-full">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
            </div>
          }
        >
          <BookingServicesForm />
        </Suspense>
      </DialogContent>
    </Dialog>
  )
}
