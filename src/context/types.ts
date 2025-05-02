
import { ViewType, Event, User, Note, Reaction, Message } from '../types';

export interface AppContextType {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  navigateMonth: (direction: 'next' | 'prev') => void;
  navigateWeek: (direction: 'next' | 'prev') => void;
  events: Event[];
  allEvents: Event[];
  users: User[];
  currentUser: User;
  selectedEvent: Event | null;
  setSelectedEvent: (event: Event | null) => void;
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  messages: Message[];
  selectedUserFilter: string | null;
  setSelectedUserFilter: (userId: string | null) => void;
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
  updateUser: (user: User) => void;
  addUser: (name: string) => void;
  removeUser: (userId: string) => void;
}
