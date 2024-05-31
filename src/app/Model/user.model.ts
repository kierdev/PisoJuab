import { Transaction } from './transaction.model';

export interface User {
  id: string;
  age: number;
  balance: number;
  firstName: string;
  lastName: string;
  middleName: string;
  gender: string;
  transactions: Transaction[];
}
