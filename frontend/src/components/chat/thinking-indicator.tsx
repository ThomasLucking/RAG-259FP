import { BotIcon, SparklesIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message"
import { Spinner } from "@/components/ui/spinner"
import type { ChatStage } from "@/hooks/use-chat"

const STAGE_COPY: Record<Exclude<ChatStage, "idle">, { icon: typeof SparklesIcon; label: string }> = {
  generating: { icon: SparklesIcon, label: "Thinking through an answer…" },
}

export function ThinkingIndicator({ stage }: { stage: ChatStage }) {
  if (stage === "idle") return null

  const { icon: Icon, label } = STAGE_COPY[stage]

  return (
    <Message align="start">
      <MessageAvatar>
        <Avatar size="sm">
          <AvatarFallback>
            <BotIcon className="size-3.5" />
          </AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble variant="secondary">
          <BubbleContent className="flex items-center gap-2">
            <Spinner className="size-3.5" />
            <Icon className="size-3.5" />
            <span className="shimmer">{label}</span>
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  )
}
