import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import type { subObjData  } from "@/utils/fakeData"

type ScrollAreaProps = {
  title: string,
  valueOptions: subObjData
  value: string
  setValue: (value: string) => void
}

export function ScrollAreaList({ title, valueOptions, value, setValue }: ScrollAreaProps) {
  
  return (
    <section>
      <h4 id="scroll-area-title" className="font-bold text-center">{title}</h4>
      <ScrollArea className="h-36 w-fit rounded-md border" onChange={(e) => {setValue(String(e.target))}}>
        <div className="p-4">
          {valueOptions.array.map((val: string) => (
            <div key={val}>
               <div className="text-sm">{val}{valueOptions.unit && <sup>{valueOptions.unit}</sup>}</div>
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </section>
  )
}