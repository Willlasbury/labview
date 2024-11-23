import { useState } from "react"
import { Button } from "@/components/subComp/button"
import { ScrollArea } from "@/components/subComp/scroll-area"
import { ChevronUp, ChevronDown, Trash } from "lucide-react"

type StringLoggerProps = {
    title:string
    input:string
}

export function StringLogger({title, input}: StringLoggerProps) {
  const [log, setLog] = useState<string[]>([])
  const [isMinimized, setIsMinimized] = useState<boolean>(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setLog(prev => [...prev, input.trim()])
      
    }
  }

  const clearLog = () => {
    setLog([])
  }

  return (
      <div className="w-full border rounded-lg shadow-lg bg-white dark:bg-gray-950">
        <div className="flex items-center justify-between p-2 border-b">
          <div className="text-sm font-medium text-black">String Logger</div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => setIsMinimized(!isMinimized)}>
              {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        {!isMinimized && (
          <div className="p-4 space-y-4">
            <form onSubmit={handleSubmit} className="flex space-x-2">
            </form>
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