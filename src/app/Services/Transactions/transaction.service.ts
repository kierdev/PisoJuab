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
} from 'firebase/firestore';
import { Transaction } from 'src/app/Model/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor() {}

  app = initializeApp(environment.firebaseConfig);
  firestore = getFirestore(this.app);

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
  async addTransaction(transaction: any) {
    return await addDoc(collection(this.firestore, 'transactions'), {
      transactionBrand: transaction.transactionBrand,
      transactionModel: transaction.transactionModel,
      transactionReleaseDate: transaction.transactionReleaseDate,
      transactionPrice: transaction.transactionPrice,
      transactionAvailability: transaction.transactionAvailability,
      transactionAvailableColors: transaction.transactionAvailableColors,
    });
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
