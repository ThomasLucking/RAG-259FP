import { useState } from "react"
import { BookOpenIcon, FileTextIcon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { DocumentModal } from "@/components/chat/document-modal"
import { knowledgeBase, totalDocumentCount } from "@/lib/documents"

export function AppSidebar() {
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BookOpenIcon className="size-4" />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium">Indexed files</span>
            <span className="truncate text-xs text-muted-foreground">
              {totalDocumentCount} documents indexed
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {knowledgeBase.map((category) => (
          <SidebarGroup key={category.name}>
            <SidebarGroupLabel className="justify-between">
              <span>{category.name}</span>
              <Badge variant="secondary" className="h-4 px-1.5 text-[10px]">
                {category.documents.length}
              </Badge>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {category.documents.map((document) => (
                  <SidebarMenuItem key={document.slug}>
                    <SidebarMenuButton
                      tooltip={document.title}
                      onClick={() => setOpenSlug(document.slug)}
                    >
                      <FileTextIcon />
                      <span>{document.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <DocumentModal
        slug={openSlug}
        onOpenChange={(open) => !open && setOpenSlug(null)}
      />
    </Sidebar>
  )
}
