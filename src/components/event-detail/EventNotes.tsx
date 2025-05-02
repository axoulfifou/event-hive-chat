
import React, { useState } from 'react';
import { Event, Note, User } from '@/types';
import { useApp } from '@/context/AppContext';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { format, formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { MessageSquare } from 'lucide-react';

interface EventNotesProps {
  event: Event;
}

export const EventNotes: React.FC<EventNotesProps> = ({ event }) => {
  const { users, currentUser, addNote } = useApp();
  const [noteContent, setNoteContent] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  
  const visibleNotes = event.notes.filter(note => 
    !note.isPrivate || note.userId === currentUser.id
  );
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;
    
    addNote(event.id, {
      userId: currentUser.id,
      content: noteContent.trim(),
      isPrivate
    });
    
    setNoteContent('');
    setIsPrivate(false);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <h3 className="text-sm font-medium mb-2 flex items-center">
        <MessageSquare className="h-4 w-4 mr-1.5" />
        Notes et commentaires
      </h3>
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-3">
        {visibleNotes.length > 0 ? (
          visibleNotes.map(note => (
            <NoteItem 
              key={note.id} 
              note={note} 
              users={users}
            />
          ))
        ) : (
          <div className="text-sm text-muted-foreground italic text-center py-6">
            Aucune note pour le moment
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-2">
        <Textarea
          placeholder="Ajouter une note ou un commentaire..."
          value={noteContent}
          onChange={e => setNoteContent(e.target.value)}
          className="resize-none"
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="private"
              checked={isPrivate}
              onCheckedChange={(checked) => setIsPrivate(checked === true)}
            />
            <label 
              htmlFor="private" 
              className="text-xs cursor-pointer text-muted-foreground"
            >
              Note privée (visible uniquement par moi)
            </label>
          </div>
          
          <Button 
            type="submit"
            size="sm"
            disabled={!noteContent.trim()}
          >
            Ajouter
          </Button>
        </div>
      </form>
    </div>
  );
};

interface NoteItemProps {
  note: Note;
  users: User[];
}

const NoteItem: React.FC<NoteItemProps> = ({ note, users }) => {
  const noteUser = users.find(u => u.id === note.userId);
  if (!noteUser) return null;
  
  return (
    <div 
      className={cn(
        "border rounded-md p-3 animate-fade-in",
        note.isPrivate && "bg-muted/30 border-dashed"
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center space-x-2">
          <Avatar user={noteUser} size="sm" />
          <span className="text-sm font-medium">{noteUser.name}</span>
        </div>
        <div className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(note.createdAt), { 
            addSuffix: true,
            locale: fr
          })}
          {note.isPrivate && (
            <span className="ml-1 bg-muted-foreground/20 text-muted-foreground px-1 rounded text-[10px]">
              Privée
            </span>
          )}
        </div>
      </div>
      <p className="text-sm whitespace-pre-line">{note.content}</p>
    </div>
  );
};
