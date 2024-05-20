import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/Model/user.model';
import { TransactionService } from 'src/app/Services/Transactions/transaction.service';
import { UserdataService } from 'src/app/Services/Userdata/userdata.service';
import { AccountService } from '../Services/Account/account.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
})
export class TransferPage {
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  accountNumber: string = '';
  value: number = 0;
  isAccountExisting: boolean = false;
  constructor(
    private userService: UserdataService,
    private transactionService: TransactionService,
    private alertController: AlertController,
    private accountService: AccountService,
    private router: Router
  ) {}

  async searchAccount() {
    if (
      !this.accountNumber ||
      this.accountService.getAccountId() === this.accountNumber
    ) {
      this.alert('Invalid input', 'Please enter valid account number');
      return;
    }

    this.userService
      .getUser(this.accountNumber)
      .then((data) => {
        console.log(data);
        this.isAccountExisting = true;
      })
      .catch((err) => {
        console.log(err);
        this.alert('Failed', 'Please recheck the credentials');
      });
  }

  async transferMoney() {
    const sender = this.accountService.getAccountId();
    const receiver = this.accountNumber;
    const value = this.value;
    await this.transactionService
      .transferMoney(sender, receiver, value)
      .then(() => {
        this.alert('Success!', 'Successfully transferred account');
        this.router.navigate(['home']);
      });
  }
  async alert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'OK',
        },
      ],
    });

    await alert.present();
  }
  back() {
    this.router.navigate(['dashboard']);
  }
}
