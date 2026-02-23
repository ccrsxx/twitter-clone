/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import io from 'socket.io-client';
import { createContext, useContext, useEffect, useState } from 'react';
import { socket } from '@lib/socket';
import { SOCKET_KEYS } from '@lib/enum/socket';
import { useAuth } from './auth-context';
import type { User } from '@lib/types/user';
import type { ReactNode } from 'react';

type SocketContext = {
  onlineUsers: User['id'][];
};

export const SocketContext = createContext<SocketContext | null>(null);

type SocketContextProviderProps = {
  children: ReactNode;
};

export const SocketContextProvider = ({
  children
}: SocketContextProviderProps): JSX.Element => {
  const [onlineUsers, setOnlineUsers] = useState<User['id'][]>([]);
  const { user } = useAuth();

  useEffect(() => {
    socket.on(SOCKET_KEYS.USER_ONLINE, () => {
      setOnlineUsers(['teste']);
    });
  }, [user]);

  return (
    <SocketContext.Provider value={{ onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export function useSocket(): SocketContext {
  const context = useContext(SocketContext);

  if (!context)
    throw new Error('useSocket must be used within an UseSocketProvider');

  return context;
}
