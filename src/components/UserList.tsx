"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Message, User } from "@/types";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Search } from "lucide-react";
import { useChatStore } from "@/store/chat-store";

function UserListItem({ user, isActive }: { user: User; isActive: boolean }) {
  const [lastMessage, setLastMessage] = useState(user.lastMessage);
  const { toggleChatList } = useChatStore();

  useEffect(() => {
    try {
      const storedMessages = localStorage.getItem(`chat_history_${user.id}`);
      if (storedMessages) {
        const messages: Message[] = JSON.parse(storedMessages);
        if (messages.length > 0) {
          const last = messages[messages.length - 1];
          const prefix = last.sender === 'me' ? 'You: ' : '';
          setLastMessage(prefix + last.text);
        } else {
           setLastMessage("No messages yet.");
        }
      }
    } catch {
      setLastMessage(user.lastMessage);
    }
  }, [user.id, user.lastMessage]);

  return (
    <Link
      href={`/chat/${user.id}`}
      onClick={() => { if (window.innerWidth < 768) toggleChatList() }}
      className={cn("flex items-center gap-3 p-3 rounded-lg hover:bg-muted", isActive && "bg-muted")}
    >
      <Avatar>
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <p className="font-semibold truncate">{user.name}</p>
          <p className="text-xs text-muted-foreground flex-shrink-0">{user.lastMessageTime}</p>
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-muted-foreground truncate">{lastMessage}</p>
          {user.unreadCount > 0 && (
            <Badge className="bg-accent text-accent-foreground h-5 w-5 flex items-center justify-center p-0 ml-2">
              {user.unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
}

export function UserList({ users }: { users: User[] }) {
  const pathname = usePathname();
  const currentUserId = pathname.split('/').pop();
  const [activeTab, setActiveTab] = useState('open');

  const filteredUsers = users.filter(user => user.status === activeTab);

  return (
    <div className="p-4 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search by contact" className="pl-10" />
      </div>
      <Tabs defaultValue="open" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="open">Open Chat</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="space-y-2 mt-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserListItem key={user.id} user={user} isActive={currentUserId === user.id} />
            ))
          ) : (
            <p className="text-center text-muted-foreground pt-4">No {activeTab} chats.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}