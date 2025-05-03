// SocketContext.tsx
import { AppConstants } from '@constants/AppConstants';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';



import { io, Socket } from "socket.io-client";


type User = {
    name: string;
} | null;

type SocketContextType = {
    onlineUsers: any;
    setOnlineUsers: (val: any) => void;
    sendSocketNotification: (val: any) => void;
    globalSocket: Socket | any;
    isSocketConnected: string
};

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {

    const [globalSocket, setGlobalSocket] = useState<Socket | null>(null)
    const [onlineUsers, setOnlineUsers] = useState<string[]>([])
    const [isSocketConnected, setIsSocketConnected] = useState("connecting");
    const { loggedInUser } = useAppSelector(store => store.user)
    const dispatch = useAppDispatch();

    const isUserOnline = (receiverId: string) => {
        if (onlineUsers.includes(receiverId)) {
            return true;
        }
        return false;
    }

    const sendSocketNotification = ({ to, message, category, cardId, action }: { to: string, message: string, category: string, cardId: string, action: string }) => {

        // WHY WOULD I WILL SEND LIKE NOTIFICATION TO MYSELF FOR MY POST
        if (to == loggedInUser?._id) {
            return null;
        }

        if (isUserOnline(to)) {
            globalSocket!.emit("send-notification", { receiverId: to, category: category, message: message })
            return null;
        }

        if (!isUserOnline(to)) {
            // saveNotificationDatabase({ to, message, category, cardId, action })
        }

    }


    useEffect(() => {

        if (loggedInUser) {

            console.log("SOCKET BACKEND URL : ", AppConstants.socketBaseUrl)

            const socket = io(AppConstants.socketBaseUrl, {
                query: {
                    userId: loggedInUser._id,
                }
            });
            setGlobalSocket(socket);

            socket.on("connect", () => {
                setIsSocketConnected("connected");
            })

            socket.on("receive-notification", ({ category, message }: { category: string, message: string }) => {

            })

            socket.on("onlineUsers", (data: any) => {
                setOnlineUsers(data);
                (data);
            })

            // THIS IS RELATED TO CHAT TO LET USER KNOW SOMEONE MESSAGED HIM
            socket.on("someone-messaged", ({ sender, receiver, message }: { sender: string, receiver: string, message: string }) => {

            })

            socket.on("connect_error", (error: any) => {
                console.log("not connected to socket error occured");
                console.log(error);
                setIsSocketConnected("errorInConnecting")
            })

        }

        return () => {
            globalSocket && globalSocket?.disconnect();
        }

    }, [loggedInUser])


    return (
        <SocketContext.Provider value={{ onlineUsers, globalSocket, sendSocketNotification, isSocketConnected, setOnlineUsers }}>
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
