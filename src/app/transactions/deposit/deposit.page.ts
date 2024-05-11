import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
})
export class DepositPage {
  constructor(private router: Router) {}
  navigate(path: string) {
    this.router.navigate([`transactions/${path}`]);
  }
}
