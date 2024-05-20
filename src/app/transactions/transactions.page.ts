import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../Services/Account/account.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage {
  constructor(private router: Router, private accountService: AccountService) {
    this.transactionList = this.accountService.getTransactionList();
    console.log(this.transactionList);
  }
  transactionList: any[] = [];

  back() {
    this.router.navigate(['dashboard']);
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
}
