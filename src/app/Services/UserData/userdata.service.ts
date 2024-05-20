import { Injectable } from '@angular/core';
import { User } from 'src/app/Model/user.model';
import { Transaction } from 'src/app/Model/transaction.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import {
  CollectionReference,
  addDoc,
  collection,
  getFirestore,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  query,
  where,
} from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class UserdataService {
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
      const userId = userDoc.id;
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
        id: userId,
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

  async getUser(id: any) {
    const docRef = doc(this.firestore, 'users', id);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data() as User;
    const userId = docSnap.id;
    const transactionsQuerySnapshot = await getDocs(
      collection(docSnap.ref, 'transactions')
    );
    const transactionsData: Transaction[] = [];

    // Iterate over each transaction document
    transactionsQuerySnapshot.forEach((transactionDoc) => {
      const transactionData = transactionDoc.data() as Transaction;
      transactionsData.push(transactionData);
    });

    const data: User = {
      id: userId,
      firstName: userData.firstName,
      middleName: userData.middleName,
      lastName: userData.lastName,
      balance: userData.balance,
      age: userData.age,
      transactions: transactionsData,
    };
    return data;
  }

  async createUser(docId: string, data: any) {
    const docRef = doc(this.firestore, 'users', docId);
    await setDoc(docRef, data);
    const transactionsCollectionRef = collection(
      this.firestore,
      `users/${docId}/transactions`
    );
    await addDoc(transactionsCollectionRef, {
      type: 'deposit',
      value: 1000,
    });
  }

  async getUserByEmail(email: string) {
    // Select document from users where email is equal to email
    const collectionRef = collection(this.firestore, 'users');
    const q = query(collectionRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    const userDoc = querySnapshot.docs[0];

    const userData = userDoc.data() as User;

    const docId = userDoc.id;

    // Initialize transaction
    const transactionList: Transaction[] = [];
    const transactionsQuerySnapshot = await getDocs(
      collection(this.firestore, `users/${docId}/transactions`)
    );
    // Iterate over each transaction document
    transactionsQuerySnapshot.forEach((transactionDoc) => {
      const transactionData = transactionDoc.data() as Transaction;

      transactionList.push(transactionData);
    });
    // sender: senderId,
    // type: 'transfer',
    // value: transferValue,
    // role: 'receiver',
    let tempBalance = 0;
    transactionList.map((transaction: any) => {
      if (transaction.type.toLowerCase() == 'deposit') {
        tempBalance += transaction.value;
      } else if (transaction.type.toLowerCase() == 'withdraw') {
        tempBalance -= transaction.value;
      }
      if (transaction.type.toLowerCase() == 'transfer') {
        if (transaction.role == 'receiver') {
          tempBalance += transaction.value;
        } else {
          tempBalance -= transaction.value;
        }
      }
    });

    // Set the values from query
    const user: User = {
      id: docId,
      age: userData.age,
      balance: tempBalance,
      firstName: userData.firstName,
      lastName: userData.lastName,
      middleName: userData.middleName,
      transactions: transactionList,
    };

    return user;
  }
}
