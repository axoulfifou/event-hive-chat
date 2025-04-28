
import { useCallback } from 'react';
import { User } from '@/types';

export const useUserActions = (
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  currentUser: User,
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>
) => {
  const updateUser = useCallback((updatedUser: User) => {
    setUsers(prev => prev.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
    if (updatedUser.id === currentUser.id) {
      setCurrentUser(updatedUser);
    }
  }, [currentUser.id, setCurrentUser]);

  const addUser = useCallback((name: string) => {
    const initials = name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
      
    const availableColors = ['blue', 'green', 'yellow', 'red', 'purple', 'orange'];
    const usedColors = users.map(u => u.color);
    const color = availableColors.find(c => !usedColors.includes(c as User['color'])) || 'blue';

    const newUser: User = {
      id: Date.now().toString(),
      name,
      initials,
      color: color as User['color']
    };

    setUsers(prev => [...prev, newUser]);
  }, [users]);

  const removeUser = useCallback((userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  }, []);

  return {
    updateUser,
    addUser,
    removeUser,
  };
};
