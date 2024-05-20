import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AccountService } from '../Services/Account/account.service';
import { UserdataService } from '../Services/Userdata/userdata.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  selectedProduct: string = '';

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private accountService: AccountService,
    private userService: UserdataService,
    private router: Router
  ) {}
  back() {
    this.router.navigate(['login']);
  }

  email: string = '';
  password: string = '';
  retypePassword: string = '';
  // Subdata
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  accountNumber: string = '';
  age: number = 0;

  signup() {
    // ? is Password equal to retype password
    // ? is Email valid
    // ? is Account number (length == 12)
    if (
      this.validatePassword(this.password, this.retypePassword) &&
      this.validateEmail(this.email) &&
      this.validateAccountNumber(this.accountNumber)
    ) {
      // * If success => sign up and pass the rest of the data to Fire store
      this.accountService
        .signup(this.email, this.password)
        .then((userCredential: any) => {
          const newUser = {
            email: userCredential.user.email,
            firstName: this.firstName,
            middleName: this.middleName,
            lastName: this.lastName,
            age: this.age,
          };
          this.userService
            .createUser(this.accountNumber, newUser)
            .then(() => {
              this.alert();
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          // ! If err => present toast
          console.log(err);
          this.presentToast('Please enter valid input');
        })
        .finally(() => {
          this.email = '';
          this.password = '';
          this.retypePassword = '';
        });
    }
  }

  validatePassword(password: String, confirmPassword: String): boolean {
    let isValid = false;
    if (password.length < 8) {
      this.presentToast('Password must be longer than 8 characters');
    } else if (password !== confirmPassword) {
      this.presentToast('Password does not match');
    } else {
      isValid = true;
    }
    return isValid;
  }
  validateEmail(email: string) {
    let isValid = false;
    if (!email.includes('@') && !email.includes('.')) {
      this.presentToast('Please input valid email');
    } else {
      isValid = true;
    }
    return isValid;
  }
  validateAccountNumber(id: string) {
    let isValid = false;
    if (id.length === 12) {
      isValid = true;
    }
    return isValid;
  }

  async alert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      message: 'Successfully created account',
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['login']);
          },
        },
      ],
    });

    await alert.present();
  }

  async presentToast(err: string) {
    const toast = await this.toastController.create({
      message: err,
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
  confirmSelection() {
    console.log(this.selectedProduct);
    this.router.navigate(['signup/credentials']);
  }
}
