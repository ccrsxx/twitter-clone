/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { io } from 'socket.io-client';
import type { Socket } from 'socket.io';

const isBrowser = typeof window !== 'undefined';

export const socket: Socket = isBrowser
  ? io({ path: '/api/socket' })
  : ({} as any);
