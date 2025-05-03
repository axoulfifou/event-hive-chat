
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/ui/button';
import { UserX, Mail, CheckCircle, XCircle, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const Users = () => {
  const { users, currentUser, removeUser } = useApp();
  const [email, setEmail] = useState('');

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

  // Simulating some users being active and others not
  const activeUsers = new Set([currentUser.id, users[0]?.id, users[2]?.id]);

  const notifyAllUsers = () => {
    toast.success("Tous les membres ont été notifiés");
  };

  return (
    <div className="container mx-auto px-10 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 text-center text-violet-500">
        Gestion des participants
      </h1>
      
      <div className="grid gap-6">
        <Card className="border-none shadow-md bg-white/60 backdrop-blur-sm rounded-[30px]">
          <CardHeader>
            <CardTitle className="text-xl">Liste des participants</CardTitle>
            <CardDescription>
              Les participants au calendrier et invitations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map(user => (
                <div 
                  key={user.id} 
                  className="flex items-center justify-between p-4 rounded-lg border transition-all hover:shadow-md bg-white/70 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3">
                    <Avatar user={user} />
                    <div>
                      <span className="font-medium">{user.name}</span>
                      {activeUsers.has(user.id) ? (
                        <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          <span>Actif</span>
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="ml-2 bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center gap-1">
                          <XCircle className="h-3 w-3" />
                          <span>Inactif</span>
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => toast.success(`Notification envoyée à ${user.name}`)}
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      Notifier
                    </Button>
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
                </div>
              ))}
              
              <div className="mt-6 border-t pt-4">
                <Button 
                  onClick={notifyAllUsers}
                  className="bg-gradient-to-r from-violet-400 to-blue-400 hover:from-violet-500 hover:to-blue-500 w-full mb-4"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Notifier tous les membres
                </Button>
                
                <form onSubmit={handleInviteByEmail} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@exemple.com"
                      className="w-full rounded-xl"
                    />
                    <Button 
                      type="submit" 
                      variant="default"
                      className="w-full bg-gradient-to-r from-violet-400 to-blue-400 hover:from-violet-500 hover:to-blue-500"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Envoyer l'invitation
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Users;
