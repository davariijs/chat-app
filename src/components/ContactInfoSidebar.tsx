import { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Building2, Calendar, Link as LinkIcon, Mail, Phone, ShoppingCart } from "lucide-react";
import { Separator } from "./ui/separator";
import { X } from 'lucide-react';

const InfoRow = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) => (
  <div className="flex items-start gap-3">
    <div className="bg-muted rounded-full p-2">
      <Icon className="h-4 w-4 text-muted-foreground" />
    </div>
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

export function ContactInfoSidebar({ user, onClose }: { user: User, onClose?: () => void }) {
  return (
    <div className="p-4 h-full overflow-y-auto space-y-6 bg-card">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Contact Info</h2>
        {onClose && (
          <Button onClick={onClose} variant="ghost" size="icon" className="lg:hidden">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>About Customer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-20 w-20 mb-2">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <h3 className="font-bold text-lg">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.info.jobTitle}</p>
          </div>
          <Separator />
          <div className="space-y-4">
            <InfoRow icon={Building2} label="Store Name" value={user.info.storeName} />
            <InfoRow icon={LinkIcon} label="Store URL" value={user.info.storeUrl} />
            <InfoRow icon={ShoppingCart} label="Shopify URL" value={user.info.shopifyUrl} />
            <InfoRow icon={Phone} label="Phone" value={user.phone} />
            <InfoRow icon={Mail} label="Email" value={user.info.email} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm">I&apos;ve sent you a Calendly link. So can meet tomorrow morning.</p>
            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>Jan 02, 2023</span>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4">Add Note</Button>
        </CardContent>
      </Card>
    </div>
  );
}