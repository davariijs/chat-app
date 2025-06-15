"use client";

import Link from "next/link";
import { User } from "@/types";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/store/chat-store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function UserListItem({ user, isActive }: { user: User; isActive: boolean }) {
  const { toggleChatList } = useChatStore();

  const handleClick = () => {
    localStorage.setItem(`read_status_${user.id}`, 'true');
    if (window.innerWidth < 768) {
      toggleChatList();
    }
  };

  return (
    <Link 
      href={`/chat/${user.id}`} 
      onClick={handleClick}
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg hover:bg-muted relative",
        isActive && "bg-muted"
      )}
    >
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-2/3 w-1 bg-primary rounded-r-full" />
      )}

      <Avatar>
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <p className="font-semibold truncate">{user.name}</p>
        </div>
      </div>
    </Link>
  );
}