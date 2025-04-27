
import React from 'react';
import { Avatar as AvatarUI, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from '@/types';
import { cn } from '@/lib/utils';

interface AvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ user, size = 'md', className }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10'
  };

  return (
    <div className={cn("relative", className)}>
      <AvatarUI className={cn(sizeClasses[size])}>
        {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
        <AvatarFallback 
          className={cn(`bg-event-${user.color}`, "text-white font-medium")}
        >
          {user.initials}
        </AvatarFallback>
      </AvatarUI>
    </div>
  );
};
