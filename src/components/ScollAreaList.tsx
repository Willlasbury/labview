import { ScrollArea } from "@/components/subComp/scroll-area"
import { Separator } from "@/components/subComp/separator"
import type { subObjData  } from "@/utils/fakeData"

type ScrollAreaProps = {
  title: string,
  data: subObjData 
}

export function ScrollAreaList({ title, data }: ScrollAreaProps) {
  console.log("data:", data)
  return (
    <section>
      <h4 id="scroll-area-title">{title}</h4>
      <ScrollArea className="h-36 w-fit rounded-md border">
        <div className="p-4">
          {data.array.map((val: string) => (
            <div key={val}>
               <div className="text-sm">{val}{data.unit && <sup>{data.unit}</sup>}</div>
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </section>
  )
}