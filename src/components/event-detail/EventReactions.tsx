
import React from 'react';
import { Event, Reaction, ReactionType } from '@/types';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Heart, ThumbsUp, Check, HelpCircle, Smile } from 'lucide-react';

interface EventReactionsProps {
  event: Event;
}

export const EventReactions: React.FC<EventReactionsProps> = ({ event }) => {
  const { users, addReaction, removeReaction, currentUser } = useApp();
  
  const reactionCounts = event.reactions.reduce<Record<ReactionType, number>>((acc, reaction) => {
    acc[reaction.type] = (acc[reaction.type] || 0) + 1;
    return acc;
  }, {} as Record<ReactionType, number>);
  
  const reactions: Array<{type: ReactionType; icon: React.ReactNode; label: string}> = [
    { type: 'like', icon: <ThumbsUp className="h-4 w-4" />, label: 'J\'aime' },
    { type: 'heart', icon: <Heart className="h-4 w-4" />, label: 'Adore' },
    { type: 'smile', icon: <Smile className="h-4 w-4" />, label: 'Sourire' },
    { type: 'check', icon: <Check className="h-4 w-4" />, label: 'Présent' },
    { type: 'question', icon: <HelpCircle className="h-4 w-4" />, label: 'Question' }
  ];
  
  const hasReacted = (type: ReactionType) => {
    return event.reactions.some(r => r.userId === currentUser.id && r.type === type);
  };
  
  const handleReaction = (type: ReactionType) => {
    if (hasReacted(type)) {
      removeReaction(event.id, currentUser.id, type);
    } else {
      addReaction(event.id, { userId: currentUser.id, type });
    }
  };
  
  const getUserNames = (reactions: Reaction[], type: ReactionType) => {
    return reactions
      .filter(r => r.type === type)
      .map(r => {
        const user = users.find(u => u.id === r.userId);
        return user ? user.name : '';
      })
      .filter(Boolean)
      .join(', ');
  };

  return (
    <div className="mb-4 space-y-3">
      <h3 className="text-sm font-medium">Réactions</h3>
      
      <div className="flex flex-wrap gap-2">
        {reactions.map((reaction) => {
          const count = reactionCounts[reaction.type] || 0;
          const active = hasReacted(reaction.type);
          const users = getUserNames(event.reactions, reaction.type);
          
          return (
            <Button
              key={reaction.type}
              variant="outline"
              size="sm"
              className={cn(
                "gap-1.5", 
                active && "bg-accent text-accent-foreground"
              )}
              onClick={() => handleReaction(reaction.type)}
              title={users ? `${users}` : ""}
            >
              {reaction.icon}
              {count > 0 && <span className="text-xs">{count}</span>}
            </Button>
          );
        })}
      </div>
      
      {event.reactions.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(reactionCounts).map(([type, count]) => {
            if (count === 0) return null;
            const reactionConfig = reactions.find(r => r.type === type);
            if (!reactionConfig) return null;
            
            return (
              <Badge key={type} variant="secondary" className="gap-1">
                {reactionConfig.icon} {count}
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
};
