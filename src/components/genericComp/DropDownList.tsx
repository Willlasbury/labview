import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Label } from "@/components/ui/label"

type DropDownListProps = {
  title: string
  unit?: string
  valueOptions: Array<string>
  value?: any
  setValue: (value: any) => void;
}

export function DropdownList({ title, unit, valueOptions, setValue }: DropDownListProps) {
  const handleChange = (val: string) => {
    if (Number(val)) {
      return setValue(Number(val))
    }
    setValue(val)
  }
  return (
    <div className="flex flex-row mb-1 md:max-w-96">

      <Label htmlFor={title} className="min-w-56">
        {title} {unit && `(${unit})`}
      </Label>
      <Select onValueChange={(value) => handleChange(value)}>
        <SelectTrigger className="w-full min-w-56">
          <SelectValue placeholder={valueOptions[0]} />
        </SelectTrigger>
        <SelectContent >
          <SelectGroup>
            {valueOptions.map(item => {
              return <SelectItem key={item} value={item}>{item}</SelectItem>
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}