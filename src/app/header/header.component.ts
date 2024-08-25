import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  usdToUah: number = 0;
  eurToUah: number = 0;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getExchangeRates().subscribe(
      (data) => {
        const rates = this.processRates(data);
        this.usdToUah = rates['USD'];
        this.eurToUah = rates['EUR'];
      },
      (error) => {
        console.error('Помилка під час отримання даних:', error);
      }
    );
  }

  private processRates(data: any): { [key: string]: number } {
    const rates: { [key: string]: number } = {};
    data.forEach((rate: any) => {
      if (rate.ccy === 'USD' || rate.ccy === 'EUR') {
        rates[rate.ccy] = parseFloat(rate.buy);
      }
    });
    rates['UAH'] = 1;
    return rates;
  }
}
