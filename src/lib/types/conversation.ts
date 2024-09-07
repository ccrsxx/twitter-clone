import type { Timestamp, FirestoreDataConverter } from 'firebase/firestore';
import type { User } from './user';

export type Conversation = {
  id: string;
  userId: string;
  targetUserId: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp | null;
};

export type ConversationWithUser = Conversation & { user: User };

export const conversationConverter: FirestoreDataConverter<Conversation> = {
  toFirestore(conversation) {
    return { ...conversation };
  },
  fromFirestore(snapshot, options) {
    const { id } = snapshot;
    const data = snapshot.data(options);

    return { id, ...data } as Conversation;
  }
};
