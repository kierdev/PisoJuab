import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { last } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
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
  gender: string = '';
  age: number = 0;

  constructor(private storage: Storage) {
    this.init(); // Initialize storage
  }
  async init() {
    await this.storage.create(); // Ensure storage is ready
  }
  async setItem(key: string, value: any) {
    await this.storage.set(key, value);
  }

  async getItem(key: string): Promise<any> {
    const stringValue = await this.storage.get(key);
    // Check if the retrieved value is null or undefined
    if (stringValue === null || stringValue === undefined) {
      return null; // or any other default value you prefer
    }
    // Convert string back to object when retrieving
    return JSON.parse(stringValue);
  }

  async removeItem(key: string) {
    await this.storage.remove(key);
  }
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
  setGender(gender: string) {
    this.gender = gender;
  }
  getGender() {
    return this.gender;
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
