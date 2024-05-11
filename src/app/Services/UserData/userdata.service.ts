import { Injectable } from '@angular/core';
import { User } from 'src/app/Model/user.model';
import { Transaction } from 'firebase/firestore';
import {
  addDoc,
  collection,
  getFirestore,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class UserdataService {
  currentEmail = '';
  constructor() {}

  app = initializeApp(environment.firebaseConfig);
  firestore = getFirestore(this.app);

  async getAllUser() {
    const usersList: User[] = [];

    // Fetch all users
    const usersQuerySnapshot = await getDocs(
      collection(this.firestore, 'users')
    );
    // Iterate over each user document
    for (const userDoc of usersQuerySnapshot.docs) {
      const userData = userDoc.data() as User;
      // Fetch transactions for each user
      const transactionsQuerySnapshot = await getDocs(
        collection(userDoc.ref, 'transactions')
      );
      const transactionsData: Transaction[] = [];

      // Iterate over each transaction document
      transactionsQuerySnapshot.forEach((transactionDoc) => {
        const transactionData = transactionDoc.data() as Transaction;
        transactionsData.push(transactionData);
      });

      const data: User = {
        firstName: userData.firstName,
        middleName: userData.middleName,
        lastName: userData.lastName,
        balance: userData.balance,
        age: userData.age,
        transactions: transactionsData,
      };
      usersList.push(data);
    }
    return usersList;
  }
}
