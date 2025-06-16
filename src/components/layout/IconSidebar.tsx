import Image from "next/image";
import { Home, MessageSquare, Users, Settings, Bell, Archive } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ThemeToggleButton } from "../shared/ThemeToggleButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: Home, tooltip: "Home", active: false },
  { icon: MessageSquare, tooltip: "Chats", active: true },
  { icon: Users, tooltip: "Contacts", active: false },
  { icon: Archive, tooltip: "Archived", active: false },
  { icon: Bell, tooltip: "Notifications", active: false },
  { icon: Settings, tooltip: "Settings", active: false },
];

export function IconSidebar() {
  return (
    <TooltipProvider delayDuration={0}>
      <nav className="w-20 bg-purple-50 dark:bg-card px-4 py-6 flex flex-col items-center gap-6 border-r h-full">
        <div className="h-10 w-10">
          <Image
            src="/logo.png"
            alt="Chat App Logo"
            width={40}
            height={40}
          />
        </div>

        <div className="flex flex-col gap-4">
          {sidebarItems.map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div className={cn(
                  "p-[6px] rounded-lg cursor-pointer",
                  item.active 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}>
                  <item.icon className="h-6 w-6" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{item.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        <div className="mt-auto flex flex-col items-center gap-4">
          <ThemeToggleButton />
          <Avatar>
            <AvatarImage src="/avatars/user.webp" alt="My Avatar" />
            <AvatarFallback>Me</AvatarFallback>
          </Avatar>
        </div>
      </nav>
    </TooltipProvider>
  );
}