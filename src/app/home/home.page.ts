import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserdataService } from '../Services/Userdata/userdata.service';
import { User } from '../Model/user.model';
import { Transaction } from '../Model/transaction.model';
import { AccountService } from '../Services/Account/account.service';
import { Timestamp } from 'firebase/firestore';
import { AuthenticationService } from '../Services/Authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  balance: number = 0;
  userName: string = '';
  transactionList: Transaction[] = [];
  currentAccountNumber: string = '';
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private dataService: UserdataService,
    private accountService: AccountService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.fetch();
  }
  formatDate(date: string) {
    const dateObject = new Date(date);
    // Format the date as desired
    const year = dateObject.getUTCFullYear();
    const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getUTCDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  async fetch() {
    this.dataService
      .getUserByEmail(this.authenticationService.getUserSession() as string)
      .then((data) => {
        this.accountService.setAccountId(data.id);
        this.accountService.setEmail(
          this.authenticationService.getUserSession() as string
        );
        this.authenticationService.getUserSession() as string;
        this.currentAccountNumber = this.accountService.getAccountId();
        this.accountService.setBalance(data.balance);
        this.balance = data.balance;
        this.accountService.setTransactionList(data.transactions);
        this.transactionList = data.transactions;
        this.accountService.setName(
          data.firstName,
          data.middleName,
          data.lastName
        );
        this.accountService.setAge(data.age);
        this.accountService.setGender(data.gender);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  navigate(path: string) {
    this.router.navigate([`${path}`]);
  }
  transactionClass(transaction: any) {
    let value = '';

    if (transaction.type.toLowerCase() == 'deposit') {
      value = 'transaction-value-pos';
    } else if (transaction.type.toLowerCase() == 'transfer') {
      transaction.role == 'receiver'
        ? (value = 'transaction-value-pos')
        : (value = 'transaction-value-neg');
    } else if (transaction.type.toLowerCase() == 'withdraw') {
      value = 'transaction-value-neg';
    } else if (transaction.type.toLowerCase().match('billing')) {
      value = 'transaction-value-neg';
    }
    return value;
  }
  valueFormat(transaction: any) {
    let format = '';
    if (transaction.type.toLowerCase() == 'deposit') {
      format = '+';
    } else if (transaction.type.toLowerCase() == 'transfer') {
      transaction.role == 'receiver' ? (format = '+') : (format = '-');
    } else if (transaction.type.toLowerCase() == 'withdraw') {
      format = '-';
    } else if (transaction.type.toLowerCase().match('billing')) {
      format = '-';
    }
    return format;
  }
  formatBalance(balance: number): string {
    // Round balance to maximum 4 decimals
    const roundedBalance: string = balance.toFixed(4);

    // Check if the balance is beyond hundreds of thousands
    if (Math.abs(balance) >= 1000000) {
      // Format balance with K for thousands and M for millions
      const formattedBalance: string =
        Math.abs(balance) >= 1000000
          ? (Math.abs(balance) / 1000000).toFixed(2) + 'M'
          : (Math.abs(balance) / 1000).toFixed(2) + 'K';
      return (balance < 0 ? '-' : '') + formattedBalance;
    } else {
      // Check if the balance has decimal places
      if (parseFloat(roundedBalance) % 1 !== 0) {
        // Remove trailing zeros after decimal point
        return parseFloat(roundedBalance).toString();
      } else {
        // Convert to integer
        return parseInt(roundedBalance).toString();
      }
    }
  }
}
