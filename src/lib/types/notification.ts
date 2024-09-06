import type { Timestamp, FirestoreDataConverter } from 'firebase/firestore';
import type { User } from './user';

export type Notification = {
  id: string;
  isChecked: boolean;
  type: string;
  userId: string;
  targetUserId: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp | null;
};

export type NotificationWithUser = Notification & { user: User };

export const notificationConverter: FirestoreDataConverter<Notification> = {
  toFirestore(notification) {
    return { ...notification };
  },
  fromFirestore(snapshot, options) {
    const { id } = snapshot;
    const data = snapshot.data(options);

    return { id, ...data } as Notification;
  }
};
