import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";



import ProductFrom from "@/components/forms/ProductFrom";
import { useState } from "react";





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
        <ProductFrom categories={[...categoriesOptions]}
           onSuccess={() => setOpen(false)} 
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}