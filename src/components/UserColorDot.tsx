
import React from 'react';
import { cn } from '@/lib/utils';

interface UserColorDotProps {
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'orange';
  className?: string;
}

export const UserColorDot: React.FC<UserColorDotProps> = ({ color, className }) => {
  return (
    <span 
      className={cn(
        "event-dot", 
        `bg-event-${color}`,
        className
      )}
    />
  );
};
