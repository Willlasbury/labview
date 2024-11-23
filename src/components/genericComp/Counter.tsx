import { useState } from 'react'
import * as Slider from '@radix-ui/react-slider'
import { Button } from "@/components/subComp/button"
import { Minus, Plus } from 'lucide-react'

type CounterProps = {
    title: string
    unit?: string
    min?: number
    max?: number
    step?: number
    value: number
    setValue: (prevValue: number) => void
}

export default function Counter({ title, unit, min = 0, max = 10, step = 1, value, setValue }: CounterProps) {
    // const [isHovering, setIsHovering] = useState(false)

    const increment = () => {
        const num = Math.min(value + step, max)
        setValue(num)
    }

    const decrement = () => {
        const num = Math.max(value - step, min)
        setValue(num)
    }

    return (
        <div
            className="w-full mt-4 bg-slate-600 rounded-md py-1 px-2 max-w-96"
            // onMouseEnter={() => setIsHovering(true)}
            // onMouseLeave={() => setIsHovering(false)}
        >
            <h4 className='text-center text-lg font-semibold'>{title}{unit && ` (${unit})`}:  <span className="text-xl font-bold">{value}</span></h4>
            <div className="flex items-center justify-between">
                <Button
                    className="h-8 w-8"
                    variant="outline"
                    size="icon"
                    onClick={decrement}
                    disabled={value <= min}
                >
                    <Minus className="h-4 w-4 text-black" />
                </Button>
                <div className='flex flex-col items-center w-full'>
                    <div className={`z-10 w-11/12 transition-opacity duration-300`}>
                        <Slider.Root
                            className="relative flex items-center select-none touch-none w-full h-5 bg-slate-500 rounded-md"
                            value={[value]}
                            onValueChange={(newValue: Array<number>) => { setValue(newValue[0]) }}
                            max={max}
                            min={min}
                            step={step}
                        >
                            <Slider.Track className="relative grow rounded-full h-1">
                                <Slider.Range className="absolute bg-primary rounded-full h-full" />
                            </Slider.Track>
                            <Slider.Thumb
                                className="block bg-purple-600 w-5 h-5 bg-primary shadow-md rounded-full hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
                                aria-label="Valueer value"
                            />
                        </Slider.Root>
                    </div>
                </div>
                <Button
                    className="h-8 w-8"
                    variant="outline"
                    size="icon"
                    onClick={increment}
                    disabled={value >= max}
                >
                    <Plus className="h-4 w-4 text-black" />
                </Button>
            </div>
        </div>
    )
}
