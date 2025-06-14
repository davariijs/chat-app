import Link from 'next/link';
import { users } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

      
export function UserList() {
  return (
    <nav className="flex flex-col gap-2 p-4">
      {users.map((user) => (
        <Link key={user.id} href={`/chat/${user.id}`} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{user.name}</span>
          </div>
        </Link>
      ))}
    </nav>
  );
}