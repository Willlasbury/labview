import * as React from "react"
import { Label } from "@/components/subComp/label"
import { Input } from "@/components/subComp/input"
// import { Tooltip, TooltipTrigger, TooltipPortal, TooltipArrow, TooltipContent, TooltipProvider } from "../ui/tooltip"
import TooltipWrapper from "./ToolTipWrapper"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string
  unit?: string
  description?: string
  min?: number
  max?: number
  step?: number
  value: number
  setValue: (val: number) => void
}

export default function LabelInput({
  title,
  unit = undefined,
  description,
  min,
  max,
  step,
  value,
  setValue,
}: InputProps) {

  return (
    <div className="flex flex-row mb-1 md:max-w-96">
      <TooltipWrapper text={description}>
        <Label htmlFor={title} className="text-slate-700 px-2 pb-1 text-lg font-semibold">
          {title}{unit && ` (${unit})`}:
        </Label>
      </TooltipWrapper>
      <Input
        type={'number'}
        id={title}
        value={value}
        max={max}
        min={min}
        step={step}
        className={"block h-6 w-16 text-right text-black text-lg rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm dark:focus:border-gray-50 dark:focus:ring-gray-50"}
        onChange={(e) => setValue(Number(e.target.value))}
      />

    </div>
  )
}