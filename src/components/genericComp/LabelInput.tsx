import * as React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
// import { Tooltip, TooltipTrigger, TooltipPortal, TooltipArrow, TooltipContent, TooltipProvider } from "../ui/tooltip"
import TooltipWrapper from "./ToolTipWrapper"
import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string
  unit?: string
  description?: string
  value: number
  setValue: (val: number) => void
}

export default function LabelInput({
  title,
  unit,
  description,
  value,
  setValue,
  className,
  ...props
}: InputProps) {


  return (
    <div className="flex flex-row w-full max-w-sm space-y-2">
    <TooltipWrapper text={description}>
      <Label htmlFor={title} className="flex text-center items-center pr-2 text-lg font-medium text-gray-200 dark:text-gray-300">
        {title}
      </Label>
    </TooltipWrapper>
      <Input
        type={typeof value}
        id={title}
        className={cn(
          "block h-8 rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm dark:focus:border-gray-50 dark:focus:ring-gray-50",
          className
        )}
        {...props}
      />

    </div>
  )
}