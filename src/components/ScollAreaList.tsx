import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import type { subObjData } from "@/utils/fakeData"

type ScrollAreaProps = {
  title: string,
  data: subObjData
}

export function ScrollAreaComp({ title, data }: ScrollAreaProps) {

  return (
    <section>
      <h4 id="scroll-area-title">{title}</h4>
      <ScrollArea className="h-36 w-fit rounded-md border">
        <div className="p-4">
          {data.array.map((val: string) => (
            <div key={val}>
              <div className="text-sm">{val}<sup>{data.unit}</sup></div>
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </section>
  )
}