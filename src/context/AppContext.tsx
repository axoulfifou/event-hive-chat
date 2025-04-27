
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { ViewType, Event, User, Note, Reaction, Message } from '../types';
import { events as initialEvents, users as initialUsers, messages as initialMessages, currentUser as defaultCurrentUser } from '../sample-data';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addMonths, subMonths, addWeeks, subWeeks } from 'date-fns';
import { toast } from "sonner";

interface AppContextType {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  navigateMonth: (direction: 'next' | 'prev') => void;
  navigateWeek: (direction: 'next' | 'prev') => void;
  events: Event[];
  users: User[];
  currentUser: User;
  selectedEvent: Event | null;
  setSelectedEvent: (event: Event | null) => void;
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  messages: Message[];
  addEvent: (event: Omit<Event, 'id' | 'notes' | 'reactions'>) => void;
  deleteEvent: (eventId: string) => void;
  updateEvent: (event: Event) => void;
  addNote: (eventId: string, note: Omit<Note, 'id' | 'createdAt'>) => void;
  addReaction: (eventId: string, reaction: Reaction) => void;
  removeReaction: (eventId: string, userId: string, reactionType: string) => void;
  sendMessage: (content: string) => void;
  hasNewMessages: boolean;
  setHasNewMessages: (value: boolean) => void;
  showNotification: (message: string, eventId?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewType>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [users] = useState<User[]>(initialUsers);
  const [currentUser] = useState<User>(defaultCurrentUser);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [hasNewMessages, setHasNewMessages] = useState(false);

  const navigateMonth = useCallback((direction: 'next' | 'prev') => {
    setCurrentDate(prevDate => {
      return direction === 'next' ? addMonths(prevDate, 1) : subMonths(prevDate, 1);
    });
  }, []);

  const navigateWeek = useCallback((direction: 'next' | 'prev') => {
    setCurrentDate(prevDate => {
      return direction === 'next' ? addWeeks(prevDate, 1) : subWeeks(prevDate, 1);
    });
  }, []);

  const showNotification = useCallback((message: string, eventId?: string) => {
    toast(message, {
      action: eventId ? {
        label: "Voir",
        onClick: () => {
          const event = events.find(e => e.id === eventId);
          if (event) setSelectedEvent(event);
        }
      } : undefined
    });
  }, [events]);

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
    if (selectedEvent?.id === eventId) {
      setSelectedEvent(null);
    }
    showNotification("Événement supprimé");
  }, [selectedEvent, showNotification]);

  const updateEvent = useCallback((updatedEvent: Event) => {
    setEvents(prev => prev.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
    
    if (selectedEvent?.id === updatedEvent.id) {
      setSelectedEvent(updatedEvent);
    }
  }, [selectedEvent]);

  const addNote = useCallback((eventId: string, noteData: Omit<Note, 'id' | 'createdAt'>) => {
    const newNote: Note = {
      ...noteData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    setEvents(prev => prev.map(event => {
      if (event.id === eventId) {
        const updatedEvent = {
          ...event,
          notes: [...event.notes, newNote]
        };
        return updatedEvent;
      }
      return event;
    }));
    
    if (selectedEvent?.id === eventId) {
      setSelectedEvent(prev => {
        if (!prev) return null;
        return {
          ...prev,
          notes: [...prev.notes, newNote]
        };
      });
    }
    
    if (!noteData.isPrivate) {
      showNotification(`Nouvelle note sur "${events.find(e => e.id === eventId)?.title}"`, eventId);
    }
  }, [selectedEvent, events, showNotification]);

  const addReaction = useCallback((eventId: string, reaction: Reaction) => {
    setEvents(prev => prev.map(event => {
      if (event.id === eventId) {
        // Vérifie si l'utilisateur a déjà réagi avec ce type
        const existingReactionIndex = event.reactions.findIndex(
          r => r.userId === reaction.userId && r.type === reaction.type
        );
        
        let updatedReactions = [...event.reactions];
        if (existingReactionIndex !== -1) {
          // Si la réaction existe déjà, on ne fait rien
          return event;
        } else {
          // Sinon on ajoute la nouvelle réaction
          updatedReactions.push(reaction);
        }
        
        const updatedEvent = {
          ...event,
          reactions: updatedReactions
        };
        return updatedEvent;
      }
      return event;
    }));
    
    if (selectedEvent?.id === eventId) {
      setSelectedEvent(prev => {
        if (!prev) return null;
        
        const existingReactionIndex = prev.reactions.findIndex(
          r => r.userId === reaction.userId && r.type === reaction.type
        );
        
        let updatedReactions = [...prev.reactions];
        if (existingReactionIndex === -1) {
          updatedReactions.push(reaction);
        }
        
        return {
          ...prev,
          reactions: updatedReactions
        };
      });
    }
  }, [selectedEvent]);

  const removeReaction = useCallback((eventId: string, userId: string, reactionType: string) => {
    setEvents(prev => prev.map(event => {
      if (event.id === eventId) {
        const updatedEvent = {
          ...event,
          reactions: event.reactions.filter(
            r => !(r.userId === userId && r.type === reactionType)
          )
        };
        return updatedEvent;
      }
      return event;
    }));
    
    if (selectedEvent?.id === eventId) {
      setSelectedEvent(prev => {
        if (!prev) return null;
        return {
          ...prev,
          reactions: prev.reactions.filter(
            r => !(r.userId === userId && r.type === reactionType)
          )
        };
      });
    }
  }, [selectedEvent]);

  const sendMessage = useCallback((content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      userId: currentUser.id,
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    if (!chatOpen) {
      setHasNewMessages(true);
      showNotification("Nouveau message dans le chat");
    }
  }, [currentUser, chatOpen, showNotification]);

  const value = {
    currentView,
    setCurrentView,
    currentDate,
    setCurrentDate,
    navigateMonth,
    navigateWeek,
    events,
    users,
    currentUser,
    selectedEvent,
    setSelectedEvent,
    chatOpen,
    setChatOpen,
    messages,
    addEvent,
    deleteEvent,
    updateEvent,
    addNote,
    addReaction,
    removeReaction,
    sendMessage,
    hasNewMessages,
    setHasNewMessages,
    showNotification
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
