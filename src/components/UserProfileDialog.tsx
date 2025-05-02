
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApp } from '@/context/AppContext';
import { Avatar } from '@/components/Avatar';
import { User } from '@/types';
import { X } from 'lucide-react';

export const UserProfileDialog: React.FC = () => {
  const { currentUser, updateUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const colorOptions: User['color'][] = ['blue', 'green', 'yellow', 'red', 'purple', 'orange', 'teal'];

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

  const handleColorChange = (color: User['color']) => {
    updateUser({ ...currentUser, color });
  };

  return (
    <DialogContent className="sm:max-w-[425px] rounded-[30px] mx-10">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-center">Paramètres</DialogTitle>
      </DialogHeader>
      <div className="grid gap-8 py-4">
        <div className="flex flex-col items-center gap-4 relative">
          <div className="relative">
            <Avatar user={currentUser} size="lg" className="h-24 w-24" />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-white shadow-md"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
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

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              value={currentUser.name}
              onChange={handleNameChange}
              className="font-medium rounded-xl"
              placeholder="Votre nom"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="email">Adresse e-mail</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="font-medium rounded-xl"
              placeholder="Votre email"
              type="email"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="font-medium rounded-xl"
              placeholder="••••••••"
              type="password"
            />
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label>Couleur</Label>
          <div className="grid grid-cols-7 gap-2">
            {colorOptions.map((color) => (
              <Button
                key={color}
                type="button"
                className={`h-10 w-10 rounded-full border-2 p-0 ${currentUser.color === color ? 'border-violet-500' : 'border-transparent'}`}
                style={{ backgroundColor: `var(--event-${color})` }}
                onClick={() => handleColorChange(color)}
              >
                {currentUser.color === color && <span className="absolute inset-0 flex items-center justify-center text-white">✓</span>}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </DialogContent>
  );
};
