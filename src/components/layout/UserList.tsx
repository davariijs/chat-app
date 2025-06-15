"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { User } from "@/types";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Search, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { UserListItem } from "./UserListItem";

export function UserList({ users }: { users: User[] }) {
  const pathname = usePathname();
  const currentUserId = pathname.split('/').pop();
  const [activeTab, setActiveTab] = useState('open');

  const filteredUsers = users.filter(user => user.status === activeTab);

  return (
    <div className="p-4 space-y-4 h-full relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search by contact" className="pl-10" />
      </div>
      <Tabs defaultValue="open" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="open">Open Chat</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="space-y-2 mt-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserListItem key={user.id} user={user} isActive={currentUserId === user.id} />
            ))
          ) : (
            <p className="text-center text-muted-foreground pt-4">No {activeTab} chats.</p>
          )}
        </TabsContent>
      </Tabs>

      <div className="absolute bottom-6 right-6">
        <Button className="h-12 w-12 rounded-full shadow-lg">
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}