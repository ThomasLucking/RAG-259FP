import { useQuery } from "@tanstack/react-query"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Spinner } from "@/components/ui/spinner"
import { fetchDocument } from "@/lib/api"

export function DocumentModal({
  slug,
  onOpenChange,
}: {
  slug: string | null
  onOpenChange: (open: boolean) => void
}) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["document", slug],
    queryFn: () => fetchDocument(slug!),
    enabled: slug !== null,
  })

  return (
    <Dialog open={slug !== null} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[80vh] w-full max-w-2xl flex-col sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{data?.title ?? "Loading document…"}</DialogTitle>
          <DialogDescription>Indexed content for this document</DialogDescription>
        </DialogHeader>
        <ScrollArea className="-mx-4 min-h-0 flex-1 border-t px-4 pt-4">
          {isPending && (
            <div className="flex items-center justify-center py-10 text-muted-foreground">
              <Spinner />
            </div>
          )}
          {isError && (
            <p className="py-4 text-sm text-destructive">
              {error instanceof Error ? error.message : "Failed to load document"}
            </p>
          )}
          {data && (
            <pre className="whitespace-pre-wrap pb-4 font-sans text-sm leading-relaxed text-foreground">
              {data.content}
            </pre>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
