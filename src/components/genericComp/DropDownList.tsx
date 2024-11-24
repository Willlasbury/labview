import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/subComp/select"

import { Label } from "@/components/subComp/label"
import TooltipWrapper from "./ToolTipWrapper"

type DropDownListProps = {
  title: string
  description?: string
  unit?: string
  valueOptions: Array<string>
  defaultValue?: any
  setValue: (value: any) => void;
}

export default function DropdownList({ title, description, unit, defaultValue, valueOptions, setValue }: DropDownListProps) {
  const handleChange = (val: string) => {
    if (Number(val)) {
      return setValue(Number(val))
    }
    setValue(val)
  }
  return (
    <div className="flex flex-row mb-1">
      <TooltipWrapper text={description}>
        <Label htmlFor={title} className="">
          {title} {unit && `(${unit})`}
        </Label>
      </TooltipWrapper>
      <Select onValueChange={(value) => handleChange(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={defaultValue} />
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