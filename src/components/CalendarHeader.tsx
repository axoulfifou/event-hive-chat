
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, CalendarClock, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ViewType } from '@/types';
import { Avatar } from './Avatar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const CalendarHeader: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    currentDate, 
    setCurrentDate,
    navigateMonth, 
    navigateWeek,
    users,
    currentUser,
    setSelectedUserFilter
  } = useApp();
  
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

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

  const handleUserSelect = (userId: string | null) => {
    setSelectedUser(userId);
    setSelectedUserFilter(userId);
  };

  return (
    <div className="flex flex-col space-y-2 px-10 py-3 md:px-10 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <CalendarClock className="mr-2" />
          <h1 className="text-xl font-semibold text-violet-500">Yen DAY</h1>
        </div>
        <Tabs value={currentView} onValueChange={handleViewChange} className="bg-white bg-opacity-40 rounded-md">
          <TabsList className="bg-transparent">
            <TabsTrigger 
              value="month"
              className="data-[state=active]:bg-white data-[state=active]:text-violet-600 text-violet-600"
            >
              Mois
            </TabsTrigger>
            <TabsTrigger 
              value="week"
              className="data-[state=active]:bg-white data-[state=active]:text-violet-600 text-violet-600"
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
            className="text-violet-600 hover:bg-white hover:bg-opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setCurrentDate(new Date())} 
            size="sm"
            className="text-violet-600 hover:bg-white hover:bg-opacity-30"
          >
            Aujourd'hui
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleNavigate('next')}
            className="text-violet-600 hover:bg-white hover:bg-opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        <Button 
          variant={selectedUser === null ? "secondary" : "ghost"}
          size="sm"
          className="rounded-full"
          onClick={() => handleUserSelect(null)}
        >
          <User className="h-4 w-4 mr-1" />
          <span className="text-xs">Tous</span>
        </Button>

        {users.map(user => (
          <Button 
            key={user.id}
            variant={selectedUser === user.id ? "secondary" : "ghost"}
            size="sm"
            className="rounded-full p-0 h-8 min-w-8 bg-white bg-opacity-70"
            onClick={() => handleUserSelect(user.id)}
          >
            <Avatar user={user} size="sm" className={selectedUser === user.id ? "ring-2 ring-offset-1 ring-violet-500" : ""} />
          </Button>
        ))}
      </div>
    </div>
  );
};
