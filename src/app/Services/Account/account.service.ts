import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { last } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  isLoggedIn: boolean = false;
  currentUserEmail: string = '';
  currentAccountNumber: string = '';
  transactionList: any[] = [];
  balance: number = 0;
  //
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  email: string = '';
  age: number = 0;

  constructor() {}

  setAccountId(id: any) {
    this.currentAccountNumber = id;
  }
  getAccountId() {
    return this.currentAccountNumber;
  }
  setBalance(balance: number) {
    this.balance = balance;
  }
  getBalance() {
    return this.balance;
  }
  setEmail(email: string) {
    this.currentUserEmail = email;
  }
  getEmail() {
    return this.currentUserEmail;
  }
  setTransactionList(list: any[]) {
    this.transactionList = list;
  }
  getTransactionList() {
    return this.transactionList;
  }

  setName(firstName: string, middleName: string, lastName: string) {
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
  }
  getName() {
    const data = {
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
    };

    return data;
  }
  setAge(age: number) {
    this.age = age;
  }
  getAge() {
    return this.age;
  }
  async signup(email: string, password: string) {
    const auth = getAuth();
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  async login(email: string, password: string) {
    const auth = getAuth();
    return await signInWithEmailAndPassword(auth, email, password);
  }
}
