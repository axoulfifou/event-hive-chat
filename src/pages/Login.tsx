
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";
import { Eye, EyeOff, Key, LogIn, User } from 'lucide-react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    
    setLoading(true);
    
    try {
      // Vérification des identifiants dans la base de données
      const { data, error } = await supabase
        .from('utilisateur')
        .select('*')
        .eq('nom_utilisateur', username)
        .eq('mot_de_passe', password)
        .single();
      
      if (error || !data) {
        toast.error('Identifiants incorrects');
        setLoading(false);
        return;
      }
      
      // Connexion réussie
      toast.success(`Bienvenue ${data.nom_utilisateur} !`);
      
      // Stockage de l'information de connexion
      localStorage.setItem('calendar_user', JSON.stringify(data));
      
      // Redirection vers la page principale
      navigate('/');
      
    } catch (error) {
      toast.error('Une erreur est survenue');
      console.error('Erreur de connexion:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-violet-50 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-blue-500">
            Calendar
          </h1>
          <p className="text-gray-500 mt-2">Connectez-vous pour accéder à votre calendrier</p>
        </div>
        
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="space-y-2">
            <div className="relative">
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nom d'utilisateur"
                className="pl-10"
                disabled={loading}
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className="pl-10 pr-10"
                disabled={loading}
              />
              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                Connexion...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <LogIn className="mr-2 h-4 w-4" />
                Se connecter
              </div>
            )}
          </Button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              Utilisateurs de test: jdupont/azerty123, mbrown/password456
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
