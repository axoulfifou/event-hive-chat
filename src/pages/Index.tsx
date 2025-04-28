
import React from 'react';
import { CalendarHeader } from '@/components/CalendarHeader';
import { Footer } from '@/components/Footer';
import { MonthView } from '@/components/calendar/MonthView';
import { WeekView } from '@/components/calendar/WeekView';
import { EventDetail } from '@/components/event-detail/EventDetail';
import { Chat } from '@/components/Chat';
import { useApp } from '@/context/AppContext';

const Index: React.FC = () => {
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

export default Index;
