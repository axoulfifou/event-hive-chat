
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/ui/button';
import { UserX, Mail, CheckCircle, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
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
              <CardTitle className="text-xl">Liste des participants</CardTitle>
              <CardDescription>
                Les participants au calendrier
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
            </CardContent>
          </Card>
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
                    className="w-full bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500"
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
