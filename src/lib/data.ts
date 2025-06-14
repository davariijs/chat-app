import { User, Message } from '@/types';

export const users: User[] = [
  { id: '1', name: 'Dani', avatar: '/avatars/dani.webp' },
  { id: '2', name: 'Sara', avatar: '/avatars/sara.webp' },
  { id: '3', name: 'Jake', avatar: '/avatars/jake.webp' },
];

export const messages: Record<string, Message[]> = {
  '1': [ { id: 'm1', sender: 'other', text: 'Hey, how are you?', timestamp: '10:20 PM' } ],
  '2': [ { id: 'm2', sender: 'other', text: 'Hello there!', timestamp: '10:22 PM' } ],
};