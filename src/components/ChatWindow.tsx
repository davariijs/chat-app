"use client";

import { useEffect, useRef, useState } from 'react';
import Link from "next/link";
import { useChatStore } from '@/store/chat-store';
import { useSocket } from '@/hooks/useSocket';
import { User } from '@/types';
import { ChatInput } from './ChatInput';
import { MessageBubble } from './MessageBubble';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { ArrowLeft, Check, Menu, Star, User as UserIcon } from 'lucide-react';
import { ContactInfoSidebar } from './ContactInfoSidebar';
import { cn } from "@/lib/utils";

interface ChatWindowProps {
  user: User;
}

export function ChatWindow({ user }: ChatWindowProps) {
  const { messages, setSelectedUser, toggleChatList } = useChatStore();
  const { sendMessage } = useSocket();
  const [isInfoSidebarOpen, setInfoSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
   const [isFavorite, setIsFavorite] = useState(false);
  const [currentUserStatus, setCurrentUserStatus] = useState(user.status);

  useEffect(() => {
    const favStatus = localStorage.getItem(`favorite_${user.id}`);
    setIsFavorite(favStatus === 'true');
    setCurrentUserStatus(user.status);
  }, [user]);

  const toggleFavorite = () => {
    const newFavStatus = !isFavorite;
    setIsFavorite(newFavStatus);
    localStorage.setItem(`favorite_${user.id}`, String(newFavStatus));
  };

  useEffect(() => {
    setSelectedUser(user);
  }, [user, setSelectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <div className="relative flex flex-col h-full bg-soft-bg">
      <header className="p-2 xs:p-3 sm:p-4 border-b bg-background flex justify-between items-center h-20 gap-1 xs:gap-2">
        <div className="flex items-center gap-2 xs:gap-3 min-w-0">
          <Button onClick={toggleChatList} variant="ghost" size="icon" className="md:hidden flex-shrink-0">
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/chat" className="hidden md:block">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-shrink-0">
            <Avatar className="h-8 w-8 xs:h-10 xs:w-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-bold text-xs xs:text-sm sm:text-base truncate">{user.name}</p>
            <p className="text-[10px] xs:text-xs text-muted-foreground truncate">{user.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-0.5 xs:gap-1 flex-shrink-0">
          <Button onClick={toggleFavorite} variant="ghost" size="icon" className="w-7 h-7 xs:w-9 xs:h-9">
            <Star className={cn(
                "h-4 xs:h-5 w-4 xs:w-5 transition-colors", 
                isFavorite 
                  ? "fill-yellow-400 text-yellow-400" 
                  : "text-muted-foreground"
              )}  />
          </Button>
          <Button variant="outline" className="gap-1 p-1.5 xs:p-2 sm:px-3 h-8 xs:h-9">
            {currentUserStatus === 'open' ? (
              <Check className="h-3 w-3 xs:h-4 xs:w-4" />
            ) : (
              <div className="w-3 h-3 xs:w-4 xs:h-4 rounded-full border-2 border-muted-foreground" />
            )}
            <span className="hidden sm:inline text-xs capitalize">{currentUserStatus}</span>
          </Button>
          <Button onClick={() => setInfoSidebarOpen(true)} variant="ghost" size="icon" className="w-8 h-8 xs:w-9 xs:h-9 lg:hidden">
            <UserIcon className="h-4 xs:h-5 w-4 xs:w-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-4 overflow-y-auto">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </main>

      <footer className="p-4 border-t bg-background">
        <ChatInput onSendMessage={sendMessage} />
      </footer>

      <div className={`fixed top-0 right-0 h-full w-full sm:w-80 z-40 transition-transform duration-300 ease-in-out lg:hidden ${isInfoSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <ContactInfoSidebar user={user} onClose={() => setInfoSidebarOpen(false)} />
      </div>
      {isInfoSidebarOpen && <div onClick={() => setInfoSidebarOpen(false)} className="fixed inset-0 bg-black/30 z-30 lg:hidden" />}
    </div>
  );
}