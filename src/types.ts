
export type ViewType = 'month' | 'week';

export interface User {
  id: string;
  name: string;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'orange';
  avatar?: string;
  initials: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  userId: string;
  notes: Note[];
  reactions: Reaction[];
}

export interface Note {
  id: string;
  userId: string;
  content: string;
  isPrivate: boolean;
  createdAt: Date;
}

export type ReactionType = 'like' | 'heart' | 'smile' | 'check' | 'question';

export interface Reaction {
  userId: string;
  type: ReactionType;
}

export interface Message {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
}
