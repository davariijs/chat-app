import { User, UserInfo } from '@/types';

const daniInfo: UserInfo = {
  storeName: "Dani's Designs",
  storeUrl: 'danidesigns.co',
  shopifyUrl: 'shopify.com/danidesigns',
  email: 'dani.designs@example.com',
  jobTitle: 'Creative Director'
};

const saraInfo: UserInfo = {
  storeName: "Sara's Tech Hub",
  storeUrl: 'saratech.io',
  shopifyUrl: 'shopify.com/saratech',
  email: 'sara.h@example.com',
  jobTitle: 'Product Manager'
};

const jakeInfo: UserInfo = {
  storeName: "Jake's Outdoor Gear",
  storeUrl: 'jakesgear.com',
  shopifyUrl: 'shopify.com/jakes-gear',
  email: 'jake.w@example.com',
  jobTitle: 'Founder'
};


export const users: User[] = [
  {
    id: '1',
    name: 'Dani',
    avatar: '/avatars/dani.webp',
    phone: '(212) 555-0110',
    lastMessage: 'About the new fabric samples...',
    lastMessageTime: '9:15 AM',
    unreadCount: 0,
    status: 'closed',
    info: daniInfo
  },
  {
    id: '2',
    name: 'Sara',
    avatar: '/avatars/sara.webp',
    phone: '(310) 555-0125',
    lastMessage: 'Did you get the invoice I sent?',
    lastMessageTime: '11:45 AM',
    unreadCount: 2,
    status: 'open',
    info: saraInfo
  },
  {
    id: '3',
    name: 'Jake',
    avatar: '/avatars/jake.webp',
    phone: '(415) 555-0133',
    lastMessage: 'You: Confirming the shipment for order #5432.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    status: 'open',
    info: jakeInfo
  }
];