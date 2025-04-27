
import React, { useMemo } from 'react';
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isToday,
  isSameDay
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Event } from '@/components/Event';
import { useApp } from '@/context/AppContext';

export const WeekView: React.FC = () => {
  const { currentDate, events } = useApp();

  const weekDays = useMemo(() => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
    
    return eachDayOfInterval({ start: weekStart, end: weekEnd });
  }, [currentDate]);

  return (
    <div className="flex-1 overflow-y-auto pb-16">
      <div className="grid grid-cols-7 text-center border-b">
        {weekDays.map((day, idx) => (
          <div key={idx} className="py-2 flex flex-col items-center">
            <span className="text-xs font-medium text-muted-foreground">
              {format(day, 'EEE', { locale: fr })}
            </span>
            <div 
              className={cn(
                "text-sm font-medium mt-1 rounded-full w-7 h-7 flex items-center justify-center",
                isToday(day) && "bg-primary text-primary-foreground"
              )}
            >
              {format(day, 'd')}
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 h-full">
        {weekDays.map((day, idx) => {
          // Events for the current day
          const dayEvents = events.filter(event => isSameDay(event.date, day));
          
          return (
            <div 
              key={idx}
              className={cn(
                "p-2 border-b border-r h-full",
                isToday(day) && "bg-blue-50 dark:bg-blue-900/10"
              )}
            >
              <div className="space-y-2">
                {dayEvents.map(event => (
                  <Event key={event.id} event={event} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
