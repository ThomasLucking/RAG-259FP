import { useState } from "react"
import type { KeyboardEvent } from "react"
import { SendIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function ChatInput({
  onSend,
  disabled,
}: {
  onSend: (question: string) => void
  disabled?: boolean
}) {
  const [value, setValue] = useState("")

  const submit = () => {
    if (!value.trim() || disabled) return
    onSend(value)
    setValue("")
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      submit()
    }
  }

  return (
    <div className="flex w-full items-end gap-2 border-t border-border bg-background p-3">
      <Textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask something about the indexed documents…"
        className="max-h-40 min-h-10 resize-none"
        disabled={disabled}
      />
      <Button size="icon" onClick={submit} disabled={disabled || !value.trim()}>
        <SendIcon />
        <span className="sr-only">Send</span>
      </Button>
    </div>
  )
}
