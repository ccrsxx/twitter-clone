/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Server as IOServer } from 'socket.io';
import { firebaseAdmin } from '@lib/firebase/app-admn';
import onConnection from './_connections';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse & { socket: { server: any } }
): Promise<void> {
  if (!req.cookies.token) res.end();

  const user = await firebaseAdmin
    .auth()
    .verifyIdToken(req.cookies.token as string);

  if (!req.cookies.token)
    if (res?.socket.server.io) {
      res.end();
      return;
    }

  const io = new IOServer(res.socket.server, {
    cors: {
      origin: '*'
    },
    path: '/api/socket'
  });

  io.on('connection', (socket) => onConnection(io, socket as any, user));

  res.socket.server.io = io;
  res.status(200).send('Socket initialized');
}
