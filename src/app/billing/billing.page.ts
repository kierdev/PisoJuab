import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.page.html',
  styleUrls: ['./billing.page.scss'],
})
export class BillingPage {
  biller: string = '';
  billerList: string[] = [
    'Tokyo Electric Power Company',
    'Osaka Electric Power Company',
    'Kanagawa Waterworks',
    'Aichi Waterworks',
    'Saitama Waterworks',
    'CyberNet',
    'Internet Express',
    'WirelessCom',
    'WebCom',
    'TelevisionNet',
  ];

  constructor(private router: Router) {}

  navigate(biller: string) {
    this.router.navigate([`billing/${biller}`]);
  }
  back() {
    this.router.navigate(['dashboard']);
  }
}
