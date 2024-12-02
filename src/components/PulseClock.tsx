import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/subComp/select"
  
  import { Label } from "@/components/subComp/label"
import TooltipWrapper from "./genericComp/ToolTipWrapper"  
  type DropDownListProps = {
    title: string
    description?: string
    valueOptions: Array<string>
    defaultValue?: any
    setValue: (value: any) => void;
  }
  
  export default function PulseClockRatio({ title, description, defaultValue, valueOptions, setValue }: DropDownListProps) {
    const handleChange = (val: string) => {
      if (Number(val)) {
        return setValue(Number(val))
      }
      setValue(val)
    }
    return (
      <div className="flex flex-row p-2 bg-slate-200 w-full h-fit border-solid border-slate-200 border-2 rounded-md shadow-sm">
        <TooltipWrapper text={description}>
          <Label htmlFor={title} className="flex items-center text-xl font-semibold w-3/4">
            {title}
          </Label>
        </TooltipWrapper>
        <Select onValueChange={(value) => handleChange(value)}>
          <SelectTrigger className="w-16">
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