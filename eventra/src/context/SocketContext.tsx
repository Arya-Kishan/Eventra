// SocketContext.tsx
import {AppConstants} from '@constants/AppConstants';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {addUnOpendedMessages} from '@store/reducers/chatSlice';
import {addNotification} from '@store/reducers/userSlice';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {SharedValue, useSharedValue} from 'react-native-reanimated';

import {io, Socket} from 'socket.io-client';
import {MessageType, NotificationType} from 'types/AppTypes';

type User = {
  name: string;
} | null;

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

  const isUserOnline = (receiverId: string) => {
    if (onlineUsers.includes(receiverId)) {
      return true;
    }
    return false;
  };

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

      socket.on('chat_status', (data: any) => {
        console.log('CHAT STATUS : ', data);
      });

      // THIS IS RELATED TO CHAT TO LET USER KNOW SOMEONE MESSAGED HIM
      socket.on('someone-messaged', (someoneMessaged: MessageType) => {
        const {sender, receiver} = someoneMessaged;
        console.log('selectedOppoentUser : ', selectedOppoentUserRef.current);
        console.log('message : ', {sender, receiver});
        if (selectedOppoentUserRef.current?._id !== sender._id) {
          console.log('SAVING MESSAGE TO UNOPNED MESSAGE');
          dispatch(addUnOpendedMessages(someoneMessaged));
        }
      });

      socket.on('connect_error', (error: any) => {
        console.log('not connected to socket error occured');
        console.log(error);
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
