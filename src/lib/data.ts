import { User, UserInfo, Message } from '@/types';


const daniInfo: UserInfo = {
  storeName: "Dani's Designs",
  storeUrl: 'danidesigns.co',
  shopifyUrl: 'shopify.com/danidesigns',
  email: 'dani.designs@example.com',
  jobTitle: 'Creative Director',
  campaign: { 
    name: "Spring Collection 2024", 
    status: "Active", 
    spend: "$2,500" 
  },
  tags: ["Influencer", "High-Budget", "Fashion"]
};

const saraInfo: UserInfo = {
  storeName: "Sara's Tech Hub",
  storeUrl: 'saratech.io',
  shopifyUrl: 'shopify.com/saratech',
  email: 'sara.h@example.com',
  jobTitle: 'Product Manager',
  campaign: { 
    name: "Black Friday Deals", 
    status: "Finished", 
    spend: "$5,800" 
  },
  tags: ["VIP", "Returning Customer", "Tech Enthusiast"]
};

const jakeInfo: UserInfo = {
  storeName: "Jake's Outdoor Gear",
  storeUrl: 'jakesgear.com',
  shopifyUrl: 'shopify.com/jakes-gear',
  email: 'jake.w@example.com',
  jobTitle: 'Founder',
  campaign: { 
    name: "Summer Adventure", 
    status: "Paused", 
    spend: "$850" 
  },
  tags: ["New Customer", "Outdoor", "Adventure"]
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
    status: 'open', 
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
    status: 'closed', 
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


export const messages: Record<string, Message[]> = {
  '1': [
    {
      id: 'dani-m1',
      sender: 'other',
      text: 'Hi, I was wondering if the new fabric samples have arrived?',
      timestamp: '9:12 AM',
      avatar: '/avatars/dani.webp',
    },
    {
      id: 'dani-m2',
      sender: 'me',
      text: 'Hey Dani! Yes, they just came in this morning. I can send you some pictures.',
      timestamp: '9:15 AM',
    }
  ],
  '2': [
    {
      id: 'sara-m1',
      sender: 'other',
      text: 'Hi there, just wanted to follow up on the invoice for last month. Have you had a chance to look at it?',
      timestamp: '11:42 AM',
      avatar: '/avatars/sara.webp',
    },
    {
      id: 'sara-m2',
      sender: 'me',
      text: 'Hey Sara! Apologies for the delay. Yes, I just reviewed it. Everything looks good. I will process the payment today.',
      timestamp: '11:45 AM',
    },
  ],
  '3': [],
};