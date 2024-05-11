import { Transaction } from 'firebase/firestore';

export interface User {
  age: number;
  balance: number;
  firstName: string;
  lastName: string;
  middleName: string;
  transactions: Transaction[];
}
