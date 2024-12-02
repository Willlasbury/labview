import { useState } from "react"
import { Button } from "@/components/subComp/button"
import { ScrollArea } from "@/components/subComp/scroll-area"
import { ChevronUp, ChevronDown, Trash } from "lucide-react"
import { cn } from "@/lib/utils"
type StringLoggerProps = {
    title:string
    input:string[]
}

export function StringLogger({title, input}: StringLoggerProps) {
  const [log, setLog] = useState<string[]>([])
  const [isMinimized, setIsMinimized] = useState<boolean>(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input[input.length-1].trim()) {
      setLog(prev => [...prev, input[input.length-1].trim()])
      
    }
  }

  const clearLog = () => {
    setLog([])
  }

  return (
      <div className={cn("absolute z-20 left-0 right-0 bottom-0 bg-background border-t border-border transition-all duration-300 ease-in-out ${isInfoOpen ? 'h-24' : 'h-10'",
        'bg-white'
      )}>
        <div className="flex items-center justify-between p-2 border-b opacity-95">
          <div className="text-sm font-medium text-black">{title}</div>
          <div className="flex items-center space-x-2">
            <Button variant="default" size="icon" onClick={() => setIsMinimized(!isMinimized)}>
              {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        {!isMinimized && (
          <div className="p-1 space-y-4">
            {/* <form onSubmit={handleSubmit} className="flex space-x-2">
            </form> */}
            <div className="border rounded">
              <ScrollArea className="h-[200px] p-2">
                {log.map((item, index) => (
                  <div key={index} className="py-1">
                    {item}
                  </div>
                ))}
              </ScrollArea>
            </div>
            <div className="flex justify-end">
              <Button variant="destructive" size="sm" onClick={clearLog}>
                <Trash className="h-4 w-4 mr-2" />
                Clear Log
              </Button>
            </div>
          </div>
        )}
      </div>
  )
}