// SocketContext.tsx
import {AppConstants} from '@constants/AppConstants';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {
  updateAllConversations,
  setUnseenMessageCount,
  setOpponentActiveChatId,
} from '@store/reducers/chatSlice';
import {addNotification} from '@store/reducers/userSlice';
import {showToast} from '@utils/Helper';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import {io, Socket} from 'socket.io-client';
import {NotificationType} from 'types/AppTypes';

type SocketContextType = {
  onlineUsers: any;
  setOnlineUsers: (val: any) => void;
  globalSocket: Socket | any;
  isSocketConnected: string;
};

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({children}: {children: ReactNode}) => {
  const [globalSocket, setGlobalSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [isSocketConnected, setIsSocketConnected] = useState('connecting');
  const {loggedInUser} = useAppSelector(store => store.user);
  const {selectedOppoentUser} = useAppSelector(store => store.chat);
  const dispatch = useAppDispatch();
  const selectedOppoentUserRef = useRef(selectedOppoentUser);

  useEffect(() => {
    if (loggedInUser) {
      const socket = io(AppConstants.socketBaseUrl, {
        query: {
          userId: loggedInUser._id,
        },
      });
      setGlobalSocket(socket);

      socket.on('connect', () => {
        setIsSocketConnected('connected');
      });

      socket.on('receive-notification', (notification: NotificationType) => {
        console.log('RECEIVES NEW NOTIFICATION : ', notification);
        dispatch(addNotification(notification));
      });

      socket.on('onlineUsers', (data: any) => {
        setOnlineUsers(data);
        data;
      });

      // THIS IS RELATED TO CHAT TO LET USER KNOW SOMEONE MESSAGED HIM
      socket.on('unseen-message', (someoneMessaged: any) => {
        const {sender, receiver, conversationId} = someoneMessaged;
        console.log('kya huwa bsdh 1');
        dispatch(setUnseenMessageCount({count: 1, type: 'inc'}));
        dispatch(
          updateAllConversations({conversationId, userId: receiver._id}),
        );
      });

      socket.on('receive-active-chat', (data: any) => {
        dispatch(setOpponentActiveChatId(data));
      });

      socket.on('connect_error', (error: any) => {
        console.log('ERROR IN SOCKET', error);
        showToast({
          title: 'Socket Error',
          description: 'Socket Not Conncted',
          type: 'error',
        });
        setIsSocketConnected('errorInConnecting');
      });
    }

    return () => {
      globalSocket && globalSocket?.disconnect();
    };
  }, [loggedInUser]);

  useEffect(() => {
    selectedOppoentUserRef.current = selectedOppoentUser;
  }, [selectedOppoentUser]);

  return (
    <SocketContext.Provider
      value={{
        onlineUsers,
        globalSocket,
        isSocketConnected,
        setOnlineUsers,
      }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook (optional, cleaner)
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
