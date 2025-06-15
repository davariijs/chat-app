"use client";

import { IconSidebar } from "@/components/IconSidebar";
import { UserList } from "@/components/UserList";
import { users } from "@/lib/data";
import { useChatStore } from "@/store/chat-store";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChatLayout({ children }: { children: React.ReactNode; }) {
  const { isIconSidebarOpen, toggleIconSidebar, isChatListOpen, toggleChatList } = useChatStore();

  return (
    <div className="flex h-screen bg-soft-bg text-foreground overflow-hidden">
      {isIconSidebarOpen && (
        <div onClick={toggleIconSidebar} className="fixed inset-0 bg-black/30 z-40 md:hidden" />
      )}
      <div className={cn(
        "fixed md:static inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out",
        isIconSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <IconSidebar />
      </div>
      {isChatListOpen && (
        <div onClick={toggleChatList} className="fixed inset-0 bg-black/30 z-20 md:hidden" />
      )}
      <aside className={cn(
  "w-full md:w-[340px] border-r flex flex-col bg-background",
  "fixed md:static inset-y-0 left-0 z-30 transition-transform duration-300 ease-in-out",
  isChatListOpen ? "translate-x-0" : "-translate-x-full",
  "md:translate-x-0" 
)}>
  <header className="p-4 border-b h-20 flex items-center justify-between">
    <h1 className="text-2xl font-bold">All Messages</h1>
    <Button onClick={toggleIconSidebar} variant="ghost" size="icon" className="md:hidden">
      <Menu className="h-6 w-6" />
    </Button>
  </header>
  <div className="flex-1 overflow-y-auto">
    <UserList users={users} />
  </div>
</aside>
    <main className="flex-1">
      {children}
    </main>
        </div>
      );
}