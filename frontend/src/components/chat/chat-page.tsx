import { MessageCircleQuestionIcon } from "lucide-react"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ChatInput } from "@/components/chat/chat-input"
import { ChatMessage } from "@/components/chat/chat-message"
import { ThinkingIndicator } from "@/components/chat/thinking-indicator"
import { useChat } from "@/hooks/use-chat"

export function ChatPage() {
  const { messages, stage, isPending, sendMessage } = useChat()

  return (
    <div className="flex h-svh min-h-0 min-w-0 flex-1 flex-col">
      <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-5" />
        <span className="text-sm font-medium">RAG Assistant</span>
      </header>

      <MessageScrollerProvider autoScroll>
        <MessageScroller className="flex-1">
          <MessageScrollerViewport>
            <MessageScrollerContent className="mx-auto w-full max-w-3xl px-4 py-6">
              {messages.length === 0 ? (
                <MessageScrollerItem>
                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <MessageCircleQuestionIcon />
                      </EmptyMedia>
                      <EmptyTitle>Ask about the knowledge base</EmptyTitle>
                      <EmptyDescription>
                        Questions are answered using only the documents listed
                        in the sidebar, run through a local LLM.
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                </MessageScrollerItem>
              ) : (
                messages.map((message) => (
                  <MessageScrollerItem key={message.id} messageId={message.id}>
                    <ChatMessage message={message} />
                  </MessageScrollerItem>
                ))
              )}
              {stage !== "idle" && (
                <MessageScrollerItem messageId={`thinking-indicator-${messages.length}`}>
                  <ThinkingIndicator stage={stage} />
                </MessageScrollerItem>
              )}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>

      <ChatInput onSend={sendMessage} disabled={isPending} />
    </div>
  )
}
