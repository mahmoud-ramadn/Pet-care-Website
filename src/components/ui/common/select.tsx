import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type SelectListType = {
  placeholder: string
  selectList: string[]
  selectedValue: string
  className?: string
  handleValueChange: (value: string) => void
}

export default function SelectList({
  placeholder,
  handleValueChange,
  selectList,
  selectedValue,
}: Readonly<SelectListType>) {
  return (
    <Select onValueChange={handleValueChange} value={selectedValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {selectList.map((item) => (
          <SelectItem key={item} value={item}>
            {item.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
