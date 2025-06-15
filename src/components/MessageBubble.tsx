import React from 'react';
import { Message } from '@/types';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isMe = message.sender === 'me';
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs rounded-lg px-4 py-2 ${
          isMe ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
        }`}
      >
        <p>{message.text}</p>
        <p className="text-xs text-right mt-1 opacity-70">{message.timestamp}</p>
      </div>
    </div>
  );
}