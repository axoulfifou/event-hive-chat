
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApp } from '@/context/AppContext';
import { Avatar } from '@/components/Avatar';

export const UserProfileDialog: React.FC = () => {
  const { currentUser, updateUser } = useApp();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ ...currentUser, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUser({ ...currentUser, name: e.target.value });
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">Profil</DialogTitle>
        <DialogDescription>
          Modifiez vos informations de profil ici
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-6 py-4">
        <div className="flex flex-col items-center gap-4">
          <Avatar user={currentUser} size="lg" />
          <Label htmlFor="avatar" className="cursor-pointer">
            <span className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors">
              Changer l'avatar
            </span>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </Label>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="name">Nom</Label>
          <Input
            id="name"
            value={currentUser.name}
            onChange={handleNameChange}
            className="font-medium"
          />
        </div>
        
        <div className="grid gap-2">
          <Label>Couleur assignée</Label>
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full bg-gradient-to-br from-event-${currentUser.color}/50 to-event-${currentUser.color}`} />
            <span className="font-medium">{currentUser.color}</span>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};
