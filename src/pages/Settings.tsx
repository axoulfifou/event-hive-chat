
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, UserRound, Globe, Palette, Shield, Bell } from 'lucide-react';

const Settings = () => {
  const [language, setLanguage] = useState("fr");
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" asChild className="mr-3">
          <Link to="/"><ChevronLeft className="mr-1" /> Retour</Link>
        </Button>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
          Paramètres
        </h1>
      </div>
      
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="users">
            <UserRound className="w-4 h-4 mr-2" />
            <span>Utilisateurs</span>
          </TabsTrigger>
          <TabsTrigger value="language">
            <Globe className="w-4 h-4 mr-2" />
            <span>Langue</span>
          </TabsTrigger>
          <TabsTrigger value="themes">
            <Palette className="w-4 h-4 mr-2" />
            <span>Thèmes</span>
          </TabsTrigger>
          <TabsTrigger value="privacy">
            <Shield className="w-4 h-4 mr-2" />
            <span>Confidentialité</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <Card className="border-none shadow-md bg-white/60 backdrop-blur-sm rounded-[30px]">
            <CardHeader>
              <CardTitle>Gestion des utilisateurs</CardTitle>
              <CardDescription>
                Gérez les utilisateurs et les permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full">
                <Link to="/users">
                  <UserRound className="mr-2" />
                  Aller à la page utilisateurs
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="language">
          <Card className="border-none shadow-md bg-white/60 backdrop-blur-sm rounded-[30px]">
            <CardHeader>
              <CardTitle>Paramètres de langue</CardTitle>
              <CardDescription>
                Choisissez votre langue préférée
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Langue</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une langue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="themes">
          <Card className="border-none shadow-md bg-white/60 backdrop-blur-sm rounded-[30px]">
            <CardHeader>
              <CardTitle>Paramètres d'apparence</CardTitle>
              <CardDescription>
                Personnalisez l'apparence de l'application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Thème</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un thème" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Clair</SelectItem>
                      <SelectItem value="dark">Sombre</SelectItem>
                      <SelectItem value="system">Système</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications" className="cursor-pointer">
                    Notifications
                  </Label>
                  <Switch
                    id="notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy">
          <Card className="border-none shadow-md bg-white/60 backdrop-blur-sm rounded-[30px]">
            <CardHeader>
              <CardTitle>Politique de confidentialité</CardTitle>
              <CardDescription>
                Informations sur la collecte et l'utilisation des données
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p>Notre application respecte votre vie privée et s'engage à protéger vos données personnelles.</p>
                <h3>Collecte des données</h3>
                <p>Nous collectons uniquement les informations nécessaires au fonctionnement de l'application :</p>
                <ul>
                  <li>Données de profil (nom, avatar)</li>
                  <li>Événements et notes créés</li>
                </ul>
                <h3>Utilisation des données</h3>
                <p>Vos données sont utilisées uniquement pour le fonctionnement de l'application et ne sont pas partagées avec des tiers.</p>
                <h3>Suppression des données</h3>
                <p>Vous pouvez demander la suppression de vos données à tout moment en nous contactant.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
