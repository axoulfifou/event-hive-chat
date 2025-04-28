
import { useCallback } from 'react';
import { Event, Note, Reaction } from '@/types';
import { toast } from "sonner";

export const useEventActions = (
  events: Event[],
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>,
  setSelectedEvent: (event: Event | null) => void,
  showNotification: (message: string, eventId?: string) => void
) => {
  const addEvent = useCallback((eventData: Omit<Event, 'id' | 'notes' | 'reactions'>) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      notes: [],
      reactions: []
    };
    
    setEvents(prev => [...prev, newEvent]);
    showNotification("Nouvel événement ajouté!", newEvent.id);
  }, [showNotification]);

  const deleteEvent = useCallback((eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    setSelectedEvent(null);
    showNotification("Événement supprimé");
  }, [setSelectedEvent, showNotification]);

  const updateEvent = useCallback((updatedEvent: Event) => {
    setEvents(prev => prev.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
    setSelectedEvent(updatedEvent);
  }, [setSelectedEvent]);

  const addNote = useCallback((eventId: string, noteData: Omit<Note, 'id' | 'createdAt'>) => {
    const newNote: Note = {
      ...noteData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    setEvents(prev => prev.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          notes: [...event.notes, newNote]
        };
      }
      return event;
    }));
    
    if (!noteData.isPrivate) {
      showNotification(`Nouvelle note sur "${events.find(e => e.id === eventId)?.title}"`, eventId);
    }
  }, [events, showNotification]);

  const addReaction = useCallback((eventId: string, reaction: Reaction) => {
    setEvents(prev => prev.map(event => {
      if (event.id === eventId) {
        const existingReactionIndex = event.reactions.findIndex(
          r => r.userId === reaction.userId && r.type === reaction.type
        );
        
        if (existingReactionIndex !== -1) {
          return event;
        }
        
        return {
          ...event,
          reactions: [...event.reactions, reaction]
        };
      }
      return event;
    }));
  }, []);

  const removeReaction = useCallback((eventId: string, userId: string, reactionType: string) => {
    setEvents(prev => prev.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          reactions: event.reactions.filter(
            r => !(r.userId === userId && r.type === reactionType)
          )
        };
      }
      return event;
    }));
  }, []);

  return {
    addEvent,
    deleteEvent,
    updateEvent,
    addNote,
    addReaction,
    removeReaction,
  };
};
