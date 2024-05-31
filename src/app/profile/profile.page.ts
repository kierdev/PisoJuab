import { Component, OnInit } from '@angular/core';
import { AccountService } from '../Services/Account/account.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/Authentication/authentication.service';

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
  gender: string = '';

  constructor(
    private authentication: AuthenticationService,
    private accountService: AccountService,
    private router: Router
  ) {}
  ionViewDidEnter() {
    !this.isDataFetch ? this.reload() : null;
  }
  back() {
    this.router.navigate(['dashboard/home']);
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
    this.gender = this.accountService.getGender();
    this.isDataFetch = true;
  }

  logOut() {
    this.router.navigate(['login']);
    this.authentication.removeUser();
    this.authentication.setAuth(false);
  }
}
