
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApp } from '@/context/AppContext';
import { Avatar } from '@/components/Avatar';

export const UserProfileDialog: React.FC = () => {
  const { currentUser } = useApp();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Cette fonction sera implémentée plus tard avec la gestion des fichiers
    console.log('Avatar change:', e.target.files?.[0]);
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">Profil</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="flex flex-col items-center gap-4">
          <Avatar user={currentUser} size="lg" />
          <Label htmlFor="avatar" className="cursor-pointer">
            <span className="text-sm text-primary hover:underline">
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
            className="font-medium"
            readOnly
          />
        </div>
        
        <div className="grid gap-2">
          <Label>Couleur assignée</Label>
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full bg-event-${currentUser.color}`} />
            <span className="font-medium">{currentUser.color}</span>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};
