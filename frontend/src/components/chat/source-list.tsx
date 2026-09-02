import { useState } from "react"
import { ChevronDownIcon, FileTextIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

function truncate(text: string, max = 220) {
  const trimmed = text.trim()
  return trimmed.length > max ? `${trimmed.slice(0, max)}…` : trimmed
}

export function SourceList({ chunks }: { chunks: string[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex w-full max-w-[80%] flex-col gap-1.5 px-3">
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-fit justify-start px-1.5 text-xs text-muted-foreground"
        onClick={() => setOpen((value) => !value)}
      >
        <FileTextIcon data-icon="inline-start" />
        {chunks.length} source{chunks.length === 1 ? "" : "s"} retrieved
        <ChevronDownIcon
          data-icon="inline-end"
          className={cn("transition-transform", open && "rotate-180")}
        />
      </Button>
      {open && (
        <ScrollArea className="max-h-64">
          <div className="flex flex-col gap-1.5 pr-3">
            {chunks.map((chunk, index) => (
              <div
                key={index}
                className="flex flex-col gap-1 rounded-lg border border-border bg-muted/40 px-2.5 py-2"
              >
                <Badge variant="outline" className="w-fit text-[10px]">
                  Chunk {index + 1}
                </Badge>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {truncate(chunk)}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}
