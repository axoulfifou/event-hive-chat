
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, CalendarClock } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ViewType } from '@/types';

export const CalendarHeader: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    currentDate, 
    navigateMonth, 
    navigateWeek 
  } = useApp();

  const handleViewChange = (value: string) => {
    setCurrentView(value as ViewType);
  };

  const handleNavigate = (direction: 'next' | 'prev') => {
    if (currentView === 'month') {
      navigateMonth(direction);
    } else {
      navigateWeek(direction);
    }
  };

  return (
    <div className="flex flex-col space-y-2 px-2 py-3 md:px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <CalendarClock className="mr-2" />
          <h1 className="text-xl font-semibold">Event Hive</h1>
        </div>
        <Tabs value={currentView} onValueChange={handleViewChange} className="bg-white bg-opacity-20 rounded-md">
          <TabsList className="bg-transparent">
            <TabsTrigger 
              value="month"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-600 text-white"
            >
              Mois
            </TabsTrigger>
            <TabsTrigger 
              value="week"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-600 text-white"
            >
              Semaine
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">
          {format(currentDate, currentView === 'month' ? 'MMMM yyyy' : "'Semaine du' d MMMM", { locale: fr })}
        </h2>
        <div className="flex space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleNavigate('prev')}
            className="text-white hover:bg-white hover:bg-opacity-20"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setCurrentDate(new Date())} 
            size="sm"
            className="text-white hover:bg-white hover:bg-opacity-20"
          >
            Aujourd'hui
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleNavigate('next')}
            className="text-white hover:bg-white hover:bg-opacity-20"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
