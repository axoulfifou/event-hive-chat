
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { ViewType, Event, User, Message } from '../types';
import { events as initialEvents, users as initialUsers, messages as initialMessages, currentUser as defaultCurrentUser } from '../sample-data';
import { toast } from "sonner";
import { AppContextType } from './types';
import { useNavigationActions } from './hooks/useNavigationActions';
import { useEventActions } from './hooks/useEventActions';
import { useUserActions } from './hooks/useUserActions';
import { useMessageActions } from './hooks/useMessageActions';

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
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [currentUser, setCurrentUser] = useState<User>(defaultCurrentUser);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const [selectedUserFilter, setSelectedUserFilter] = useState<string | null>(null);

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

  const { navigateMonth, navigateWeek } = useNavigationActions(setCurrentDate);
  
  const eventActions = useEventActions(events, setEvents, setSelectedEvent, showNotification);
  
  const userActions = useUserActions(users, setUsers, currentUser, setCurrentUser);
  
  const messageActions = useMessageActions(
    setMessages,
    currentUser,
    chatOpen,
    setHasNewMessages,
    showNotification
  );

  // Filter events based on selected user but check if participants property exists
  const filteredEvents = selectedUserFilter
    ? events.filter(event => 
        event.userId === selectedUserFilter || 
        (event.participants && event.participants.some(p => p.id === selectedUserFilter))
      )
    : events;

  const value: AppContextType = {
    currentView,
    setCurrentView,
    currentDate,
    setCurrentDate,
    navigateMonth,
    navigateWeek,
    events: filteredEvents,
    allEvents: events,
    users,
    currentUser,
    selectedEvent,
    setSelectedEvent,
    chatOpen,
    setChatOpen,
    messages,
    selectedUserFilter,
    setSelectedUserFilter,
    ...eventActions,
    ...userActions,
    ...messageActions,
    hasNewMessages,
    setHasNewMessages,
    showNotification,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
