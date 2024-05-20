import { Timestamp } from 'firebase/firestore';

export interface Transaction {
  type: string;
  value: number;
  date: any;
}
