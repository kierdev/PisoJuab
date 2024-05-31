import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AccountService } from '../Services/Account/account.service';
import { TransactionService } from '../Services/Transactions/transaction.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.page.html',
  styleUrls: ['./withdraw.page.scss'],
})
export class WithdrawPage {
  currentBalance = 0;
  minWithdraw = 100;
  withdrawAmount: number = 0;
  constructor(
    private router: Router,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private alertController: AlertController
  ) {
    this.currentBalance = this.accountService.getBalance();
  }

  withdraw() {
    if (this.withdrawAmount < 100) {
      this.alertUser(
        'Invalid amount',
        `Withdraw amount should be higher than ${this.minWithdraw}`
      );
      return;
    }
    if (this.withdrawAmount > this.currentBalance) {
      this.alertUser(
        'Insufficient Balance',
        'Please check your account balance.'
      );
      return;
    }
    const id = this.accountService.getAccountId();
    console.log(id);
    this.transactionService
      .addTransaction(id, 'withdraw', this.withdrawAmount)
      .then((res) => {
        this.alertUser('Success! Please save your Ticket ID', res.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  back() {
    this.router.navigate(['dashboard/home']);
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
