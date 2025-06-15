import { redirect } from 'next/navigation';
import { users } from '@/lib/data';

export default function ChatRootPage() {
  if (users && users.length > 0) {
    const firstUser = users[0];
    redirect(`/chat/${firstUser.id}`);
  }

  return (
    <div className="flex h-full items-center justify-center">
      <span className="font-semibold text-gray-500">
        No users found.
      </span>
    </div>
  );
}