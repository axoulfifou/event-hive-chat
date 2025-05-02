
import React from 'react';
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User } from '@/types';

export const UserProfileDialog: React.FC = () => {
  const { currentUser, updateUser } = useApp();

  const colorOptions: User['color'][] = ['blue', 'green', 'yellow', 'red', 'purple', 'orange'];

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
    <DialogContent className="sm:max-w-[425px] rounded-[30px]">
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
          <Label>Couleur de l'utilisateur</Label>
          <div className="grid grid-cols-3 gap-2">
            {colorOptions.map((color) => (
              <Button
                key={color}
                type="button"
                className={`h-12 rounded-full border-2 ${currentUser.color === color ? 'border-primary' : 'border-transparent'}`}
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
