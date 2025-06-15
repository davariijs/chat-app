import { ChatWindow } from '@/components/ChatWindow';
import { ContactInfoSidebar } from '@/components/ContactInfoSidebar';
import { users } from '@/lib/data';
import { notFound } from 'next/navigation';
import { User } from '@/types';

interface ChatPageProps {
  params: {
    userId: string;
  };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const awaitedParams = await params;
  const user = users.find((u: User) => u.id === awaitedParams.userId);

  if (!user) {
    notFound();
  }

  return (
    <div className="flex h-full">
      <div className="flex-1">
        <ChatWindow user={user} />
      </div>
      <div className="hidden lg:block w-[350px] border-l">
        <ContactInfoSidebar user={user} />
      </div>
    </div>
  );
}