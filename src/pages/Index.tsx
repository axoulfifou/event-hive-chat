
import React from 'react';
import { CalendarHeader } from '@/components/CalendarHeader';
import { Footer } from '@/components/Footer';
import { MonthView } from '@/components/calendar/MonthView';
import { WeekView } from '@/components/calendar/WeekView';
import { EventDetail } from '@/components/event-detail/EventDetail';
import { Chat } from '@/components/Chat';
import { useApp } from '@/context/AppContext';
import { AppProvider } from '@/context/AppContext';

const CalendarApp: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <CalendarHeader />
      
      {currentView === 'month' ? <MonthView /> : <WeekView />}
      
      <Footer />
      
      <EventDetail />
      <Chat />
    </div>
  );
};

// Nous utilisons un composant wrapper pour fournir le contexte
const Index: React.FC = () => {
  return (
    <AppProvider>
      <CalendarApp />
    </AppProvider>
  );
};

export default Index;
