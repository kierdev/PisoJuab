import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AccountService } from 'src/app/Services/Account/account.service';
import { TransactionService } from 'src/app/Services/Transactions/transaction.service';

@Component({
  selector: 'app-paybill',
  templateUrl: './paybill.page.html',
  styleUrls: ['./paybill.page.scss'],
})
export class PaybillPage implements OnInit {
  id: any;
  billerId: string = '';
  billAmount: number = 0;
  currentBalance: number = 0;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService,
    private accountService: AccountService,
    private alertController: AlertController
  ) {
    this.currentBalance = this.accountService.getBalance();
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }
  back() {
    this.router.navigate([`billing`]);
  }
  payBill() {
    const id = this.accountService.getAccountId();
    if (this.billAmount > this.currentBalance) {
      this.alertUser(
        'Insufficient Balance',
        'Please check your account balance.'
      );
      return;
    }
    this.transactionService
      .addTransaction(id, `Billing:${id}`, this.billAmount)
      .then((res) => {
        this.alertUser('Success! Please save your Ticket:', res.id);
        this.router.navigate(['home']).then(() => {
          window.location.reload;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async alertUser(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
