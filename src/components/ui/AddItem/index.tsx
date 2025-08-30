import { Suspense, lazy, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import Loader from "../loader"

const ProductForm = lazy(() => import("@/components/forms/ProductFrom"))

export function AddItemDialog() {
  const [open, setOpen] = useState(false)

  const categoriesOptions = [
    { label: "MEDICINE", value: "medicine" },
    { label: "FOOD", value: "food" },
    { label: "TOYS", value: "toys" },
    { label: "GROOMING", value: "grooming" },
    { label: "ACCESSORIES", value: "accessories" },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className=" p-5">Add new product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new product</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
        </DialogHeader>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full w-full">
              <Loader />
            </div>
          }
        >
          <ProductForm categories={[...categoriesOptions]} onSuccess={() => setOpen(false)} />
        </Suspense>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
