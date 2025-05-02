
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type EventType = 'event' | 'busy' | 'free';

export const NewEventDialog: React.FC = () => {
  const { addEvent, currentUser } = useApp();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [eventType, setEventType] = useState<EventType>('event');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    const typePrefix = eventType === 'busy' ? '[Occupé] ' : 
                       eventType === 'free' ? '[Libre] ' : '';
    
    const updatedDescription = `${description}\n\nCréé par ${currentUser.name}`;
    
    addEvent({
      title: typePrefix + title,
      description: updatedDescription,
      date: date,
      userId: currentUser.id,
    });
    
    // Reset the form
    setTitle('');
    setDescription('');
    setDate(new Date());
    setEventType('event');
    
    // Close the dialog by dispatching an Escape key event
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);
  };

  return (
    <DialogContent className="sm:max-w-[400px] rounded-[30px]">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">Nouvel événement</DialogTitle>
        <DialogDescription>
          Ajoutez un nouvel événement à votre calendrier
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="event-type">Type d'événement</Label>
            <RadioGroup 
              id="event-type" 
              value={eventType} 
              onValueChange={(value) => setEventType(value as EventType)}
              className="flex space-x-2 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="event" id="event" />
                <Label htmlFor="event">Événement</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="busy" id="busy" />
                <Label htmlFor="busy">Occupé</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="free" id="free" />
                <Label htmlFor="free">Libre</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Réunion d'équipe"
              className="w-full"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Détails de l'événement..."
              className="min-h-[100px]"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  id="date"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: fr }) : <span>Sélectionnez une date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    if (selectedDate) {
                      setDate(selectedDate);
                      setIsCalendarOpen(false);
                    }
                  }}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500">Ajouter</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

// Ajout du composant Label car il est utilisé dans ce fichier
const Label = ({ htmlFor, children, className }: { htmlFor?: string; children: React.ReactNode; className?: string }) => (
  <label htmlFor={htmlFor} className={cn("text-sm font-medium leading-none", className)}>
    {children}
  </label>
);
