import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Message } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * A utility function to safely retrieve and parse chat history for a given user from localStorage.
 * Returns an empty array if no history is found or if parsing fails.
 * @param userId The ID of the user whose chat history is to be retrieved.
 * @returns An array of Message objects.
 */
export const getInitialMessages = (userId: string): Message[] => {
  if (typeof window === 'undefined') return [];
  try {
    const storedMessages = localStorage.getItem(`chat_history_${userId}`);
    return storedMessages ? JSON.parse(storedMessages) : [];
  } catch (error) {
    console.error("Failed to parse messages from localStorage", error);
    return [];
  }
};