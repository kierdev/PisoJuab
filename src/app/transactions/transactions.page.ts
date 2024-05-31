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
  formatDate(date: string) {
    const dateObject = new Date(date);
    // Format the date as desired
    const year = dateObject.getUTCFullYear();
    const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getUTCDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
}
