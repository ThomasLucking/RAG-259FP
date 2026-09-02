import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ChatPage } from "@/components/chat/chat-page"

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <ChatPage />
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
