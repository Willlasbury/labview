import * as React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
// import { Tooltip, TooltipTrigger, TooltipPortal, TooltipArrow, TooltipContent, TooltipProvider } from "../ui/tooltip"
import TooltipWrapper from "./ToolTipWrapper"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string
  unit?: string
  description?: string
  value: number
  setValue: (val: number) => void
}

export default function LabelInput({
  title,
  unit = undefined,
  description,
  value,
  setValue,
}: InputProps) {


  return (
    <div className="flex flex-row mb-1 md:max-w-96 ">
      <TooltipWrapper text={description}>
        <Label htmlFor={title}>
            {title} {unit && `(${unit})`}
        </Label>
      </TooltipWrapper>
      <Input
        type={typeof value}
        id={title}
        defaultValue={value}
        className={"block h-6 w-16 text-right text-black text-lg rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm dark:focus:border-gray-50 dark:focus:ring-gray-50"}
        onChange={(e) => setValue(Number(e.target.value))}
      />

    </div>
  )
}