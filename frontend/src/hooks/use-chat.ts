import { useMutation } from "@tanstack/react-query"
import { useCallback, useState } from "react"

import { askQuestion } from "@/lib/api"

export type ChatStage = "idle" | "generating"

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  sources?: string[]
  error?: boolean
}

function messageId() {
  return crypto.randomUUID()
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [stage, setStage] = useState<ChatStage>("idle")

  const mutation = useMutation({
    mutationFn: async (question: string) => {
      setStage("generating")
      const { answer, chunks } = await askQuestion(question)

      return { answer, chunks }
    },
    onSuccess: ({ answer, chunks }) => {
      setMessages((prev) => [
        ...prev,
        { id: messageId(), role: "assistant", content: answer, sources: chunks },
      ])
    },
    onError: (error: Error) => {
      setMessages((prev) => [
        ...prev,
        {
          id: messageId(),
          role: "assistant",
          content: error.message || "Something went wrong. Is the backend running?",
          error: true,
        },
      ])
    },
    onSettled: () => {
      setStage("idle")
    },
  })

  const sendMessage = useCallback(
    (question: string) => {
      const trimmed = question.trim()
      if (!trimmed || mutation.isPending) return

      setMessages((prev) => [
        ...prev,
        { id: messageId(), role: "user", content: trimmed },
      ])
      mutation.mutate(trimmed)
    },
    [mutation],
  )

  return {
    messages,
    stage,
    isPending: mutation.isPending,
    sendMessage,
  }
}
