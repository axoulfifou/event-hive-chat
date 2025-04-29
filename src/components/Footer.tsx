
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Settings, Plus, UserRound, Users } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { NewEventDialog } from '@/components/NewEventDialog';
import { cn } from '@/lib/utils';
import { UserProfileDialog } from '@/components/UserProfileDialog';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const { chatOpen, setChatOpen, hasNewMessages, setHasNewMessages, currentUser } = useApp();

  const handleChatClick = () => {
    setChatOpen(!chatOpen);
    if (hasNewMessages) {
      setHasNewMessages(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 bg-background border-t border-border flex items-center justify-around px-4 z-10">
      <Button variant="ghost" size="lg" onClick={handleChatClick} className="relative">
        <MessageCircle />
        <span className="ml-2 hidden md:inline font-semibold">Chat</span>
        {hasNewMessages && (
          <span className={cn(
            "absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full",
            "md:right-2 animate-pulse"
          )} />
        )}
      </Button>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button size="lg" className="rounded-full shadow-md">
            <Plus />
            <span className="ml-2 font-semibold">Nouvel événement</span>
          </Button>
        </DialogTrigger>
        <NewEventDialog />
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="lg">
            <UserRound />
            <span className="ml-2 hidden md:inline font-semibold">Profil</span>
          </Button>
        </DialogTrigger>
        <UserProfileDialog />
      </Dialog>
      
      <Button variant="ghost" size="lg" asChild>
        <Link to="/users" className="flex items-center">
          <Settings />
          <span className="ml-2 hidden md:inline font-semibold">Paramètres</span>
        </Link>
      </Button>
    </div>
  );
};
