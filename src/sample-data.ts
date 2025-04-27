
import { User, Event, Message } from './types';
import { addDays, subDays } from 'date-fns';

// Utilisateurs fictifs
export const users: User[] = [
  { 
    id: '1', 
    name: 'Marie Dubois', 
    color: 'blue', 
    initials: 'MD'
  },
  { 
    id: '2', 
    name: 'Jean Martin', 
    color: 'green',
    initials: 'JM' 
  },
  { 
    id: '3', 
    name: 'Sara Bouchard', 
    color: 'purple',
    initials: 'SB'
  },
  { 
    id: '4', 
    name: 'Thomas Petit', 
    color: 'red',
    initials: 'TP' 
  },
  { 
    id: '5', 
    name: 'Julie Leroy', 
    color: 'yellow',
    initials: 'JL' 
  },
  { 
    id: '6', 
    name: 'Lucas Bernard', 
    color: 'orange',
    initials: 'LB' 
  }
];

// Utilisateur actuel (pour l'exemple)
export const currentUser = users[0];

// Événements fictifs
const today = new Date();
export const events: Event[] = [
  {
    id: '1',
    title: 'Cinéma - Avatar 3',
    description: 'Sortie du nouveau Avatar au Grand Rex',
    date: today,
    userId: '1',
    notes: [
      {
        id: '101',
        userId: '1',
        content: 'Prévoir d\'acheter les tickets à l\'avance',
        isPrivate: true,
        createdAt: subDays(today, 2)
      },
      {
        id: '102',
        userId: '2',
        content: 'Je peux amener du pop-corn!',
        isPrivate: false,
        createdAt: subDays(today, 1)
      }
    ],
    reactions: [
      { userId: '2', type: 'heart' },
      { userId: '3', type: 'smile' },
      { userId: '4', type: 'like' }
    ]
  },
  {
    id: '2',
    title: 'Dîner chez Marco',
    description: 'Soirée pizza et jeux de société',
    date: addDays(today, 2),
    userId: '3',
    notes: [
      {
        id: '201',
        userId: '3',
        content: 'J\'amène les boissons',
        isPrivate: false,
        createdAt: subDays(today, 3)
      }
    ],
    reactions: [
      { userId: '1', type: 'like' },
      { userId: '5', type: 'heart' }
    ]
  },
  {
    id: '3',
    title: 'Randonnée Mont Blanc',
    description: 'Départ à 8h du parking habituel',
    date: addDays(today, 5),
    userId: '2',
    notes: [],
    reactions: [
      { userId: '1', type: 'question' },
      { userId: '4', type: 'check' }
    ]
  },
  {
    id: '4',
    title: 'Anniversaire Julie',
    description: 'Rendez-vous au Café des Arts à 19h',
    date: addDays(today, 7),
    userId: '5',
    notes: [
      {
        id: '401',
        userId: '1',
        content: 'Ne pas oublier le cadeau!',
        isPrivate: true,
        createdAt: subDays(today, 1)
      }
    ],
    reactions: [
      { userId: '2', type: 'heart' },
      { userId: '3', type: 'heart' },
      { userId: '6', type: 'heart' }
    ]
  },
  {
    id: '5',
    title: 'Concert de jazz',
    description: 'Au Blue Note - places limitées',
    date: addDays(today, 10),
    userId: '4',
    notes: [],
    reactions: []
  },
  {
    id: '6',
    title: 'Matchs de foot',
    description: 'PSG vs Marseille au Parc des Princes',
    date: addDays(today, 14),
    userId: '6',
    notes: [
      {
        id: '601',
        userId: '6',
        content: 'J\'ai les billets pour tous',
        isPrivate: false,
        createdAt: subDays(today, 10)
      }
    ],
    reactions: [
      { userId: '1', type: 'like' },
      { userId: '2', type: 'like' },
      { userId: '4', type: 'like' },
      { userId: '5', type: 'heart' }
    ]
  }
];

// Messages fictifs pour le chat
export const messages: Message[] = [
  {
    id: '1',
    userId: '2',
    content: 'Qui est disponible pour le cinéma ce weekend?',
    timestamp: subDays(new Date(), 1)
  },
  {
    id: '2',
    userId: '1',
    content: 'Je suis libre samedi soir!',
    timestamp: subDays(new Date(), 1)
  },
  {
    id: '3',
    userId: '3',
    content: 'Je peux venir aussi, on pourrait aller manger après?',
    timestamp: subDays(new Date(), 1)
  },
  {
    id: '4',
    userId: '5',
    content: 'Est-ce que quelqu\'un peut m\'aider à préparer mon anniversaire?',
    timestamp: new Date()
  },
  {
    id: '5',
    userId: '4',
    content: 'Je peux t\'aider Julie! Je te contacte en privé.',
    timestamp: new Date()
  }
];
