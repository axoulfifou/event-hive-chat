
import React from 'react';
import { useApp } from '@/context/AppContext';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/ui/button';
import { Plus, UserX } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { AppProvider } from '@/context/AppContext';

// Component that uses the AppContext
const UsersContent = () => {
  const { users, currentUser, addUser, removeUser } = useApp();
  const [newUserName, setNewUserName] = React.useState('');

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUserName.trim()) {
      addUser(newUserName.trim());
      setNewUserName('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Gestion des participants</h1>
      
      <form onSubmit={handleAddUser} className="flex gap-2 mb-8">
        <Input
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="Nom du participant"
          className="max-w-xs"
        />
        <Button type="submit">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter
        </Button>
      </form>

      <div className="space-y-4">
        {users.map(user => (
          <div key={user.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-background to-muted/30 rounded-lg border">
            <div className="flex items-center gap-3">
              <Avatar user={user} />
              <span className="font-medium">{user.name}</span>
            </div>
            {user.id !== currentUser.id && (
              <Button 
                variant="destructive" 
                size="icon"
                onClick={() => removeUser(user.id)}
              >
                <UserX className="w-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Wrapper component that provides the AppContext
export const Users = () => {
  return (
    <AppProvider>
      <UsersContent />
    </AppProvider>
  );
};

export default Users;
