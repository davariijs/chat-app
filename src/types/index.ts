export interface User {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

export interface Message {
  id: string;
  sender: 'me' | 'other';
  text: string;
  timestamp: string;
}