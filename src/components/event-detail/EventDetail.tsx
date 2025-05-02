
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/Avatar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon, Trash } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { EventNotes } from '@/components/event-detail/EventNotes';
import { EventReactions } from '@/components/event-detail/EventReactions';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

export const EventDetail: React.FC = () => {
  const { selectedEvent, setSelectedEvent, users, deleteEvent, currentUser } = useApp();
  const isMobile = useIsMobile();
  
  const handleClose = () => {
    setSelectedEvent(null);
  };
  
  const handleDelete = () => {
    if (!selectedEvent) return;
    deleteEvent(selectedEvent.id);
  };
  
  if (!selectedEvent) return null;
  
  const eventUser = users.find(u => u.id === selectedEvent.userId);
  const participants = selectedEvent.participants || [];

  return (
    <Sheet open={!!selectedEvent} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <SheetContent className={cn(
        "flex flex-col rounded-[30px]",
        isMobile ? "w-full max-w-full p-4" : "sm:max-w-md"
      )}>
        <SheetHeader className="space-y-2 pb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className={cn(
                "w-1 h-6 rounded-full",
                `bg-event-${eventUser?.color}`
              )} />
              <SheetTitle className="text-xl font-semibold">{selectedEvent.title}</SheetTitle>
            </div>
          </div>
        </SheetHeader>
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="border rounded-md p-4 mb-4 space-y-4 bg-background shadow-sm">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              <span className="text-sm">
                {format(new Date(selectedEvent.date), "EEEE d MMMM yyyy", { locale: fr })}
              </span>
            </div>
            
            <p className="text-sm">{selectedEvent.description}</p>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Créé par:</span>
              {eventUser && <Avatar user={eventUser} size="sm" />}
              <span className="text-sm">{eventUser?.name}</span>
            </div>

            {participants.length > 0 && (
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium">Participants:</span>
                <div className="flex flex-wrap gap-2">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center space-x-1 bg-secondary rounded-full px-2 py-1">
                      <Avatar user={participant} size="sm" />
                      <span className="text-xs">{participant.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Réactions */}
          <EventReactions event={selectedEvent} />
          
          {/* Notes */}
          <EventNotes event={selectedEvent} />
          
          {/* Bouton de suppression (visible seulement pour le créateur) */}
          {selectedEvent.userId === currentUser.id && (
            <Button 
              variant="destructive" 
              className="mt-auto mb-2"
              onClick={handleDelete}
            >
              <Trash className="h-4 w-4 mr-2" /> Supprimer l'événement
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
