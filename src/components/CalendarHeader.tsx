
// Nous modifierons CalendarHeader pour ajouter un lien vers la page de connexion
// et un bouton de déconnexion si l'utilisateur est connecté
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { Avatar } from '@/components/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, Settings as SettingsIcon, Users } from 'lucide-react';
import { toast } from "sonner";

const CalendarHeader = () => {
  const { currentUser } = useApp();
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('calendar_user');
    if (userStr) {
      try {
        setLoggedUser(JSON.parse(userStr));
      } catch (error) {
        console.error('Erreur lors du parsing de l\'utilisateur:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('calendar_user');
    setLoggedUser(null);
    toast.success('Vous êtes déconnecté');
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white bg-opacity-90 backdrop-blur-sm shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/" className="font-bold text-xl md:text-2xl bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
            Calendar
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {loggedUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar
                    user={{
                      id: loggedUser.id,
                      name: loggedUser.nom_utilisateur,
                      color: '#9b87f5', // Utiliser une couleur par défaut
                    }}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {loggedUser.nom_utilisateur}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/users" className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Gestion des utilisateurs</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center">
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    <span>Paramètres</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 hover:text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="outline" 
              className="bg-gradient-to-r from-violet-500 to-blue-500 text-white border-0 hover:from-violet-600 hover:to-blue-600"
              onClick={() => navigate('/login')}
            >
              Se connecter
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export { CalendarHeader };
