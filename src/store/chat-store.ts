import {create} from 'zustand';
import { Message, User } from '@/types';

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

/**
 * A utility function to safely retrieve and parse chat history for a given user from localStorage.
 * Returns an empty array if no history is found or if parsing fails.
 * @param userId The ID of the user whose chat history is to be retrieved.
 * @returns An array of Message objects.
 */
const getInitialMessages = (userId: string): Message[] => {
  if (typeof window === 'undefined') return [];
  try {
    const storedMessages = localStorage.getItem(`chat_history_${userId}`);
    return storedMessages ? JSON.parse(storedMessages) : [];
  } catch (error) {
    console.error("Failed to parse messages from localStorage", error);
    return [];
  }
};

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