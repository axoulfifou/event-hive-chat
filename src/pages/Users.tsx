
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/ui/button';
import { Plus, UserX, Mail, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const Users = () => {
  const { users, currentUser, addUser, removeUser } = useApp();
  const [newUserName, setNewUserName] = useState('');
  const [email, setEmail] = useState('');

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUserName.trim()) {
      addUser(newUserName.trim());
      setNewUserName('');
      toast.success("Participant ajouté avec succès");
    }
  };

  const handleInviteByEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      // Simuler l'envoi d'une invitation par email
      toast.success(`Invitation envoyée à ${email}`);
      setEmail('');
    } else {
      toast.error("Veuillez saisir une adresse email valide");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
        Gestion des participants
      </h1>
      
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="users">Participants</TabsTrigger>
          <TabsTrigger value="invite">Inviter</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <Card className="border-none shadow-md bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Ajouter un participant</CardTitle>
              <CardDescription>
                Ajoutez un nouveau participant au calendrier
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddUser} className="flex gap-2 mb-8">
                <Input
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="Nom du participant"
                  className="max-w-xs"
                />
                <Button type="submit" variant="default" className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="mt-6 space-y-4">
            {users.map(user => (
              <div 
                key={user.id} 
                className="flex items-center justify-between p-4 rounded-lg border transition-all hover:shadow-md bg-white/70 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <Avatar user={user} />
                  <span className="font-medium">{user.name}</span>
                </div>
                {user.id !== currentUser.id && (
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => removeUser(user.id)}
                    className="hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <UserX className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="invite">
          <Card className="border-none shadow-md bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Inviter par email</CardTitle>
              <CardDescription>
                Envoyez une invitation à rejoindre le calendrier
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleInviteByEmail} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@exemple.com"
                    className="w-full"
                  />
                  <Button 
                    type="submit" 
                    variant="default"
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Envoyer l'invitation
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Users;
