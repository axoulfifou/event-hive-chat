
import React, { useMemo } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isToday,
  isSameDay
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Event } from '@/components/Event';
import { useApp } from '@/context/AppContext';

export const MonthView: React.FC = () => {
  const { currentDate, events } = useApp();

  const days = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
    
    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [currentDate]);

  const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  return (
    <div className="flex-1 overflow-y-auto pb-16">
      <div className="grid grid-cols-7 text-center border-b">
        {weekDays.map(day => (
          <div key={day} className="py-2 text-xs font-bold text-muted-foreground">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 auto-rows-fr min-h-[calc(100%-32px)] h-full">
        {days.map((day, idx) => {
          const dayEvents = events.filter(event => isSameDay(event.date, day));
          const hasEvents = dayEvents.length > 0;
          
          return (
            <div 
              key={idx}
              className={cn(
                "p-1 border-b border-r min-h-[100px]",
                !isSameMonth(day, currentDate) && "bg-muted/30 text-muted-foreground",
                hasEvents && "event-day"
              )}
            >
              <div 
                className={cn(
                  "text-xs font-bold mb-1 p-0.5 rounded-full w-6 h-6 flex items-center justify-center",
                  isToday(day) && "bg-primary text-primary-foreground"
                )}
              >
                {format(day, 'd')}
              </div>
              <div className="space-y-1 overflow-y-auto max-h-[80px]">
                {dayEvents.map(event => (
                  <Event key={event.id} event={event} isCompact />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
