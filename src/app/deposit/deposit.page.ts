import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
})
export class DepositPage {
  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  back() {
    this.router.navigate(['dashboard/home']);
  }
  deposit() {
    this.confirm();
  }
  async confirm() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure you wanted to proceed?',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('Continue');
          },
        },
        {
          text: 'CANCEL',
          handler: () => {
            console.log('Cancel');
          },
        },
      ],
    });

    await alert.present();
  }
}
