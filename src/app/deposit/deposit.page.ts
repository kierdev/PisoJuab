import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TransactionService } from '../Services/Transactions/transaction.service';
import { AccountService } from '../Services/Account/account.service';
@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
})
export class DepositPage {
  constructor(
    private router: Router,
    private alertController: AlertController,
    private transactionService: TransactionService,
    private accountService: AccountService
  ) {}

  depositAmount: number = 0;
  minDeposit: number = 100;

  back() {
    this.router.navigate(['dashboard/home']);
  }
  deposit() {
    if (this.depositAmount < this.minDeposit) {
      this.alertUser(
        'Invalid amount',
        `Deposit amount should be higher than ${this.minDeposit}`
      );
      return;
    }
    const id = this.accountService.getAccountId();
    console.log(id);

    this.transactionService
      .addTransaction(id, 'deposit', this.depositAmount)
      .then((res) => {
        this.alertUser('Success! Please save your Ticket:', res.id);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.depositAmount = 0;
      });
  }
  async alertUser(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['dashboard/home']).then(() => {
              window.location.reload();
            });
          },
        },
      ],
    });
    await alert.present();
  }
}
