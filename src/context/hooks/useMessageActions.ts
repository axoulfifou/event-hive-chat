
import { useCallback } from 'react';
import { Message, User } from '@/types';

export const useMessageActions = (
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  currentUser: User,
  chatOpen: boolean,
  setHasNewMessages: (value: boolean) => void,
  showNotification: (message: string) => void
) => {
  const sendMessage = useCallback((content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      userId: currentUser.id,
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    if (!chatOpen) {
      setHasNewMessages(true);
      showNotification("Nouveau message dans le chat");
    }
  }, [currentUser.id, chatOpen, setHasNewMessages, showNotification]);

  return {
    sendMessage,
  };
};
