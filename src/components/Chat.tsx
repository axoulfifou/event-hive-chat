
import React, { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Avatar } from '@/components/Avatar';
import { Send } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

export const Chat: React.FC = () => {
  const { chatOpen, setChatOpen, messages, users, currentUser, sendMessage } = useApp();
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const handleClose = () => {
    setChatOpen(false);
  };
  
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    
    sendMessage(messageText);
    setMessageText('');
  };
  
  useEffect(() => {
    // Scroll to bottom whenever messages update
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Sheet open={chatOpen} onOpenChange={setChatOpen}>
      <SheetContent 
        side="left" 
        className={cn(
          "flex flex-col",
          isMobile ? "w-full max-w-full p-4" : "sm:max-w-md"
        )}
      >
        <SheetHeader className="space-y-0 pb-4">
          <div className="flex justify-between items-center">
            <SheetTitle className="text-xl font-semibold">Chat Groupe</SheetTitle>
          </div>
        </SheetHeader>
        
        <Separator />
        
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {messages.map((message) => {
            const messageUser = users.find(u => u.id === message.userId);
            const isCurrentUser = message.userId === currentUser.id;
            
            if (!messageUser) return null;
            
            return (
              <div 
                key={message.id}
                className={cn(
                  "flex",
                  isCurrentUser ? "justify-end" : "justify-start"
                )}
              >
                <div 
                  className={cn(
                    "max-w-[80%] flex",
                    isCurrentUser ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <Avatar
                    user={messageUser}
                    size="sm"
                    className={cn(
                      "mt-1",
                      isCurrentUser ? "ml-2" : "mr-2"
                    )}
                  />
                  
                  <div>
                    <div 
                      className={cn(
                        "px-3 py-2 rounded-xl text-sm",
                        isCurrentUser 
                          ? "bg-primary text-primary-foreground rounded-tr-none" 
                          : "bg-secondary text-secondary-foreground rounded-tl-none"
                      )}
                    >
                      {message.content}
                    </div>
                    <div 
                      className={cn(
                        "text-xs text-muted-foreground mt-1",
                        isCurrentUser ? "text-right" : "text-left"
                      )}
                    >
                      {!isCurrentUser && (
                        <span className="font-medium mr-1">{messageUser.name}</span>
                      )}
                      <span>
                        {formatDistanceToNow(new Date(message.timestamp), { 
                          addSuffix: true,
                          locale: fr
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        
        <Separator className="my-2" />
        
        <form onSubmit={handleSend} className="flex space-x-2">
          <Input
            placeholder="Message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!messageText.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};
