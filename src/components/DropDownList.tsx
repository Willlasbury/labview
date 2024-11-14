import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/subComp/select"

type DropDownListProps = {
  setItems: (n: String) => void
}

export function DropdownList({ setItems }: DropDownListProps) {

  return (
    <div className="selector">
      <Select onValueChange={(item) => setItems(item)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Amplitude" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
            <SelectItem value="grape">Grape</SelectItem>
            <SelectItem value="pear">Pear</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}