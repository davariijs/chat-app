import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

const formSchema = z.object({
  message: z.string().min(1, { message: 'Message cannot be empty.' }),
});

type FormValues = z.infer<typeof formSchema>;

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: '' },
  });

  const onSubmit = (data: FormValues) => {
    onSendMessage(data.message);
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
      <Input {...form.register('message')} placeholder="Type Something..." autoComplete="off" />
      <Button type="submit" size="icon">
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}