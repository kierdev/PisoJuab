import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  getFirestore,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { Transaction } from 'src/app/Model/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor() {}

  app = initializeApp(environment.firebaseConfig);
  firestore = getFirestore(this.app);

  async transferMoney(senderId: any, receiverId: any, transferValue: number) {
    // add transaction to receiver
    const receiverTransactionsCollectionRef = collection(
      this.firestore,
      `users/${receiverId}/transactions`
    );
    await addDoc(receiverTransactionsCollectionRef, {
      sender: senderId,
      type: 'transfer',
      value: transferValue,
      role: 'receiver',
    });
    // add transaction to sender
    const senderTransactionCollectionRef = collection(
      this.firestore,
      `users/${senderId}/transactions`
    );
    await addDoc(senderTransactionCollectionRef, {
      receiver: receiverId,
      type: 'transfer',
      value: transferValue,
      role: 'sender',
    });
  }

  async getTransaction(id: any) {
    const docRef = doc(this.firestore, 'transactions', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }

  //Get All
  async getAlltransactions() {
    const transactions: Transaction[] = [];

    const querySnapshot = await getDocs(
      collection(this.firestore, 'transactions')
    );
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Transaction;

      transactions.push(data);
    });
    return transactions;
  }
  async addTransaction(id: any, type: string, transferValue: number) {
    const transactionData = {
      type: type,
      value: transferValue,
    };
    const userDocRef = doc(this.firestore, 'users', id);

    // Get the user document
    const userDocSnap = await getDoc(userDocRef);

    // Check if the user document exists
    if (userDocSnap.exists()) {
      // Reference to the transactions collection within the user document
      const transactionsCollectionRef = collection(userDocRef, 'transactions');

      return await addDoc(transactionsCollectionRef, transactionData);
    } else {
      return null;
    }
  }

  //Delete
  async deleteTransaction(transaction: Transaction) {
    try {
      const docRef = doc(this.firestore, 'transactions');
      await deleteDoc(docRef);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  //Update

  async updateTransaction() {
    try {
      const docRef = doc(this.firestore, 'transactions');
      await updateDoc(docRef, {});
    } catch (error) {
      console.log(error);
    }
  }
}
