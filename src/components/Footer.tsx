
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Settings, Plus, UserRound, Calendar } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { NewEventDialog } from '@/components/NewEventDialog';
import { cn } from '@/lib/utils';
import { UserProfileDialog } from '@/components/UserProfileDialog';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const { chatOpen, setChatOpen, hasNewMessages, setHasNewMessages } = useApp();

  const handleChatClick = () => {
    setChatOpen(!chatOpen);
    if (hasNewMessages) {
      setHasNewMessages(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-white to-transparent border-t border-border flex items-center justify-around px-4 z-10">
      <Button variant="ghost" size="sm" onClick={handleChatClick} className="relative">
        <MessageCircle className="h-5 w-5" />
        <span className="ml-1 text-xs hidden md:inline font-semibold">Chat</span>
        {hasNewMessages && (
          <span className={cn(
            "absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full",
            "md:right-2 animate-pulse"
          )} />
        )}
      </Button>
      
      <Button variant="ghost" size="sm" asChild>
        <Link to="/" className="flex items-center">
          <Calendar className="h-5 w-5" />
          <span className="ml-1 text-xs hidden md:inline font-semibold">Calendrier</span>
        </Link>
      </Button>
      
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" className="rounded-full shadow-md bg-violet-500 hover:bg-violet-600 text-white h-10 w-10 p-0">
            <Plus className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <NewEventDialog />
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm">
            <UserRound className="h-5 w-5" />
            <span className="ml-1 text-xs hidden md:inline font-semibold">Profil</span>
          </Button>
        </DialogTrigger>
        <UserProfileDialog />
      </Dialog>
      
      <Button variant="ghost" size="sm" asChild>
        <Link to="/settings" className="flex items-center">
          <Settings className="h-5 w-5" />
          <span className="ml-1 text-xs hidden md:inline font-semibold">Paramètres</span>
        </Link>
      </Button>
    </div>
  );
};
