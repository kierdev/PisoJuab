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

  async fetch() {
    const user = this.accountService.getEmail();

    this.dataService
      .getUserByEmail(user)
      .then((data) => {
        this.accountService.setAccountId(data.id);
        console.log(this.accountService.getAccountId());

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
    }
    return format;
  }
  formatTransactionDate(data: any) {}
}
