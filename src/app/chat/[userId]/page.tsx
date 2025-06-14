import { UserList } from '@/components/UserList';
import { ChatWindow } from '@/components/ChatWindow';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface ChatPageProps {
  params: {
    userId: string;
  };
}

export default function ChatPage({ params }: ChatPageProps) {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-screen w-full">
      <ResizablePanel defaultSize={25}>
        <UserList />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <ChatWindow userId={params.userId} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}