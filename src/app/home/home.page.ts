import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserdataService } from '../Services/UserData/userdata.service';
import { User } from '../Model/user.model';
import { Transaction } from '../Model/transaction.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  whiteCardClass(type: string) {
    switch (type.toLowerCase()) {
      case 'deposit':
        return 'white-card-value-pos ';
      case 'withdraw':
        return 'white-card-value-neg ';
      default:
        return '';
    }
  }
  valueFormat(type: string, value: number) {
    switch (type.toLowerCase()) {
      case 'deposit':
        return `+ ${value} `;
      case 'withdraw':
        return ` - ${value}`;
      default:
        return '';
    }
  }
  balance: number = 0;
  userName: string = '';
  transactions: any[] = [];
  isLoading: boolean = false;

  constructor(private router: Router, private dataService: UserdataService) {}

  ngOnInit(): void {
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    await this.dataService
      .getAllUser()
      .then((data: User[]) => {
        this.balance = data[0].balance;
        this.userName = data[0].firstName;
        this.transactions = data[0].transactions;
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
}
