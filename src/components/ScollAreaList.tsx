import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

type ScrollAreaProps = {
  title: string,
  pulseWidth: Array<string>
}

export function ScrollAreaComp({ title, pulseWidth }: ScrollAreaProps) {

  return (
    <section>
      <h4 id="scroll-area-title">{title}</h4>
      <ScrollArea className="h-36 w-48 rounded-md border">
        <div className="p-4">
          {pulseWidth.map((val) => (
            <div key={val}>
              <div className="text-sm">{val}</div>
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </section>
  )
}