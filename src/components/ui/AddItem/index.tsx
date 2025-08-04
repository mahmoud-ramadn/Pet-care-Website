// import ProductFrom from "@/components/forms/ProductFrom"
import ProductFrom from "@/components/forms/ProductFrom"
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

export function AddItemDialog() {
const categoriesOptions = [
  { label: "MEDICINE", value: "medicine" },
  { label: "FOOD", value: "food" },
  { label: "TOYS", value: "toys" },
  { label: "GROOMING", value: "grooming" },
  { label: "ACCESSORIES", value: "accessories" },
];

  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add new product</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new product</DialogTitle>
            <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
          </DialogHeader>
          <ProductFrom categories={[...categoriesOptions]}/>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
