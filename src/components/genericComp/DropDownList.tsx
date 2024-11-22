import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
    <div className="flex flex-row w-full mx-1 mb-1 max-w-80">
      <h2 className="w-1/2  font-medium">{title} {unit && `(${unit})`}</h2>
      <Select onValueChange={(value) => handleChange(value)}>
        <SelectTrigger className="w-full ">
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