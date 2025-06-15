import {create} from 'zustand';
import { Message, User } from '@/types';
import { getInitialMessages } from '@/lib/utils';

interface ChatState {
  messages: Message[];
  selectedUser: User | null;
  isIconSidebarOpen: boolean;
  toggleIconSidebar: () => void;
  isChatListOpen: boolean;
  toggleChatList: () => void;
  setSelectedUser: (user: User) => void;
  addMessage: (message: Message) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  selectedUser: null,
  isIconSidebarOpen: false,
  toggleIconSidebar: () => set((state) => ({ isIconSidebarOpen: !state.isIconSidebarOpen })),
  isChatListOpen: false,
  toggleChatList: () => set((state) => ({ isChatListOpen: !state.isChatListOpen })),
  setSelectedUser: (user) => {
    const messages = getInitialMessages(user.id);
    set({ selectedUser: user, messages });
  },
  addMessage: (message) => {
    set((state) => {
      const newMessages = [...state.messages, message];
      if (state.selectedUser) {
        localStorage.setItem(
          `chat_history_${state.selectedUser.id}`,
          JSON.stringify(newMessages)
        );
      }
      return { messages: newMessages };
    });
  },
}));