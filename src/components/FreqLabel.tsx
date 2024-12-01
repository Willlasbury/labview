import * as React from "react"
import { Label } from "@/components/subComp/label"
import { Input } from "@/components/subComp/input"
// import { Tooltip, TooltipTrigger, TooltipPortal, TooltipArrow, TooltipContent, TooltipProvider } from "../ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/subComp/select"

import TooltipWrapper from "./genericComp/ToolTipWrapper"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    title: string
    unit: string
    description?: string
    min?: number
    max?: number
    step?: number
    value: number
    setValue: (val: number, unit: string) => void
    freqUnit: string
    setFreqUnit: (val: string) => void
}

export default function FrequencyLabel({
    title,
    unit,
    description,
    min,
    max,
    step = 1,
    value,
    setValue,
    freqUnit,
    setFreqUnit
}: InputProps) {

    function formatFrequency(freq: number): number {
        if (freq >= 1e9) return (freq / 1e9);
        if (freq >= 1e6) return (freq / 1e6);
        if (freq >= 1e3) return (freq / 1e3);
        return freq;
    }

    const handleFreqUnit = (unit: string) => {
        setFreqUnit(unit)
        setValue(value, unit)
    }

    return (
        <div className="flex flex-row mb-1 md:max-w-96">
            <TooltipWrapper text={description}>
                <Label htmlFor={title} className="text-slate-700 px-2 pb-1 text-lg font-semibold">
                    {title}:
                </Label>
            </TooltipWrapper>
            <Input
                type={'number'}
                id={title}
                value={formatFrequency(value)}
                max={max}
                min={min}
                step={step}
                className={"block h-6 w-20 text-right text-black text-lg rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm dark:focus:border-gray-50 dark:focus:ring-gray-50"}
                onChange={(e) => setValue(Number(e.target.value), unit)}
            />
            <Select value={freqUnit} onValueChange={handleFreqUnit}>
                <SelectTrigger className="w-80px h-6">
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kHz">kHz</SelectItem>
                  <SelectItem value="MHz">MHz</SelectItem>
                  <SelectItem value="GHz">GHz</SelectItem>
                </SelectContent>
              </Select>
        </div>
    )
}