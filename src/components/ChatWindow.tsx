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

interface ChatWindowProps {
  user: User;
}

export function ChatWindow({ user }: ChatWindowProps) {
  const { messages, setSelectedUser, toggleChatList } = useChatStore();
  const { sendMessage } = useSocket();
  const [isInfoSidebarOpen, setInfoSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedUser(user);
  }, [user, setSelectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="relative flex flex-col h-full bg-soft-bg">
      <header className="p-4 border-b bg-background flex justify-between items-center h-20">
        <div className="flex items-center gap-3 min-w-0">
          <Button onClick={toggleChatList} variant="ghost" size="icon" className="md:hidden flex-shrink-0">
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/chat" className="hidden md:block">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-shrink-0">
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm sm:text-base truncate ">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.phone}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <Button variant="ghost" size="icon"><Star className="h-5 w-5" /></Button>
          <Button variant="outline" className="gap-2">
            <Check className="h-4 w-4" /> 
            <span className="hidden sm:inline text-xs">{user.status === 'open' ? 'Open' : 'Closed'}</span>
          </Button>
          <Button onClick={() => setInfoSidebarOpen(true)} variant="ghost" size="icon" className="lg:hidden">
            <UserIcon className="h-5 w-5" />
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