import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage {
  constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigate([`transactions/${path}`]);
  }
}
