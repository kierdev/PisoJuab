import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-exchanges',
  templateUrl: './exchanges.page.html',
  styleUrls: ['./exchanges.page.scss'],
})
export class ExchangesPage implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}
  convertToCurrency: string = '';
  ratesList: any = {};
  amount: number = 0;
  convertedValue: number = 0;
  isConverted: boolean = false;

  ngOnInit(): void {
    this.fetch();
  }
  back() {
    this.router.navigate(['dashboard/home']);
  }

  async fetch() {
    await this.getCurrency().subscribe((response) => {
      this.ratesList = response.rates;
    });
  }
  convertAmount(): void {
    const rate = this.ratesList[this.convertToCurrency];
    this.convertedValue = 100 * rate;
    this.isConverted = true;
  }

  getCurrency(): Observable<any> {
    return this.http.get<any>('https://open.er-api.com/v6/latest/PHP');
  }
}
