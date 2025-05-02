
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import { Footer } from '@/components/Footer';
import { CalendarHeader } from '@/components/CalendarHeader';
import { useApp } from '@/context/AppContext';

const Settings = () => {
  const { setTheme } = useTheme();
  const [language, setLanguage] = useState('fr');
  const { users, addUser, removeUser } = useApp();

  return (
    <div className="flex flex-col min-h-screen">
      <CalendarHeader />

      <div className="flex-1 px-10 py-6 mb-16">
        <h1 className="text-2xl font-semibold mb-6">Paramètres</h1>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <Tabs defaultValue="users">
            <TabsList className="mb-6">
              <TabsTrigger value="users">Utilisateurs</TabsTrigger>
              <TabsTrigger value="language">Langue</TabsTrigger>
              <TabsTrigger value="theme">Thème</TabsTrigger>
              <TabsTrigger value="privacy">Confidentialité</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-4">Gestion des utilisateurs</h2>
                <div className="space-y-4">
                  {users.map(user => (
                    <div key={user.id} className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full bg-event-${user.color}`}></div>
                        <span>{user.name}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => removeUser(user.id)}
                      >
                        Supprimer
                      </Button>
                    </div>
                  ))}

                  <div className="pt-4">
                    <Button 
                      onClick={() => {
                        const name = prompt("Nom de l'utilisateur");
                        if (name) addUser(name);
                      }}
                    >
                      Ajouter un utilisateur
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="language" className="space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-4">Langue de l'application</h2>
                <RadioGroup value={language} onValueChange={setLanguage} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fr" id="fr" />
                    <Label htmlFor="fr">Français</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="en" id="en" />
                    <Label htmlFor="en">English</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="es" id="es" />
                    <Label htmlFor="es">Español</Label>
                  </div>
                </RadioGroup>
              </div>
            </TabsContent>

            <TabsContent value="theme" className="space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-4">Préférence de thème</h2>
                <RadioGroup defaultValue="system" className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light" onClick={() => setTheme('light')} />
                    <Label htmlFor="light">Clair</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="dark" onClick={() => setTheme('dark')} />
                    <Label htmlFor="dark">Sombre</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="system" onClick={() => setTheme('system')} />
                    <Label htmlFor="system">Système</Label>
                  </div>
                </RadioGroup>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-4">Options de confidentialité</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notifications" className="font-medium">Activer les notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir des notifications pour les nouveaux événements
                      </p>
                    </div>
                    <Switch id="notifications" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sharing" className="font-medium">Partage de calendrier</Label>
                      <p className="text-sm text-muted-foreground">
                        Autoriser le partage de votre calendrier avec d'autres utilisateurs
                      </p>
                    </div>
                    <Switch id="sharing" />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Settings;
