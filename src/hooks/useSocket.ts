import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useChatStore } from '@/store/chat-store';
import { Message } from '@/types';


/**
 * A custom React hook to manage the lifecycle of a single WebSocket connection
 * for the entire application. It handles sending and receiving messages.
 */
export function useSocket() {
  const socketRef = useRef<Socket | null>(null);
  const addMessage = useChatStore((state) => state.addMessage);

  useEffect(() => {
    const socket = io('http://localhost:3001');
    socketRef.current = socket;

    socket.on('connect', () => {});

    socket.on('receive_message', (message: Message) => {
      addMessage({ ...message, sender: 'other' });
    });

    return () => {
      socket.disconnect();
    };
  }, [addMessage]);

  const sendMessage = (text: string) => {
    if (socketRef.current) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text,
        sender: 'me',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      addMessage(newMessage);
      socketRef.current.emit('send_message', newMessage);
    }
  };

  return { sendMessage };
}