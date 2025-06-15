export interface UserInfo {
  storeName: string;
  storeUrl: string;
  shopifyUrl: string;
  email: string;
  jobTitle: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: 'open' | 'closed';
  info: UserInfo;
}

export interface Message {
  id: string;
  sender: 'me' | 'other';
  text: string;
  timestamp: string;
  avatar?: string;
}