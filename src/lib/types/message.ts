import type { Timestamp, FirestoreDataConverter } from 'firebase/firestore';

export type Message = {
  id: string;
  conversationId: string;
  text: string;
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp | null;
};

export const messageConverter: FirestoreDataConverter<Message> = {
  toFirestore(message) {
    return { ...message };
  },
  fromFirestore(snapshot, options) {
    const { id } = snapshot;
    const data = snapshot.data(options);

    return { id, ...data } as Message;
  }
};
