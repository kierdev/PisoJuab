import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AccountService } from '../Services/Account/account.service';
import { User } from 'firebase/auth';
import { UserdataService } from '../Services/Userdata/userdata.service';
import { AuthenticationService } from '../Services/Authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private accountService: AccountService,
    private authenticationService: AuthenticationService
  ) {}
  login() {
    this.accountService
      .login(this.email, this.password)
      .then(() => {
        this.accountService.setEmail(this.email);
        this.authenticationService.setUser(this.email);
        this.alertLogin();
      })
      .catch(() => {
        this.presentToast();
      })
      .finally(() => {
        this.email = '';
        this.password = '';
      });
  }
  async alertLogin() {
    const alert = await this.alertController.create({
      header: 'Success!',
      message: 'You are successfuly login',
      buttons: [
        {
          text: 'OK',
          handler: async () => {
            this.authenticationService.setAuth(true);
            this.router.navigate(['dashboard/home'], {});
          },
        },
      ],
    });

    await alert.present();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Login Failed. Please try again',
      color: 'light',
      duration: 2000,
    });
    toast.present();
  }

  async dismissToast() {
    const toast = await this.toastController.getTop();

    if (toast) {
      toast.dismiss();
    }
  }
}
