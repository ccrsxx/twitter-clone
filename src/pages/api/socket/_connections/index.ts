/* eslint-disable no-console */
import { SOCKET_KEYS } from '@lib/enum/socket';
import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import type { Socket } from 'socket.io-client';

export default function onConnection(
  io: any,
  socket: Socket,
  user: DecodedIdToken
): void {
  console.log(`⚡: ${socket.id as string} user just connected!`);

  socket.emit(SOCKET_KEYS.USER_ONLINE, user.sub);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
}
