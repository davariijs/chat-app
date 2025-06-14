import { messages } from '@/lib/data';
import { Message } from '@/types';
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: Message;
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isMe = message.sender === 'me';
  return (
    <div className={cn("flex", isMe ? "justify-end" : "justify-start")}>
      <div className={cn(
        "max-w-xs rounded-lg px-4 py-2",
        isMe ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700"
      )}>
        <p>{message.text}</p>
        <p className="text-xs text-right mt-1 opacity-70">{message.timestamp}</p>
      </div>
    </div>
  );
}

interface ChatWindowProps {
  userId: string;
}

export function ChatWindow({ userId }: ChatWindowProps) {
  const userMessages = messages[userId] || [];

  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b">
        <h2 className="font-semibold">Chat with User {userId}</h2>
      </header>
      <main className="flex-1 p-4 space-y-4 overflow-y-auto">
        {userMessages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </main>
      <footer className="p-4 border-t">
        <p>Chat input...</p>
      </footer>
    </div>
  );
}