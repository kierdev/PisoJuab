import { Component, OnInit } from '@angular/core';
import { AccountService } from '../Services/Account/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  isDataFetch: boolean = false;
  accountNumber: string = '';
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  email: string = '';
  age: number = 0;

  constructor(private accountService: AccountService, private router: Router) {}
  ionViewDidEnter() {
    !this.isDataFetch ? this.reload() : null;
  }

  reload() {
    console.log('Reloaded');

    this.accountNumber = this.accountService.getAccountId();
    this.email = this.accountService.getEmail();
    this.firstName = this.accountService.getName().firstName;
    console.log(this.firstName);
    this.middleName = this.accountService.getName().middleName;
    console.log(this.middleName);
    this.lastName = this.accountService.getName().lastName;
    console.log(this.lastName);
    this.age = this.accountService.getAge();
    this.isDataFetch = true;
  }

  logoOut() {
    this.router.navigate(['login']);
  }
}
