import { useState } from 'react'
import * as Slider from '@radix-ui/react-slider'
import { Button } from "@/components/ui/button"
import { Minus, Plus } from 'lucide-react'

type CounterProps = {
    title: string
    unit: string
    min?: number
    max?: number
    step?: number
    count: number
    setCount: (prevCount: number) => void
}

export default function Counter({ title, unit, min = 0, max = 10, step = 1, count, setCount }: CounterProps) {
    const [isHovering, setIsHovering] = useState(false)

    const increment = () => {
        const num = Math.min(count + step, max)
        setCount(num)
    }

    const decrement = () => {
        const num = Math.max(count - step, min)
        setCount(num)
    }

    const handleSlide = (num: number) => {
        setCount(num)
    }

    return (
        <div
            className="w-full max-w-xs mx-auto space-y-4"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <h4 className='text-center'>{title}{`(${unit})`}</h4>
            <div className="flex items-center justify-between">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={decrement}
                    disabled={count <= min}
                >
                    <Minus className="h-4 w-4 text-black" />
                </Button>
                <div className='flex flex-col items-center w-full'>

                    <span className="text-2xl font-bold">{count}</span>
                    <div className={`z-10 w-11/12 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
                        <Slider.Root
                            className="relative flex items-center select-none touch-none w-full h-5 bg-slate-500 rounded-md"
                            value={[count]}
                            onValueChange={(newValue: Array<number>) => { handleSlide(newValue[0]) }}
                            max={max}
                            min={min}
                            step={step}
                        >
                            <Slider.Track className="relative grow rounded-full h-1">
                                <Slider.Range className="absolute bg-primary rounded-full h-full" />
                            </Slider.Track>
                            <Slider.Thumb
                                className="block bg-purple-600 w-5 h-5 bg-primary shadow-md rounded-full hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
                                aria-label="Counter value"
                            />
                        </Slider.Root>
                    </div>
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={increment}
                    disabled={count >= max}
                >
                    <Plus className="h-4 w-4 text-black" />
                </Button>
            </div>
        </div>
    )
}