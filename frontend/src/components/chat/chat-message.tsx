import { BotIcon, UserIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message"
import type { ChatMessage as ChatMessageType } from "@/hooks/use-chat"
import { SourceList } from "@/components/chat/source-list"

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === "user"

  return (
    <Message align={isUser ? "end" : "start"}>
      <MessageAvatar>
        <Avatar size="sm">
          <AvatarFallback>
            {isUser ? <UserIcon className="size-3.5" /> : <BotIcon className="size-3.5" />}
          </AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble
          align={isUser ? "end" : "start"}
          variant={isUser ? "default" : message.error ? "destructive" : "secondary"}
        >
          <BubbleContent className="whitespace-pre-wrap">
            {message.content}
          </BubbleContent>
        </Bubble>
        {!isUser && message.sources && message.sources.length > 0 && (
          <SourceList chunks={message.sources} />
        )}
      </MessageContent>
    </Message>
  )
}
