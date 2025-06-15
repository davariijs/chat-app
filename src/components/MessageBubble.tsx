import React from 'react';
import { Message } from '@/types';
import { cn } from "@/lib/utils";
interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isMe = message.sender === 'me';
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div className={cn(
        "max-w-[80%] sm:max-w-[70%] rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-sm relative",
        isMe 
          ? "bg-blue-600 text-white rounded-br-none" 
          : "bg-gray-200 dark:bg-gray-700 rounded-bl-none"
      )}>
        <p className="break-words">{message.text}</p>
        <p className="text-[10px] text-right mt-1 opacity-70">
          {message.timestamp}
        </p>
      </div>
    </div>
  );
}