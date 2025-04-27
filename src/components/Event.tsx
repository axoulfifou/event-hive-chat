
import React from 'react';
import { cn } from '@/lib/utils';
import { Event as EventType, User } from '@/types';
import { useApp } from '@/context/AppContext';
import { Avatar } from '@/components/Avatar';

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

  if (isCompact) {
    return (
      <div
        className={cn(
          'px-1 py-1 rounded-sm mb-1 cursor-pointer flex items-center',
          'hover:bg-accent transition-colors duration-200 animate-fade-in',
          'border-l-2',
          `border-l-event-${user.color}`,
          'text-xs'
        )}
        onClick={handleClick}
      >
        <span className="truncate">{event.title}</span>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        'px-2 py-1.5 rounded-md mb-1.5 cursor-pointer',
        'hover:bg-accent transition-colors duration-200',
        'border-l-2',
        `border-l-event-${user.color}`,
        'animate-fade-in'
      )}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium truncate">{event.title}</span>
        <Avatar user={user} size="sm" />
      </div>
      <p className="text-xs text-muted-foreground mt-0.5 truncate">
        {event.description}
      </p>
    </div>
  );
};
