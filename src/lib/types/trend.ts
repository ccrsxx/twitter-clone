import type { Timestamp, FirestoreDataConverter } from 'firebase/firestore';
import type { User } from './user';

export type Trend = {
  id: string;
  text: string | null;
  parent: { id: string; username: string } | null;
  counter: number;
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp | null;
};

export type TrendWithUser = Trend & { user: User };

export const trendConverter: FirestoreDataConverter<Trend> = {
  toFirestore(trend) {
    return { ...trend };
  },
  fromFirestore(snapshot, options) {
    const { id } = snapshot;
    const data = snapshot.data(options);

    return { id, ...data } as Trend;
  }
};
