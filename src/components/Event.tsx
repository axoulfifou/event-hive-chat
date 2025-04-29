
import React from 'react';
import { cn } from '@/lib/utils';
import { Event as EventType, User } from '@/types';
import { useApp } from '@/context/AppContext';
import { Avatar } from '@/components/Avatar';
import { CardBadge } from '@/components/ui/card';

interface EventProps {
  event: EventType;
  isCompact?: boolean;
}

export const Event: React.FC<EventProps> = ({ event, isCompact = false }) => {
  const { users, setSelectedEvent } = useApp();
  
  const user = users.find(u => u.id === event.userId) as User;
  
  const handleClick = () => {
    setSelectedEvent(event);
  };

  // Check if the event has unread notifications (e.g., new notes or reactions)
  const hasNotifications = event.notes.length > 0 || event.reactions.length > 0;

  if (isCompact) {
    return (
      <div
        className={cn(
          'px-1 py-1 rounded-sm mb-1 cursor-pointer flex items-center justify-between relative',
          'hover:bg-accent transition-colors duration-200 animate-fade-in',
          'border-l-2',
          `border-l-event-${user.color}`,
          'text-xs bg-gradient-to-r from-background to-muted/20'
        )}
        onClick={handleClick}
      >
        <span className="truncate">{event.title}</span>
        <Avatar user={user} size="sm" className="-mr-1" />
        
        {hasNotifications && (
          <CardBadge className="scale-75 bg-red-400">{event.notes.length + event.reactions.length}</CardBadge>
        )}
      </div>
    );
  }

  return (
    <div 
      className={cn(
        'px-2 py-1.5 rounded-md mb-1.5 cursor-pointer relative',
        'hover:bg-accent transition-colors duration-200',
        'border-l-2',
        `border-l-event-${user.color}`,
        'animate-fade-in',
        'bg-gradient-to-r from-background to-muted/20'
      )}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <span className="font-bold truncate">{event.title}</span>
        <Avatar user={user} size="sm" />
      </div>
      <p className="text-xs text-muted-foreground mt-0.5 truncate">
        {event.description}
      </p>
      
      {hasNotifications && (
        <CardBadge>{event.notes.length + event.reactions.length}</CardBadge>
      )}
    </div>
  );
};
