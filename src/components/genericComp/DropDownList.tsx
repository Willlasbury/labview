import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/subComp/select"
import { Dispatch, SetStateAction } from "react"

type DropDownListProps = {
  title: string
  unit?: string
  valueOptions: Array<string>
  value?: number
  setValue:  (value: number) => void;
}

export function DropdownList({title, unit, valueOptions, value, setValue }: DropDownListProps) {

  return (
    <div className="selector">
      <h2>{title}({unit})</h2>
      <Select onValueChange={(value) => setValue(Number(value))}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={valueOptions[0]} />
        </SelectTrigger>
        <SelectContent>
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